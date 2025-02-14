import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('products/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') productId: string,
  ) {
    return this.uploadService.uploadProductImage(file, productId);
  }

  @Delete(':id')
  async deleteImage(@Param('id', ParseIntPipe) imageId: number) {
    return this.uploadService.deleteProductImage(imageId);
  }
}
