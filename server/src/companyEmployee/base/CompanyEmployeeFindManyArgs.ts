import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompanyEmployeeWhereInput } from "./CompanyEmployeeWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { CompanyEmployeeOrderByInput } from "./CompanyEmployeeOrderByInput";

@ArgsType()
class CompanyEmployeeFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CompanyEmployeeWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => CompanyEmployeeWhereInput, { nullable: true })
  @Type(() => CompanyEmployeeWhereInput)
  where?: CompanyEmployeeWhereInput;

  @ApiProperty({
    required: false,
    type: [CompanyEmployeeOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [CompanyEmployeeOrderByInput], { nullable: true })
  @Type(() => CompanyEmployeeOrderByInput)
  orderBy?: Array<CompanyEmployeeOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { CompanyEmployeeFindManyArgs as CompanyEmployeeFindManyArgs };
