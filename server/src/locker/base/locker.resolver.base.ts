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
import { Locker } from "./Locker";
import { LockerCountArgs } from "./LockerCountArgs";
import { LockerFindManyArgs } from "./LockerFindManyArgs";
import { LockerFindUniqueArgs } from "./LockerFindUniqueArgs";
import { CreateLockerArgs } from "./CreateLockerArgs";
import { UpdateLockerArgs } from "./UpdateLockerArgs";
import { DeleteLockerArgs } from "./DeleteLockerArgs";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { Property } from "../../property/base/Property";
import { LockerService } from "../locker.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Locker)
export class LockerResolverBase {
  constructor(
    protected readonly service: LockerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "read",
    possession: "any",
  })
  async _lockersMeta(
    @graphql.Args() args: LockerCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Locker])
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "read",
    possession: "any",
  })
  async lockers(@graphql.Args() args: LockerFindManyArgs): Promise<Locker[]> {
    return this.service.lockers(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Locker, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "read",
    possession: "own",
  })
  async locker(
    @graphql.Args() args: LockerFindUniqueArgs
  ): Promise<Locker | null> {
    const result = await this.service.locker(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Locker)
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "create",
    possession: "any",
  })
  async createLocker(@graphql.Args() args: CreateLockerArgs): Promise<Locker> {
    return await this.service.createLocker({
      ...args,
      data: {
        ...args.data,

        condoUnits: args.data.condoUnits
          ? {
              connect: args.data.condoUnits,
            }
          : undefined,

        property: args.data.property
          ? {
              connect: args.data.property,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Locker)
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "update",
    possession: "any",
  })
  async updateLocker(
    @graphql.Args() args: UpdateLockerArgs
  ): Promise<Locker | null> {
    try {
      return await this.service.updateLocker({
        ...args,
        data: {
          ...args.data,

          condoUnits: args.data.condoUnits
            ? {
                connect: args.data.condoUnits,
              }
            : undefined,

          property: args.data.property
            ? {
                connect: args.data.property,
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

  @graphql.Mutation(() => Locker)
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "delete",
    possession: "any",
  })
  async deleteLocker(
    @graphql.Args() args: DeleteLockerArgs
  ): Promise<Locker | null> {
    try {
      return await this.service.deleteLocker(args);
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
  @graphql.ResolveField(() => CondoUnit, {
    nullable: true,
    name: "condoUnits",
  })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "any",
  })
  async getCondoUnits(
    @graphql.Parent() parent: Locker
  ): Promise<CondoUnit | null> {
    const result = await this.service.getCondoUnits(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Property, {
    nullable: true,
    name: "property",
  })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "any",
  })
  async getProperty(
    @graphql.Parent() parent: Locker
  ): Promise<Property | null> {
    const result = await this.service.getProperty(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
