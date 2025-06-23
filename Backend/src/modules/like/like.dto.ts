import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  clientId: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  providerId: number;
}
