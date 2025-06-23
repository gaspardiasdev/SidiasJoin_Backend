"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_config_1 = require("./cloudinary.config");
let UploadService = class UploadService {
    async uploadImage(file) {
        try {
            const maxImageSize = 5 * 1024 * 1024;
            if (file.fieldname === "image") {
                if (file.size > maxImageSize) {
                    throw new common_1.BadRequestException("The image is too large");
                }
            }
            const result = await new Promise((resolve, reject) => {
                cloudinary_config_1.default.uploader.upload_stream({ folder: 'sidias-join/profile-photo' }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result);
                }).end(file.buffer);
            });
            return result.secure_url;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Erro ao fazer upload da imagem');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map