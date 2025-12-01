import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  studyTime: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
