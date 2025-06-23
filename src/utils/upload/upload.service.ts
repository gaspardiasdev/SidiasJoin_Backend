import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import cloudinary from './cloudinary.config';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const maxImageSize = 5 * 1024 * 1024;
      if (file.fieldname === "image") {
        if (file.size > maxImageSize) {
          throw new BadRequestException("The image is too large");
        }
      }

      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'sidias-join/profile-photo' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as any);
          },
        ).end(file.buffer);
      });

      return result.secure_url;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao fazer upload da imagem');
    }
  }
}
