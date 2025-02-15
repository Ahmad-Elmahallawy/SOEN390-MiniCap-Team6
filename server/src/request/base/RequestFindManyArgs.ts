import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RequestWhereInput } from "./RequestWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { RequestOrderByInput } from "./RequestOrderByInput";

@ArgsType()
class RequestFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => RequestWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => RequestWhereInput, { nullable: true })
  @Type(() => RequestWhereInput)
  where?: RequestWhereInput;

  @ApiProperty({
    required: false,
    type: [RequestOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [RequestOrderByInput], { nullable: true })
  @Type(() => RequestOrderByInput)
  orderBy?: Array<RequestOrderByInput>;

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

export { RequestFindManyArgs as RequestFindManyArgs };
