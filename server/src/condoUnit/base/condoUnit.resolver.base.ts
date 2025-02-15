import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CondoUnit } from "./CondoUnit";
import { CondoUnitCountArgs } from "./CondoUnitCountArgs";
import { CondoUnitFindManyArgs } from "./CondoUnitFindManyArgs";
import { CondoUnitFindUniqueArgs } from "./CondoUnitFindUniqueArgs";
import { CreateCondoUnitArgs } from "./CreateCondoUnitArgs";
import { UpdateCondoUnitArgs } from "./UpdateCondoUnitArgs";
import { DeleteCondoUnitArgs } from "./DeleteCondoUnitArgs";
import { FileFindManyArgs } from "../../file/base/FileFindManyArgs";
import { File } from "../../file/base/File";
import { ParkingSpotFindManyArgs } from "../../parkingSpot/base/ParkingSpotFindManyArgs";
import { ParkingSpot } from "../../parkingSpot/base/ParkingSpot";
import { UserCondoFindManyArgs } from "../../userCondo/base/UserCondoFindManyArgs";
import { UserCondo } from "../../userCondo/base/UserCondo";
import { Locker } from "../../locker/base/Locker";
import { Property } from "../../property/base/Property";
import { RegistrationKey } from "../../registrationKey/base/RegistrationKey";
import { CondoUnitService } from "../condoUnit.service";
import { RequestFindManyArgs } from "../../request/base/RequestFindManyArgs";
import { RequestObject } from "../../request/base/Request";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CondoUnit)
export class CondoUnitResolverBase {
  constructor(
    protected readonly service: CondoUnitService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "any",
  })
  async _condoUnitsMeta(
    @graphql.Args() args: CondoUnitCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [CondoUnit])
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "any",
  })
  async condoUnits(
    @graphql.Args() args: CondoUnitFindManyArgs
  ): Promise<CondoUnit[]> {
    return this.service.condoUnits(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => CondoUnit, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "own",
  })
  async condoUnit(
    @graphql.Args() args: CondoUnitFindUniqueArgs
  ): Promise<CondoUnit | null> {
    const result = await this.service.condoUnit(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => CondoUnit)
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "create",
    possession: "any",
  })
  async createCondoUnit(
    @graphql.Args() args: CreateCondoUnitArgs
  ): Promise<CondoUnit> {
    return await this.service.createCondoUnit({
      ...args,
      data: {
        ...args.data,

        locker: args.data.locker
          ? {
              connect: args.data.locker,
            }
          : undefined,

        propertyID: args.data.propertyID
          ? {
              connect: args.data.propertyID,
            }
          : undefined,

        registrationKeys: args.data.registrationKeys
          ? {
              connect: args.data.registrationKeys,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => CondoUnit)
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async updateCondoUnit(
    @graphql.Args() args: UpdateCondoUnitArgs
  ): Promise<CondoUnit | null> {
    try {
      return await this.service.updateCondoUnit({
        ...args,
        data: {
          ...args.data,

          locker: args.data.locker
            ? {
                connect: args.data.locker,
              }
            : undefined,

          propertyID: args.data.propertyID
            ? {
                connect: args.data.propertyID,
              }
            : undefined,

          registrationKeys: args.data.registrationKeys
            ? {
                connect: args.data.registrationKeys,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => CondoUnit)
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "delete",
    possession: "any",
  })
  async deleteCondoUnit(
    @graphql.Args() args: DeleteCondoUnitArgs
  ): Promise<CondoUnit | null> {
    try {
      return await this.service.deleteCondoUnit(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [File], { name: "file" })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async findFile(
    @graphql.Parent() parent: CondoUnit,
    @graphql.Args() args: FileFindManyArgs
  ): Promise<File[]> {
    const results = await this.service.findFile(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [ParkingSpot], { name: "parkingSpot" })
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "any",
  })
  async findParkingSpot(
    @graphql.Parent() parent: CondoUnit,
    @graphql.Args() args: ParkingSpotFindManyArgs
  ): Promise<ParkingSpot[]> {
    const results = await this.service.findParkingSpot(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Request], { name: "requests" })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  async findRequests(
      @graphql.Parent() parent: CondoUnit,
      @graphql.Args() args: RequestFindManyArgs
  ): Promise<RequestObject[]> {
    const results = await this.service.findRequests(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [UserCondo], { name: "userCondos" })
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "read",
    possession: "any",
  })
  async findUserCondos(
    @graphql.Parent() parent: CondoUnit,
    @graphql.Args() args: UserCondoFindManyArgs
  ): Promise<UserCondo[]> {
    const results = await this.service.findUserCondos(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Locker, {
    nullable: true,
    name: "locker",
  })
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "read",
    possession: "any",
  })
  async getLocker(@graphql.Parent() parent: CondoUnit): Promise<Locker | null> {
    const result = await this.service.getLocker(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Property, {
    nullable: true,
    name: "propertyId",
  })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "any",
  })
  async getPropertyId(
    @graphql.Parent() parent: CondoUnit
  ): Promise<Property | null> {
    const result = await this.service.getPropertyId(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => RegistrationKey, {
    nullable: true,
    name: "registrationKeys",
  })
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "read",
    possession: "any",
  })
  async getRegistrationKeys(
    @graphql.Parent() parent: CondoUnit
  ): Promise<RegistrationKey | null> {
    const result = await this.service.getRegistrationKeys(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
