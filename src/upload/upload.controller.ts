import {
  Controller,
  Post,
  UseInterceptors,
  Param,
  ParseIntPipe,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('products/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadProductImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') productId: string,
  ) {
    return this.uploadService.uploadProductImages(files, productId);
  }

  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) imageId: number) {
    return this.uploadService.deleteProductImage(imageId);
  }
}
