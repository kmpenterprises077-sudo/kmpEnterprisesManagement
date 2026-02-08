import { Model } from 'sequelize-typescript';
import { Role } from '../roles/role.model';
export interface UserCreationAttributes {
    name: string;
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttributes> {
    id: number;
    name: string;
    email: string;
    password: string;
    roles?: Role[];
}
