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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const bcrypt = __importStar(require("bcryptjs"));
const user_model_1 = require("./user.model");
const role_model_1 = require("../roles/role.model");
let UsersService = class UsersService {
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
    async getRoleOrThrow(roleName) {
        const normalized = (roleName || 'user').toLowerCase();
        if (normalized !== 'admin' && normalized !== 'user') {
            throw new common_1.HttpException('Invalid role', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.ensureDefaultRoles();
        const role = await this.roleModel.findOne({ where: { name: normalized } });
        if (!role) {
            throw new common_1.HttpException('Role not found', common_1.HttpStatus.NOT_FOUND);
        }
        return role;
    }
    async findAll() {
        try {
            const users = await this.userModel.findAll({
                include: [
                    {
                        model: role_model_1.Role,
                        through: { attributes: [] },
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.roles?.[0]?.name || 'user',
                createdAt: user.createdAt,
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch users', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(dto) {
        try {
            const existing = await this.userModel.findOne({
                where: { email: dto.email },
            });
            if (existing) {
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
            }
            const role = await this.getRoleOrThrow(dto.role);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(dto.password, salt);
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
                createdAt: user.createdAt,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to create user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, dto) {
        try {
            const user = await this.userModel.findByPk(id, {
                include: [
                    {
                        model: role_model_1.Role,
                        through: { attributes: [] },
                    },
                ],
            });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (dto.email) {
                const existing = await this.userModel.findOne({
                    where: { email: dto.email, id: { [sequelize_2.Op.ne]: id } },
                });
                if (existing) {
                    throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
                }
            }
            if (dto.name) {
                user.name = dto.name;
            }
            if (dto.email) {
                user.email = dto.email;
            }
            if (dto.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(dto.password, salt);
            }
            await user.save();
            if (dto.role) {
                const role = await this.getRoleOrThrow(dto.role);
                await user.$set('roles', [role]);
            }
            const roleName = dto.role || user.roles?.[0]?.name || 'user';
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: roleName,
                createdAt: user.createdAt,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to update user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const user = await this.userModel.findByPk(id);
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            await user.destroy();
            return { message: 'User deleted successfully' };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to delete user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map