import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
export declare class SitesController {
    private readonly sitesService;
    constructor(sitesService: SitesService);
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
    update(id: string, dto: UpdateSiteDto): Promise<{
        id: number;
        name: string;
        location: string | null;
        manager: string | null;
        company: string | null;
        status: string | null;
        createdAt: any;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
