import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { validate as isUUID } from 'uuid';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const album = this.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  create(dto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: randomUUID(),
      ...dto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, dto: UpdateAlbumDto): Album {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const album = this.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException('Album not found');
    Object.assign(album, dto);
    return album;
  }

  delete(id: string): void {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const index = this.albums.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException('Album not found');
    this.albums.splice(index, 1);
  }
}