/// <reference types="multer" />
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './routes.dto';
import { Request } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class RoutesController {
    private routeService;
    private cloudinaryService;
    constructor(routeService: RoutesService, cloudinaryService: CloudinaryService);
    getRoutes(): Promise<import("./routes.entity").Route[]>;
    getRoute(id: number): Promise<import("./routes.entity").Route>;
    createRoute(data: CreateRouteDto, req: Request): Promise<import("./routes.entity").Route>;
    updateRoute(id: number, data: CreateRouteDto, req: Request): Promise<import("./routes.entity").Route>;
    deleteRoute(id: number): Promise<any>;
    uploadFiles(id: number, file: Express.Multer.File): Promise<boolean>;
}
