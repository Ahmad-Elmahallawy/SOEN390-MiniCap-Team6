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
import { Forum } from "./Forum";
import { ForumCountArgs } from "./ForumCountArgs";
import { ForumFindManyArgs } from "./ForumFindManyArgs";
import { ForumFindUniqueArgs } from "./ForumFindUniqueArgs";
import { CreateForumArgs } from "./CreateForumArgs";
import { UpdateForumArgs } from "./UpdateForumArgs";
import { DeleteForumArgs } from "./DeleteForumArgs";
import { PostFindManyArgs } from "../../post/base/PostFindManyArgs";
import { Post } from "../../post/base/Post";
import { Company } from "../../company/base/Company";
import { ForumService } from "../forum.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Forum)
export class ForumResolverBase {
  constructor(
    protected readonly service: ForumService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "read",
    possession: "any",
  })
  async _forumsMeta(
    @graphql.Args() args: ForumCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Forum])
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "read",
    possession: "any",
  })
  async forums(@graphql.Args() args: ForumFindManyArgs): Promise<Forum[]> {
    return this.service.forums(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Forum, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "read",
    possession: "own",
  })
  async forum(
    @graphql.Args() args: ForumFindUniqueArgs
  ): Promise<Forum | null> {
    const result = await this.service.forum(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Forum)
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "create",
    possession: "any",
  })
  async createForum(@graphql.Args() args: CreateForumArgs): Promise<Forum> {
    return await this.service.createForum({
      ...args,
      data: {
        ...args.data,

        company: args.data.company
            ? {
              connect: args.data.company,
            }
            : undefined,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Forum)
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "update",
    possession: "any",
  })
  async updateForum(
    @graphql.Args() args: UpdateForumArgs
  ): Promise<Forum | null> {
    try {
      return await this.service.updateForum({
        ...args,
        data: {
          ...args.data,

          company: args.data.company
              ? {
                connect: args.data.company,
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

  @graphql.Mutation(() => Forum)
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "delete",
    possession: "any",
  })
  async deleteForum(
    @graphql.Args() args: DeleteForumArgs
  ): Promise<Forum | null> {
    try {
      return await this.service.deleteForum(args);
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
  @graphql.ResolveField(() => [Post], { name: "posts" })
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "read",
    possession: "any",
  })
  async findPosts(
    @graphql.Parent() parent: Forum,
    @graphql.Args() args: PostFindManyArgs
  ): Promise<Post[]> {
    const results = await this.service.findPosts(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => Company, {
    nullable: true,
    name: "company",
  })
  @nestAccessControl.UseRoles({
    resource: "Company",
    action: "read",
    possession: "any",
  })
  async getCompany(@graphql.Parent() parent: Forum): Promise<Company | null> {
    const result = await this.service.getCompany(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
