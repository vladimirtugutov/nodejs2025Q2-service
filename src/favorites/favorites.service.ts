import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites } from './favorites.entity';
import { validate as isUUID } from 'uuid';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  findAll() {
  return {
    artists: this.favorites.artists
      .map((id) => {
        try {
          return this.artistService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean),

    albums: this.favorites.albums
      .map((id) => {
        try {
          return this.albumService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean),

    tracks: this.favorites.tracks
      .map((id) => {
        try {
          return this.trackService.findOne(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean),
  };
}

  add(type: keyof Favorites, id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    try {
      if (type === 'artists') {
        this.artistService.findOne(id);
      } else if (type === 'albums') {
        this.albumService.findOne(id);
      } else if (type === 'tracks') {
        this.trackService.findOne(id);
      } else {
        throw new BadRequestException('Invalid entity type');
      }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new UnprocessableEntityException(`${type.slice(0, -1)} not found`);
      }
      throw e;
    }

    if (!this.favorites[type].includes(id)) {
      this.favorites[type].push(id);
    }
  }

  remove(type: keyof Favorites, id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const index = this.favorites[type].indexOf(id);
    if (index === -1) {
      throw new NotFoundException(`${type.slice(0, -1)} is not favorite`);
    }

    this.favorites[type].splice(index, 1);
  }

  removeFromAll(id: string) {
    for (const key of Object.keys(this.favorites) as (keyof Favorites)[]) {
      this.favorites[key] = this.favorites[key].filter((favId) => favId !== id);
    }
  }
}