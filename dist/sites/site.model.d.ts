import { Model } from 'sequelize-typescript';
export interface SiteCreationAttributes {
    name: string;
    location?: string;
    manager?: string;
    company?: string;
    status?: string;
}
export declare class Site extends Model<Site, SiteCreationAttributes> {
    id: number;
    name: string;
    location: string | null;
    manager: string | null;
    company: string | null;
    status: string | null;
}
