import { IsNotEmpty } from 'class-validator';
export class CreateBlogDto {
    @IsNotEmpty()
    topic: string;
  
    @IsNotEmpty()
    img: string;
  
    @IsNotEmpty()
    content: string;
}
