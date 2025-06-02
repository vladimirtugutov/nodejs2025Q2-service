import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { validate as isUUID } from 'uuid';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const track = this.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  create(dto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: randomUUID(),
      ...dto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, dto: UpdateTrackDto): Track {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const track = this.tracks.find((t) => t.id === id);
    if (!track) throw new NotFoundException('Track not found');
    Object.assign(track, dto);
    return track;
  }

  delete(id: string): void {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');
    const index = this.tracks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('Track not found');
    this.tracks.splice(index, 1);
  }
}
