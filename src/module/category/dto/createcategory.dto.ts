import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class createCategoryDTO {
  @IsNotEmpty({ message: 'Please enter name.' })
  @IsString({ message: 'Please enter valid name.' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name should not contain numbers or special characters.',
  })
  readonly name: string;

  @IsOptional()
  @IsInt({ message: 'ParentId should be a number.' })
  readonly parentId: number;

  @IsNotEmpty({ message: 'Please enter slug.' })
  @IsString({ message: 'Please enter valid slug.' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Slug should not contain numbers or special characters.',
  })
  readonly slug: string;

  @IsNotEmpty({ message: 'Please enter status.' })
  @IsBoolean({ message: 'Status Should Be true or false' })
  readonly status: boolean;
}
