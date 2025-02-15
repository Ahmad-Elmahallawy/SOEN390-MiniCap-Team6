import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { ForumService } from "../forum.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { RequestObject } from "../../request/base/Request";
import { ForumCreateInput } from "./ForumCreateInput";
import { Forum } from "./Forum";
import { Post } from "../../post/base/Post";
import { ForumFindManyArgs } from "./ForumFindManyArgs";
import { ForumWhereUniqueInput } from "./ForumWhereUniqueInput";
import { ForumUpdateInput } from "./ForumUpdateInput";
import { PostFindManyArgs } from "../../post/base/PostFindManyArgs";
import { PostWhereUniqueInput } from "../../post/base/PostWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ForumControllerBase {
  constructor(
    protected readonly service: ForumService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Forum })
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createForum(@common.Body() data: ForumCreateInput): Promise<Forum> {
    return await this.service.createForum({
      data: {
        ...data,

        company: data.company
            ? {
              connect: data.company,
            }
            : undefined,
      },
      select: {
        company: {
          select: {
            id: true,
          },
        },
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Forum] })
  @ApiNestedQuery(ForumFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async forums(@common.Req() request: Request): Promise<Forum[]> {
    const args = plainToClass(ForumFindManyArgs, request.query);
    return this.service.forums({
      ...args,
      select: {
        company: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Forum })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async forum(
    @common.Param() params: ForumWhereUniqueInput
  ): Promise<Forum | null> {
    const result = await this.service.forum({
      where: params,
      select: {
        company: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Forum })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateForum(
    @common.Param() params: ForumWhereUniqueInput,
    @common.Body() data: ForumUpdateInput
  ): Promise<Forum | null> {
    try {
      return await this.service.updateForum({
        where: params,
        data: {
          ...data,

          company: data.company
              ? {
                connect: data.company,
              }
              : undefined,
        },
        select: {
          company: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Forum })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteForum(
    @common.Param() params: ForumWhereUniqueInput
  ): Promise<Forum | null> {
    try {
      return await this.service.deleteForum({
        where: params,
        select: {
          company: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/posts")
  @ApiNestedQuery(PostFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Post",
    action: "read",
    possession: "any",
  })
  async findPosts(
    @common.Req() request: Request,
    @common.Param() params: ForumWhereUniqueInput
  ): Promise<Post[]> {
    const query = plainToClass(PostFindManyArgs, request.query);
    const results = await this.service.findPosts(params.id, {
      ...query,
      select: {
        content: true,
        createdAt: true,

        forum: {
          select: {
            id: true,
          },
        },

        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/posts")
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "update",
    possession: "any",
  })
  async connectPosts(
    @common.Param() params: ForumWhereUniqueInput,
    @common.Body() body: PostWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      posts: {
        connect: body,
      },
    };
    await this.service.updateForum({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/posts")
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "update",
    possession: "any",
  })
  async updatePosts(
    @common.Param() params: ForumWhereUniqueInput,
    @common.Body() body: PostWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      posts: {
        set: body,
      },
    };
    await this.service.updateForum({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/posts")
  @nestAccessControl.UseRoles({
    resource: "Forum",
    action: "update",
    possession: "any",
  })
  async disconnectPosts(
    @common.Param() params: ForumWhereUniqueInput,
    @common.Body() body: PostWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      posts: {
        disconnect: body,
      },
    };
    await this.service.updateForum({
      where: params,
      data,
      select: { id: true },
    });
  }
}
