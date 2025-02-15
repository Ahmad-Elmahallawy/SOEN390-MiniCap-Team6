import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserCondoWhereInput } from "./UserCondoWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { UserCondoOrderByInput } from "./UserCondoOrderByInput";

@ArgsType()
class UserCondoFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => UserCondoWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => UserCondoWhereInput, { nullable: true })
  @Type(() => UserCondoWhereInput)
  where?: UserCondoWhereInput;

  @ApiProperty({
    required: false,
    type: [UserCondoOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [UserCondoOrderByInput], { nullable: true })
  @Type(() => UserCondoOrderByInput)
  orderBy?: Array<UserCondoOrderByInput>;

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

export { UserCondoFindManyArgs as UserCondoFindManyArgs };
