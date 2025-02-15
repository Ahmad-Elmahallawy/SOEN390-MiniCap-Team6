import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { UserCondoService } from "../userCondo.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { UserCondoCreateInput } from "./UserCondoCreateInput";
import { UserCondo } from "./UserCondo";
import { UserCondoFindManyArgs } from "./UserCondoFindManyArgs";
import { UserCondoWhereUniqueInput } from "./UserCondoWhereUniqueInput";
import { UserCondoUpdateInput } from "./UserCondoUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class UserCondoControllerBase {
  constructor(
    protected readonly service: UserCondoService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: UserCondo })
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createUserCondo(
    @common.Body() data: UserCondoCreateInput
  ): Promise<UserCondo> {
    return await this.service.createUserCondo({
      data: {
        ...data,

        condo: data.condo
          ? {
              connect: data.condo,
            }
          : undefined,

        user: data.user
          ? {
              connect: data.user,
            }
          : undefined,
      },
      select: {
        condo: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [UserCondo] })
  @ApiNestedQuery(UserCondoFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async userCondos(@common.Req() request: Request): Promise<UserCondo[]> {
    const args = plainToClass(UserCondoFindManyArgs, request.query);
    return this.service.userCondos({
      ...args,
      select: {
        condo: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: UserCondo })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async userCondo(
    @common.Param() params: UserCondoWhereUniqueInput
  ): Promise<UserCondo | null> {
    const result = await this.service.userCondo({
      where: params,
      select: {
        condo: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
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
  @swagger.ApiOkResponse({ type: UserCondo })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateUserCondo(
    @common.Param() params: UserCondoWhereUniqueInput,
    @common.Body() data: UserCondoUpdateInput
  ): Promise<UserCondo | null> {
    try {
      return await this.service.updateUserCondo({
        where: params,
        data: {
          ...data,

          condo: data.condo
            ? {
                connect: data.condo,
              }
            : undefined,

          user: data.user
            ? {
                connect: data.user,
              }
            : undefined,
        },
        select: {
          condo: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
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
  @swagger.ApiOkResponse({ type: UserCondo })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteUserCondo(
    @common.Param() params: UserCondoWhereUniqueInput
  ): Promise<UserCondo | null> {
    try {
      return await this.service.deleteUserCondo({
        where: params,
        select: {
          condo: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          updatedAt: true,

          user: {
            select: {
              id: true,
            },
          },
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
}
