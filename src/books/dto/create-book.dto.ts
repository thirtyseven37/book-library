import { IsInt, IsISBN, IsPositive, IsString, Length, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 100)
  author: string;

  @IsISBN()
  isbn: string;

  @IsInt()
  @IsPositive()
  pages: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
