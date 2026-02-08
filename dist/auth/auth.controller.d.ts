import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
