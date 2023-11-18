import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dto';
import { CourseService } from './course.service';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/decorators';

@UseGuards(JwtGuard)
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @UseGuards(RoleGuard)
  @Roles('admin')
  @Post()
  createCourse(@Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(dto);
  }
  @Get()
  getCourses() {
    return this.courseService.getCourses();
  }
  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(+id);
  }
}
