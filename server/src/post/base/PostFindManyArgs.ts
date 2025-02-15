import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PostWhereInput } from "./PostWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { PostOrderByInput } from "./PostOrderByInput";

@ArgsType()
class PostFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PostWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => PostWhereInput, { nullable: true })
  @Type(() => PostWhereInput)
  where?: PostWhereInput;

  @ApiProperty({
    required: false,
    type: [PostOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [PostOrderByInput], { nullable: true })
  @Type(() => PostOrderByInput)
  orderBy?: Array<PostOrderByInput>;

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

export { PostFindManyArgs as PostFindManyArgs };
