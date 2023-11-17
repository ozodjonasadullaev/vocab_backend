import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateLanguageDto } from './dto';
import { LanguageService } from './language.service';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/decorators';

@UseGuards(JwtGuard)
@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}
  @UseGuards(RoleGuard)
  @Roles('admin')
  @Post()
  createLanguage(@Body() dto: CreateLanguageDto) {
    return this.languageService.createlanguage(dto);
  }
  @Get()
  getLanguages() {
    return this.languageService.getLanguages();
  }
}
