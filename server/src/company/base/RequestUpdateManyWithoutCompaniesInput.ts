import { InputType, Field } from "@nestjs/graphql";
import { RequestWhereUniqueInput } from "../../request/base/RequestWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class RequestUpdateManyWithoutCompaniesInput {
  @Field(() => [RequestWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RequestWhereUniqueInput],
  })
  connect?: Array<RequestWhereUniqueInput>;

  @Field(() => [RequestWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RequestWhereUniqueInput],
  })
  disconnect?: Array<RequestWhereUniqueInput>;

  @Field(() => [RequestWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RequestWhereUniqueInput],
  })
  set?: Array<RequestWhereUniqueInput>;
}

export { RequestUpdateManyWithoutCompaniesInput as RequestUpdateManyWithoutCompaniesInput };
