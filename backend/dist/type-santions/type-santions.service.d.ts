import { UsersService } from 'src/users/users.service';
import { TypeSantion } from './type-santions.entity';
import { Repository } from 'typeorm';
import { createTypeSantionDto, updateTypeSantionDto } from './type-santions.dto';
import { TypePayordersService } from 'src/type-payorders/type-payorders.service';
export declare class TypeSantionsService {
    private typeSantionRepository;
    private userService;
    private typePayorderService;
    constructor(typeSantionRepository: Repository<TypeSantion>, userService: UsersService, typePayorderService: TypePayordersService);
    getTypeSantions(): Promise<TypeSantion[]>;
    getTypeSantion(id: number): Promise<TypeSantion>;
    createTypeSantion(data: createTypeSantionDto, userId: number): Promise<TypeSantion>;
    updateTypeSantion(id: number, data: updateTypeSantionDto, userId: number): Promise<TypeSantion>;
    deleteTypeSantion(id: number): Promise<boolean>;
}
