import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    this.favoritesService.add('tracks', id);
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    this.favoritesService.remove('tracks', id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    this.favoritesService.add('albums', id);
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    this.favoritesService.remove('albums', id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    this.favoritesService.add('artists', id);
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    this.favoritesService.remove('artists', id);
  }
}
