import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class CreateManageToolDto {

    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    img: string;
  
    @IsNotEmpty()
    @IsString()
    type: string;
  
    @IsNotEmpty()
    @IsString()
    company: string;
  
    @IsNotEmpty()
    @IsString()
    price: string;
  
    @IsNotEmpty()
    @IsString()
    unit: string;
  
    @IsNotEmpty()
    @IsString()
    Description: string;
}
