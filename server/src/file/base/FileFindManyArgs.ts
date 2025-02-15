import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FileWhereInput } from "./FileWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { FileOrderByInput } from "./FileOrderByInput";

@ArgsType()
class FileFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => FileWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => FileWhereInput, { nullable: true })
  @Type(() => FileWhereInput)
  where?: FileWhereInput;

  @ApiProperty({
    required: false,
    type: [FileOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [FileOrderByInput], { nullable: true })
  @Type(() => FileOrderByInput)
  orderBy?: Array<FileOrderByInput>;

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

export { FileFindManyArgs as FileFindManyArgs };
