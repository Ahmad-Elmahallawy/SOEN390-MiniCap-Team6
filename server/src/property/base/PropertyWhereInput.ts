import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { CondoUnitListRelationFilter } from "../../condoUnit/base/CondoUnitListRelationFilter";
import { FileListRelationFilter } from "../../file/base/FileListRelationFilter";
import { IntFilter } from "../../util/IntFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { LockerListRelationFilter } from "../../locker/base/LockerListRelationFilter";
import { ParkingSpotListRelationFilter } from "../../parkingSpot/base/ParkingSpotListRelationFilter";
import { CompanyWhereUniqueInput } from "../../company/base/CompanyWhereUniqueInput";
import { RequestListRelationFilter } from "../../request/base/RequestListRelationFilter";
import { CommonFacilityListRelationFilter } from "../../commonFacility/base/CommonFacilityListRelationFilter";
@InputType()
class PropertyWhereInput {
  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  address?: StringFilter;

  @ApiProperty({
    required: false,
    type: () => CondoUnitListRelationFilter,
  })
  @ValidateNested()
  @Type(() => CondoUnitListRelationFilter)
  @IsOptional()
  @Field(() => CondoUnitListRelationFilter, {
    nullable: true,
  })
  condoUnits?: CondoUnitListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => CommonFacilityListRelationFilter,
  })
  @ValidateNested()
  @Type(() => CommonFacilityListRelationFilter)
  @IsOptional()
  @Field(() => CommonFacilityListRelationFilter, {
    nullable: true,
  })
  commonFacilities?: CommonFacilityListRelationFilter;
  
  @ApiProperty({
    required: false,
    type: () => CompanyWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompanyWhereUniqueInput)
  @IsOptional()
  @Field(() => CompanyWhereUniqueInput, {
    nullable: true,
  })
  company?: CompanyWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => FileListRelationFilter,
  })
  @ValidateNested()
  @Type(() => FileListRelationFilter)
  @IsOptional()
  @Field(() => FileListRelationFilter, {
    nullable: true,
  })
  files?: FileListRelationFilter;

  @ApiProperty({
    required: false,
    type: () => RequestListRelationFilter,
  })
  @ValidateNested()
  @Type(() => RequestListRelationFilter)
  @IsOptional()
  @Field(() => RequestListRelationFilter, {
    nullable: true,
  })
  requests?: RequestListRelationFilter;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  id?: IntFilter;

  @ApiProperty({
    required: false,
    type: IntNullableFilter,
  })
  @Type(() => IntNullableFilter)
  @IsOptional()
  @Field(() => IntNullableFilter, {
    nullable: true,
  })
  lockerCount?: IntNullableFilter;

  @ApiProperty({
    required: false,
    type: () => LockerListRelationFilter,
  })
  @ValidateNested()
  @Type(() => LockerListRelationFilter)
  @IsOptional()
  @Field(() => LockerListRelationFilter, {
    nullable: true,
  })
  Lockers?: LockerListRelationFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  name?: StringFilter;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  parkingCount?: IntFilter;

  @ApiProperty({
    required: false,
    type: () => ParkingSpotListRelationFilter,
  })
  @ValidateNested()
  @Type(() => ParkingSpotListRelationFilter)
  @IsOptional()
  @Field(() => ParkingSpotListRelationFilter, {
    nullable: true,
  })
  ParkingSpots?: ParkingSpotListRelationFilter;

  @ApiProperty({
    required: false,
    type: IntFilter,
  })
  @Type(() => IntFilter)
  @IsOptional()
  @Field(() => IntFilter, {
    nullable: true,
  })
  unitCount?: IntFilter;
}

export { PropertyWhereInput as PropertyWhereInput };
