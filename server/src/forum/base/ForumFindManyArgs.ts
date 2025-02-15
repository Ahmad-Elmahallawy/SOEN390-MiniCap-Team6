import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ForumWhereInput } from "./ForumWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ForumOrderByInput } from "./ForumOrderByInput";

@ArgsType()
class ForumFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ForumWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => ForumWhereInput, { nullable: true })
  @Type(() => ForumWhereInput)
  where?: ForumWhereInput;

  @ApiProperty({
    required: false,
    type: [ForumOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [ForumOrderByInput], { nullable: true })
  @Type(() => ForumOrderByInput)
  orderBy?: Array<ForumOrderByInput>;

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

export { ForumFindManyArgs as ForumFindManyArgs };
