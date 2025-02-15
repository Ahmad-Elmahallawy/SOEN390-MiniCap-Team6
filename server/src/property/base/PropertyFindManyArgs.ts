import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PropertyWhereInput } from "./PropertyWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { PropertyOrderByInput } from "./PropertyOrderByInput";

@ArgsType()
class PropertyFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PropertyWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => PropertyWhereInput, { nullable: true })
  @Type(() => PropertyWhereInput)
  where?: PropertyWhereInput;

  @ApiProperty({
    required: false,
    type: [PropertyOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [PropertyOrderByInput], { nullable: true })
  @Type(() => PropertyOrderByInput)
  orderBy?: Array<PropertyOrderByInput>;

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

export { PropertyFindManyArgs as PropertyFindManyArgs };
