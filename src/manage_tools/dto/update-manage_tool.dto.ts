import { PartialType } from '@nestjs/mapped-types';
import { CreateManageToolDto } from './create-manage_tool.dto';

export class UpdateManageToolDto extends PartialType(CreateManageToolDto) {}
