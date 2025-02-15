import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ForumWhereUniqueInput } from "../../forum/base/ForumWhereUniqueInput";
import { IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ReplyUpdateManyWithoutPostsInput } from "./ReplyUpdateManyWithoutPostsInput";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";

@InputType()
class PostUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  content?: string | null;

  @ApiProperty({
    required: false,
    type: () => ForumWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ForumWhereUniqueInput)
  @IsOptional()
  @Field(() => ForumWhereUniqueInput, {
    nullable: true,
  })
  forum?: ForumWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => ReplyUpdateManyWithoutPostsInput,
  })
  @ValidateNested()
  @Type(() => ReplyUpdateManyWithoutPostsInput)
  @IsOptional()
  @Field(() => ReplyUpdateManyWithoutPostsInput, {
    nullable: true,
  })
  replies?: ReplyUpdateManyWithoutPostsInput;

  @ApiProperty({
    required: false,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  user?: UserWhereUniqueInput | null;
}

export { PostUpdateInput as PostUpdateInput };
