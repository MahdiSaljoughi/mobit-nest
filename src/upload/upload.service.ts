import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadProductImages(files: Express.Multer.File[], productId: string) {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (error) return reject(new Error(error.message));
            this.prisma.productImage
              .create({
                data: {
                  url: result!.secure_url,
                  product_id: Number(productId),
                },
              })
              .then((productImage) => resolve(productImage))
              .catch(() => reject(new Error('Database error occurred')));
          },
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });

    return Promise.all(uploadPromises);
  }

  async deleteProductImage(imageId: number) {
    try {
      const image = await this.prisma.productImage.findUnique({
        where: { id: imageId },
      });

      if (!image) {
        throw new Error('Image not found');
      }
      const urlParts = image.url.split('/');
      const filename = urlParts[urlParts.length - 1];
      const publicId = `products/${filename.split('.')[0]}`;

      const cloudinaryResponse: unknown = await cloudinary.uploader.destroy(
        publicId,
        {
          invalidate: true,
        },
      );

      if (
        typeof cloudinaryResponse === 'object' &&
        cloudinaryResponse !== null &&
        'result' in cloudinaryResponse
      ) {
        const response = cloudinaryResponse as { result: string };
        if (response.result !== 'ok') {
          throw new Error('Failed to delete image from Cloudinary');
        }
      } else {
        throw new Error('Invalid response from Cloudinary');
      }

      await this.prisma.productImage.delete({
        where: { id: imageId },
      });

      return { message: 'Image deleted successfully' };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete image';
      throw new Error(errorMessage);
    }
  }
}
