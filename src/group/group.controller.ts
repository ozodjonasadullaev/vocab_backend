import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}
  @Post()
  createGroup(@Body() dto: CreateGroupDto) {
    return this.groupService.createGroup(dto);
  }
  @Get(':id')
  getGroupWords(@Param('id') id: string) {
    return this.groupService.getGroupWords(+id);
  }
  @Get()
  getGroups() {
    return this.groupService.getGroups();
  }
}
