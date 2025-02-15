import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { CommonFacilityService } from "../commonFacility.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { CommonFacilityCreateInput } from "./CommonFacilityCreateInput";
import { CommonFacility } from "./CommonFacility";
import { Post } from "../../post/base/Post";
import { CommonFacilityFindManyArgs } from "./CommonFacilityFindManyArgs";
import { CommonFacilityWhereUniqueInput } from "./CommonFacilityWhereUniqueInput";
import { CommonFacilityUpdateInput } from "./CommonFacilityUpdateInput";
import { ReservationFindManyArgs } from "../../reservation/base/ReservationFindManyArgs";
import { Reservation } from "../../reservation/base/Reservation";
import { ReservationWhereUniqueInput } from "../../reservation/base/ReservationWhereUniqueInput";
import { RequestObject } from "../../request/base/Request";
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class CommonFacilityControllerBase {
  constructor(
    protected readonly service: CommonFacilityService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: CommonFacility })
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createCommonFacility(
    @common.Body() data: CommonFacilityCreateInput
  ): Promise<CommonFacility> {
    return await this.service.createCommonFacility({
      data: {
        ...data,

        property: data.property
            ? {
              connect: data.property,
            }
            : undefined,
      },
      select: {
        createdAt: true,
        facilityType: true,
        id: true,
        property: {
          select: {
            id: true,
          },
        },

        status: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [CommonFacility] })
  @ApiNestedQuery(CommonFacilityFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async commonFacilities(
    @common.Req() request: Request
  ): Promise<CommonFacility[]> {
    const args = plainToClass(CommonFacilityFindManyArgs, request.query);
    return this.service.commonFacilities({
      ...args,
      select: {
        createdAt: true,
        facilityType: true,
        id: true,
        property: {
          select: {
            id: true,
          },
        },

        status: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: CommonFacility })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async commonFacility(
    @common.Param() params: CommonFacilityWhereUniqueInput
  ): Promise<CommonFacility | null> {
    const result = await this.service.commonFacility({
      where: params,
      select: {
        createdAt: true,
        facilityType: true,
        id: true,
        property: {
          select: {
            id: true,
          },
        },

        status: true,
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
  @swagger.ApiOkResponse({ type: CommonFacility })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateCommonFacility(
    @common.Param() params: CommonFacilityWhereUniqueInput,
    @common.Body() data: CommonFacilityUpdateInput
  ): Promise<CommonFacility | null> {
    try {
      return await this.service.updateCommonFacility({
        where: params,
        data: {
          ...data,

          property: data.property
              ? {
                connect: data.property,
              }
              : undefined,
        },
        select: {
          createdAt: true,
          facilityType: true,
          id: true,
          property: {
            select: {
              id: true,
            },
          },

          status: true,
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
  @swagger.ApiOkResponse({ type: CommonFacility })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteCommonFacility(
    @common.Param() params: CommonFacilityWhereUniqueInput
  ): Promise<CommonFacility | null> {
    try {
      return await this.service.deleteCommonFacility({
        where: params,
        select: {
          createdAt: true,
          facilityType: true,
          id: true,
          property: {
            select: {
              id: true,
            },
          },

          status: true,
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
  @common.Get("/:id/availabilities")
  @ApiNestedQuery(ReservationFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "read",
    possession: "any",
  })
  async findAvailabilities(
    @common.Req() request: Request,
    @common.Param() params: CommonFacilityWhereUniqueInput
  ): Promise<Reservation[]> {
    const query = plainToClass(ReservationFindManyArgs, request.query);
    const results = await this.service.findAvailabilities(params.id, {
      ...query,
      select: {
        availablity: true,

        commonFacility: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        notes: true,
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

  @common.Post("/:id/availabilities")
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "update",
    possession: "any",
  })
  async connectAvailabilities(
    @common.Param() params: CommonFacilityWhereUniqueInput,
    @common.Body() body: ReservationWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      availabilities: {
        connect: body,
      },
    };
    await this.service.updateCommonFacility({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/availabilities")
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "update",
    possession: "any",
  })
  async updateAvailabilities(
    @common.Param() params: CommonFacilityWhereUniqueInput,
    @common.Body() body: ReservationWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      availabilities: {
        set: body,
      },
    };
    await this.service.updateCommonFacility({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/availabilities")
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "update",
    possession: "any",
  })
  async disconnectAvailabilities(
    @common.Param() params: CommonFacilityWhereUniqueInput,
    @common.Body() body: ReservationWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      availabilities: {
        disconnect: body,
      },
    };
    await this.service.updateCommonFacility({
      where: params,
      data,
      select: { id: true },
    });
  }
}
