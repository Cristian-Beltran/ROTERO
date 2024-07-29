import { Route } from './routes.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateRouteDto } from './routes.dto';
import { OperatorsService } from 'src/operators/operators.service';
export declare class RoutesService {
    private routeRepository;
    private userService;
    private operatorService;
    constructor(routeRepository: Repository<Route>, userService: UsersService, operatorService: OperatorsService);
    getRoutes(): Promise<Route[]>;
    getRoute(id: number): Promise<Route>;
    createRoute(data: CreateRouteDto, userId: number): Promise<Route>;
    updateRoute(id: number, data: CreateRouteDto, userId: number): Promise<Route>;
    deleteRoute(id: number): Promise<any>;
    uploadFiles(id: number, url: string): Promise<boolean>;
}
