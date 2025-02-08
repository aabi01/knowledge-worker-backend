import { IsString, IsNumber, IsArray, IsBoolean, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParameterDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class CreateQueryDto {
  @IsString()
  name: string;

  @IsString()
  apiId: string;

  @IsNumber()
  interval: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QueryParameterDto)
  parameters: QueryParameterDto[];

  @IsArray()
  @IsString({ each: true })
  selectedAttributes: string[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
