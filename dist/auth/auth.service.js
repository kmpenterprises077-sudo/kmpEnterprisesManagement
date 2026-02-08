"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = __importStar(require("bcryptjs"));
const user_model_1 = require("../users/user.model");
const role_model_1 = require("../roles/role.model");
let AuthService = class AuthService {
    userModel;
    roleModel;
    constructor(userModel, roleModel) {
        this.userModel = userModel;
        this.roleModel = roleModel;
    }
    async ensureDefaultRoles() {
        await this.roleModel.findOrCreate({
            where: { name: 'admin' },
            defaults: { name: 'admin' },
        });
        await this.roleModel.findOrCreate({
            where: { name: 'user' },
            defaults: { name: 'user' },
        });
    }
    async register(dto) {
        try {
            await this.ensureDefaultRoles();
            const existing = await this.userModel.findOne({
                where: { email: dto.email },
            });
            if (existing) {
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(dto.password, salt);
            const roleName = (dto.role || 'user').toLowerCase();
            if (roleName !== 'admin' && roleName !== 'user') {
                throw new common_1.HttpException('Invalid role', common_1.HttpStatus.BAD_REQUEST);
            }
            const role = await this.roleModel.findOne({
                where: { name: roleName },
            });
            if (!role) {
                throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
            }
            const user = await this.userModel.create({
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
            });
            await user.$set('roles', [role]);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: role.name,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to register user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(dto) {
        try {
            const user = await this.userModel.findOne({
                where: { email: dto.email },
                include: [
                    {
                        model: role_model_1.Role,
                        through: { attributes: [] },
                    },
                ],
            });
            if (!user) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            const isMatch = await bcrypt.compare(dto.password, user.password);
            if (!isMatch) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            const roleName = user.roles?.[0]?.name || 'user';
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: roleName,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to login', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __metadata("design:paramtypes", [Object, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map