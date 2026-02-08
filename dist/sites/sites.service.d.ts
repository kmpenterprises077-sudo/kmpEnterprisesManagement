import { Site } from './site.model';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
export declare class SitesService {
    private readonly siteModel;
    constructor(siteModel: typeof Site);
    findAll(): Promise<{
        id: number;
        name: string;
        location: string | null;
        manager: string | null;
        company: string | null;
        status: string | null;
        createdAt: any;
    }[]>;
    create(dto: CreateSiteDto): Promise<{
        id: number;
        name: string;
        location: string | null;
        manager: string | null;
        company: string | null;
        status: string | null;
        createdAt: any;
    }>;
    update(id: number, dto: UpdateSiteDto): Promise<{
        id: number;
        name: string;
        location: string | null;
        manager: string | null;
        company: string | null;
        status: string | null;
        createdAt: any;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
