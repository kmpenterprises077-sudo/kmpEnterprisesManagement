import { Model } from 'sequelize-typescript';
import { User } from '../users/user.model';
export interface RoleCreationAttributes {
    name: string;
}
export declare class Role extends Model<Role, RoleCreationAttributes> {
    id: number;
    name: string;
    users?: User[];
}
