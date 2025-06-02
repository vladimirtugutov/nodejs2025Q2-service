import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { validate as isUUID } from 'uuid';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  create(dto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: randomUUID(),
      ...dto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, dto: UpdateArtistDto): Artist {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    Object.assign(artist, dto);
    return artist;
  }

  delete(id: string): void {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const index = this.artists.findIndex((a) => a.id === id);
    if (index === -1) throw new NotFoundException('Artist not found');
    this.artists.splice(index, 1);
  }
}