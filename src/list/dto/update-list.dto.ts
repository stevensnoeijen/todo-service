import { InputType, PartialType } from '@nestjs/graphql';
import { CreateListDto } from './create-list.dto';

@InputType('UpdateList')
export class UpdateListDto extends PartialType(CreateListDto) {}
