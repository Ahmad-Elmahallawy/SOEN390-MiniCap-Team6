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
import { UserCondo } from "./UserCondo";
import { UserCondoCountArgs } from "./UserCondoCountArgs";
import { UserCondoFindManyArgs } from "./UserCondoFindManyArgs";
import { UserCondoFindUniqueArgs } from "./UserCondoFindUniqueArgs";
import { CreateUserCondoArgs } from "./CreateUserCondoArgs";
import { UpdateUserCondoArgs } from "./UpdateUserCondoArgs";
import { DeleteUserCondoArgs } from "./DeleteUserCondoArgs";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { User } from "../../user/base/User";
import { UserCondoService } from "../userCondo.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => UserCondo)
export class UserCondoResolverBase {
  constructor(
    protected readonly service: UserCondoService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "read",
    possession: "any",
  })
  async _userCondosMeta(
    @graphql.Args() args: UserCondoCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [UserCondo])
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "read",
    possession: "any",
  })
  async userCondos(
    @graphql.Args() args: UserCondoFindManyArgs
  ): Promise<UserCondo[]> {
    return this.service.userCondos(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => UserCondo, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "read",
    possession: "own",
  })
  async userCondo(
    @graphql.Args() args: UserCondoFindUniqueArgs
  ): Promise<UserCondo | null> {
    const result = await this.service.userCondo(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => UserCondo)
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "create",
    possession: "any",
  })
  async createUserCondo(
    @graphql.Args() args: CreateUserCondoArgs
  ): Promise<UserCondo> {
    return await this.service.createUserCondo({
      ...args,
      data: {
        ...args.data,

        condo: args.data.condo
          ? {
              connect: args.data.condo,
            }
          : undefined,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => UserCondo)
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "update",
    possession: "any",
  })
  async updateUserCondo(
    @graphql.Args() args: UpdateUserCondoArgs
  ): Promise<UserCondo | null> {
    try {
      return await this.service.updateUserCondo({
        ...args,
        data: {
          ...args.data,

          condo: args.data.condo
            ? {
                connect: args.data.condo,
              }
            : undefined,

          user: args.data.user
            ? {
                connect: args.data.user,
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

  @graphql.Mutation(() => UserCondo)
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "delete",
    possession: "any",
  })
  async deleteUserCondo(
    @graphql.Args() args: DeleteUserCondoArgs
  ): Promise<UserCondo | null> {
    try {
      return await this.service.deleteUserCondo(args);
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
    name: "condo",
  })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "any",
  })
  async getCondo(
    @graphql.Parent() parent: UserCondo
  ): Promise<CondoUnit | null> {
    const result = await this.service.getCondo(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => User, {
    nullable: true,
    name: "user",
  })
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async getUser(@graphql.Parent() parent: UserCondo): Promise<User | null> {
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
