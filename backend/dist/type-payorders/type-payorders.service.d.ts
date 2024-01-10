import { TypePayorder } from './type-payorders.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateTypePayorderDto } from './type-payorders.dto';
export declare class TypePayordersService {
    private typePayorderRepository;
    private userService;
    constructor(typePayorderRepository: Repository<TypePayorder>, userService: UsersService);
    getTypePayorders(): Promise<TypePayorder[]>;
    getTypePayorder(id: number): Promise<TypePayorder>;
    createTypePayorder(userId: number, data: CreateTypePayorderDto): Promise<TypePayorder>;
    updateTypePayorder(id: number, data: CreateTypePayorderDto, userId: number): Promise<TypePayorder>;
    deleteTypePayorder(id: number): Promise<boolean>;
}
