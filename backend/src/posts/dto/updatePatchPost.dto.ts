import { PartialType } from '@nestjs/mapped-types'; //全プロパティをオプショナル（省略可能）に
import { UpdatePostDto } from './updatePost.dto';

export class UpdatePatchPostDto extends PartialType(UpdatePostDto) {}
