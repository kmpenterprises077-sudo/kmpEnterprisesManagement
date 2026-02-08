import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    update(id: string, dto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: any;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
