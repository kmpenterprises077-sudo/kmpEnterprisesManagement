import { User } from './user.model';
import { Role } from '../roles/role.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly userModel;
    private readonly roleModel;
    constructor(userModel: typeof User, roleModel: typeof Role);
    private ensureDefaultRoles;
    private getRoleOrThrow;
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: any;
    }[]>;
    create(dto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: any;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: any;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
