import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './routes.dto';
import { Request } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('routes')
export class RoutesController {
  constructor(
    private routeService: RoutesService,
    private cloudinaryService: CloudinaryService,
  ) {}
  @Get()
  async getRoutes() {
    return await this.routeService.getRoutes();
  }
  @Get(':id')
  async getRoute(@Param('id') id: number) {
    return await this.routeService.getRoute(id);
  }
  @Post()
  async createRoute(@Body() data: CreateRouteDto, @Req() req: Request) {
    const userId = req['user'].sub;
    return await this.routeService.createRoute(data, userId);
  }
  @Patch(':id')
  async updateRoute(
    @Param('id') id: number,
    @Body() data: CreateRouteDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return await this.routeService.updateRoute(id, data, userId);
  }
  @Delete(':id')
  async deleteRoute(@Param('id') id: number) {
    return await this.routeService.deleteRoute(id);
  }
  @Patch(':id/files')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const cloudinary = await this.cloudinaryService.uploadFile(file);
    const secure_url = cloudinary.secure_url;
    return await this.routeService.uploadFiles(id, secure_url);
  }
}
