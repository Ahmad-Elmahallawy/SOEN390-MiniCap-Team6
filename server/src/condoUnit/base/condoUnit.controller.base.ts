import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { CondoUnitService } from "../condoUnit.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { CondoUnitCreateInput } from "./CondoUnitCreateInput";
import { CondoUnit } from "./CondoUnit";
import { CondoUnitFindManyArgs } from "./CondoUnitFindManyArgs";
import { CondoUnitWhereUniqueInput } from "./CondoUnitWhereUniqueInput";
import { CondoUnitUpdateInput } from "./CondoUnitUpdateInput";
import { FileFindManyArgs } from "../../file/base/FileFindManyArgs";
import { File } from "../../file/base/File";
import { FileWhereUniqueInput } from "../../file/base/FileWhereUniqueInput";
import { ParkingSpotFindManyArgs } from "../../parkingSpot/base/ParkingSpotFindManyArgs";
import { ParkingSpot } from "../../parkingSpot/base/ParkingSpot";
import { ParkingSpotWhereUniqueInput } from "../../parkingSpot/base/ParkingSpotWhereUniqueInput";
import { UserCondoFindManyArgs } from "../../userCondo/base/UserCondoFindManyArgs";
import { UserCondo } from "../../userCondo/base/UserCondo";
import { UserCondoWhereUniqueInput } from "../../userCondo/base/UserCondoWhereUniqueInput";
import { RequestFindManyArgs } from "../../request/base/RequestFindManyArgs";
import { RequestWhereUniqueInput } from "../../request/base/RequestWhereUniqueInput";
import {RequestObject} from "../../request/base/Request";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class CondoUnitControllerBase {
  constructor(
    protected readonly service: CondoUnitService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: CondoUnit })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createCondoUnit(
    @common.Body() data: CondoUnitCreateInput
  ): Promise<CondoUnit> {
    return await this.service.createCondoUnit({
      data: {
        ...data,

        locker: data.locker
          ? {
              connect: data.locker,
            }
          : undefined,

        propertyID: data.propertyID
          ? {
              connect: data.propertyID,
            }
          : undefined,

        registrationKeys: data.registrationKeys
          ? {
              connect: data.registrationKeys,
            }
          : undefined,
      },
      select: {
        condoFee: true,
        createdAt: true,
        id: true,
        isPaid: true,

        locker: {
          select: {
            id: true,
          },
        },

        propertyID: {
          select: {
            id: true,
          },
        },

        registrationKeys: {
          select: {
            id: true,
          },
        },

        size: true,
        unitNumber: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [CondoUnit] })
  @ApiNestedQuery(CondoUnitFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async condoUnits(@common.Req() request: Request): Promise<CondoUnit[]> {
    const args = plainToClass(CondoUnitFindManyArgs, request.query);
    return this.service.condoUnits({
      ...args,
      select: {
        condoFee: true,
        createdAt: true,
        id: true,
        isPaid: true,

        locker: {
          select: {
            id: true,
          },
        },

        propertyID: {
          select: {
            id: true,
          },
        },

        registrationKeys: {
          select: {
            id: true,
          },
        },

        size: true,
        updatedAt: true,
        unitNumber: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: CondoUnit })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async condoUnit(
    @common.Param() params: CondoUnitWhereUniqueInput
  ): Promise<CondoUnit | null> {
    const result = await this.service.condoUnit({
      where: params,
      select: {
        condoFee: true,
        createdAt: true,
        id: true,
        isPaid: true,

        locker: {
          select: {
            id: true,
          },
        },

        propertyID: {
          select: {
            id: true,
          },
        },

        registrationKeys: {
          select: {
            id: true,
          },
        },

        size: true,
        unitNumber: true,
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
  @swagger.ApiOkResponse({ type: CondoUnit })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateCondoUnit(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() data: CondoUnitUpdateInput
  ): Promise<CondoUnit | null> {
    try {
      return await this.service.updateCondoUnit({
        where: params,
        data: {
          ...data,

          locker: data.locker
            ? {
                connect: data.locker,
              }
            : undefined,

          propertyID: data.propertyID
            ? {
                connect: data.propertyID,
              }
            : undefined,

          registrationKeys: data.registrationKeys
            ? {
                connect: data.registrationKeys,
              }
            : undefined,
        },
        select: {
          condoFee: true,
          createdAt: true,
          id: true,
          isPaid: true,

          locker: {
            select: {
              id: true,
            },
          },

          propertyID: {
            select: {
              id: true,
            },
          },

          registrationKeys: {
            select: {
              id: true,
            },
          },

          size: true,
          unitNumber: true,
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
  @swagger.ApiOkResponse({ type: CondoUnit })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteCondoUnit(
    @common.Param() params: CondoUnitWhereUniqueInput
  ): Promise<CondoUnit | null> {
    try {
      return await this.service.deleteCondoUnit({
        where: params,
        select: {
          condoFee: true,
          createdAt: true,
          id: true,
          isPaid: true,

          locker: {
            select: {
              id: true,
            },
          },

          propertyID: {
            select: {
              id: true,
            },
          },

          registrationKeys: {
            select: {
              id: true,
            },
          },

          size: true,
          unitNumber: true,
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
  @common.Get("/:id/file")
  @ApiNestedQuery(FileFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async findFile(
    @common.Req() request: Request,
    @common.Param() params: CondoUnitWhereUniqueInput
  ): Promise<File[]> {
    const query = plainToClass(FileFindManyArgs, request.query);
    const results = await this.service.findFile(params.id, {
      ...query,
      select: {
        bucket: true,

        company: {
          select: {
            id: true,
          },
        },

        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        name: true,

        property: {
          select: {
            id: true,
          },
        },

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

  @common.Post("/:id/file")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async connectFile(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      file: {
        connect: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/file")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async updateFile(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      file: {
        set: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/file")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async disconnectFile(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      file: {
        disconnect: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/parkingSpot")
  @ApiNestedQuery(ParkingSpotFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "any",
  })
  async findParkingSpot(
    @common.Req() request: Request,
    @common.Param() params: CondoUnitWhereUniqueInput
  ): Promise<ParkingSpot[]> {
    const query = plainToClass(ParkingSpotFindManyArgs, request.query);
    const results = await this.service.findParkingSpot(params.id, {
      ...query,
      select: {
        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,

        property: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/parkingSpot")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async connectParkingSpot(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: ParkingSpotWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      parkingSpot: {
        connect: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/parkingSpot")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async updateParkingSpot(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: ParkingSpotWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      parkingSpot: {
        set: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/parkingSpot")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async disconnectParkingSpot(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: ParkingSpotWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      parkingSpot: {
        disconnect: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/requests")
  @ApiNestedQuery(RequestFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  async findRequests(
      @common.Req() request: Request,
      @common.Param() params: CondoUnitWhereUniqueInput
  ): Promise<RequestObject[]> {
    const query = plainToClass(RequestFindManyArgs, request.query);
    const results = await this.service.findRequests(params.id, {
      ...query,
      select: {
        company: {
          select: {
            id: true,
          },
        },

        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        elevator: true,

        employee: {
          select: {
            id: true,
          },
        },

        id: true,
        key: true,

        property: {
          select: {
            id: true,
          },
        },

        question: true,
        reportMessage: true,
        requestType: true,
        response: true,
        status: true,
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

  @common.Post("/:id/requests")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async connectRequests(
      @common.Param() params: CondoUnitWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        connect: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/requests")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async updateRequests(
      @common.Param() params: CondoUnitWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        set: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/requests")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async disconnectRequests(
      @common.Param() params: CondoUnitWhereUniqueInput,
      @common.Body() body: RequestWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      requests: {
        disconnect: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/userCondos")
  @ApiNestedQuery(UserCondoFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "UserCondo",
    action: "read",
    possession: "any",
  })
  async findUserCondos(
    @common.Req() request: Request,
    @common.Param() params: CondoUnitWhereUniqueInput
  ): Promise<UserCondo[]> {
    const query = plainToClass(UserCondoFindManyArgs, request.query);
    const results = await this.service.findUserCondos(params.id, {
      ...query,
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
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/userCondos")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async connectUserCondos(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: UserCondoWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      userCondos: {
        connect: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/userCondos")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async updateUserCondos(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: UserCondoWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      userCondos: {
        set: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/userCondos")
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "update",
    possession: "any",
  })
  async disconnectUserCondos(
    @common.Param() params: CondoUnitWhereUniqueInput,
    @common.Body() body: UserCondoWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      userCondos: {
        disconnect: body,
      },
    };
    await this.service.updateCondoUnit({
      where: params,
      data,
      select: { id: true },
    });
  }
}
