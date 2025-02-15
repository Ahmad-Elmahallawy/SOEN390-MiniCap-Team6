import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { CostService } from "../cost.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { CostCreateInput } from "./CostCreateInput";
import { Cost } from "./Cost";
import { Post } from "../../post/base/Post";
import { CostFindManyArgs } from "./CostFindManyArgs";
import { CostWhereUniqueInput } from "./CostWhereUniqueInput";
import { CostUpdateInput } from "./CostUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class CostControllerBase {
  constructor(
    protected readonly service: CostService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Cost })
  @nestAccessControl.UseRoles({
    resource: "Cost",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createCost(@common.Body() data: CostCreateInput): Promise<Cost> {
    return await this.service.createCost({
      data: {
        ...data,

        company: data.company
          ? {
              connect: data.company,
            }
          : undefined,
      },
      select: {
        amount: true,

        company: {
          select: {
            id: true,
          },
        },

        costName: true,
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Cost] })
  @ApiNestedQuery(CostFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Cost",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async costs(@common.Req() request: Request): Promise<Cost[]> {
    const args = plainToClass(CostFindManyArgs, request.query);
    return this.service.costs({
      ...args,
      select: {
        amount: true,

        company: {
          select: {
            id: true,
          },
        },

        costName: true,
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Cost })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Cost",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async cost(
    @common.Param() params: CostWhereUniqueInput
  ): Promise<Cost | null> {
    const result = await this.service.cost({
      where: params,
      select: {
        amount: true,

        company: {
          select: {
            id: true,
          },
        },

        costName: true,
        createdAt: true,
        id: true,
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
  @swagger.ApiOkResponse({ type: Cost })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Cost",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateCost(
    @common.Param() params: CostWhereUniqueInput,
    @common.Body() data: CostUpdateInput
  ): Promise<Cost | null> {
    try {
      return await this.service.updateCost({
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
          amount: true,

          company: {
            select: {
              id: true,
            },
          },

          costName: true,
          createdAt: true,
          id: true,
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
  @swagger.ApiOkResponse({ type: Cost })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Cost",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteCost(
    @common.Param() params: CostWhereUniqueInput
  ): Promise<Cost | null> {
    try {
      return await this.service.deleteCost({
        where: params,
        select: {
          amount: true,

          company: {
            select: {
              id: true,
            },
          },

          costName: true,
          createdAt: true,
          id: true,
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
}
