import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReservationWhereInput } from "./ReservationWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ReservationOrderByInput } from "./ReservationOrderByInput";

@ArgsType()
class ReservationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ReservationWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => ReservationWhereInput, { nullable: true })
  @Type(() => ReservationWhereInput)
  where?: ReservationWhereInput;

  @ApiProperty({
    required: false,
    type: [ReservationOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [ReservationOrderByInput], { nullable: true })
  @Type(() => ReservationOrderByInput)
  orderBy?: Array<ReservationOrderByInput>;

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

export { ReservationFindManyArgs as ReservationFindManyArgs };
