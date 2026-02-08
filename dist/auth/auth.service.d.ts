import { User } from '../users/user.model';
import { Role } from '../roles/role.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userModel;
    private readonly roleModel;
    constructor(userModel: typeof User, roleModel: typeof Role);
    private ensureDefaultRoles;
    register(dto: RegisterDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
    }>;
    login(dto: LoginDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
    }>;
}
