import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  Query,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OperatorsService } from './operators.service';
import { CreateOperatorDto, UpdateOperatorDto } from './operators.dto';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/users.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Controller('operators')
export class OperatorsController {
  constructor(
    private operatorService: OperatorsService,
    private cloudinaryService: CloudinaryService,
  ) {}
  @Get('total-affiliates')
  async getTotalEmployeeOperators(){
    return await this.operatorService.getTotalEmployeeOperators();
  }
  @Get()
  async getOperators() {
    return await this.operatorService.getOperators();
  }
  @Delete(':id')
  async deleteOperator(@Param('id') id: number) {
    return await this.operatorService.deleteOperator(id);
  }
  @Patch(':id/authorize')
  async authorizeOperator(@Param('id') id: number) {
    return await this.operatorService.authorizeOperator(id);
  }
  @Get(':id')
  async getOperator(@Param('id') id: number) {
    return await this.operatorService.getOperator(id);
  }
  @Post()
  async createOperator(
    @Body()
    data: {
      operator: CreateOperatorDto;
      operatorUser: CreateUserDto;
    },
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    return await this.operatorService.createOperator(
      data.operator,
      data.operatorUser,
      userId,
    );
  }
  @Patch(':id')
  async updateOperator(
    @Param('id') id: number,
    @Body()
    data: {
      operator: UpdateOperatorDto;
      operatorUser: CreateUserDto;
    },
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    return await this.operatorService.updateOperator(
      id,
      data.operator,
      data.operatorUser,
      userId,
    );
  }
  @Patch(':id/files')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Query() params: { location: string },
  ) {
    const cloudinary = await this.cloudinaryService.uploadFile(file);
    const secure_url = cloudinary.secure_url;
    return await this.operatorService.uploadFiles(
      id,
      secure_url,
      params.location,
    );
  }
}
