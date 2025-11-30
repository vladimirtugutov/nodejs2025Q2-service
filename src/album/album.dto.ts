import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
