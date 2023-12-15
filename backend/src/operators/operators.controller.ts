import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  @Get()
  async getOperators() {
    return this.operatorService.getOperators();
  }
  @Get(':id')
  async getOperator(@Param('id') id: number) {
    return this.operatorService.getOperator(id);
  }
  @Post()
  @UseInterceptors(FilesInterceptor('files', 3))
  async createOperator(
    @Body()
    @UploadedFiles()
    files: Express.Multer.File[],
    data: {
      operator: CreateOperatorDto;
      operatorUser: CreateUserDto;
      files: {
        route?: any;
        operatorCertification?: any;
        administrativeResolution?: any;
      };
    },
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    if (files) {
      const filesPromises = files.map((file) =>
        this.cloudinaryService.uploadFile(file),
      );
      const filesResult = await Promise.all(filesPromises);
      filesResult.forEach((fileResult) => {
        const key = Object.keys(fileResult)[0];
        data.files[key] = fileResult[key];
      });
    }
    return this.operatorService.createOperator(
      data.operator,
      data.operatorUser,
      userId,
      data.files,
    );
  }
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 3))
  async updateOperator(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') id: number,
    @Body()
    data: {
      operator: UpdateOperatorDto;
      operatorUser: CreateUserDto;
      files: {
        route?: any;
        operatorCertification?: any;
        administrativeResolution?: any;
      };
    },
    @Req() request: Request,
  ) {
    const userId = request['user'].sub;
    // .. handle multple files
    if (files) {
      const filesPromises = files.map((file) =>
        this.cloudinaryService.uploadFile(file),
      );
      const filesResult = await Promise.all(filesPromises);
      filesResult.forEach((fileResult) => {
        const key = Object.keys(fileResult)[0];
        data.files[key] = fileResult[key];
      });
    }
    return this.operatorService.updateOperator(
      id,
      data.operator,
      data.operatorUser,
      userId,
      data.files,
    );
  }
}
