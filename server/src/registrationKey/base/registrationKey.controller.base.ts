import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { RegistrationKeyService } from "../registrationKey.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { RegistrationKeyCreateInput } from "./RegistrationKeyCreateInput";
import { RegistrationKey } from "./RegistrationKey";
import { RegistrationKeyFindManyArgs } from "./RegistrationKeyFindManyArgs";
import { RegistrationKeyWhereUniqueInput } from "./RegistrationKeyWhereUniqueInput";
import { RegistrationKeyUpdateInput } from "./RegistrationKeyUpdateInput";
import {Public} from "../../decorators/public.decorator";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class RegistrationKeyControllerBase {
  constructor(
    protected readonly service: RegistrationKeyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: RegistrationKey })
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createRegistrationKey(
    @common.Body() data: RegistrationKeyCreateInput
  ): Promise<RegistrationKey> {
    return await this.service.createRegistrationKey({
      data: {
        ...data,

        condoUnit: {
          connect: data.condoUnit,
        },
      },
      select: {
        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        value: true,
        role: true,
        updatedAt: true,
      },
    });
  }

  @Public()
  @common.Get()
  @swagger.ApiOkResponse({ type: [RegistrationKey] })
  @ApiNestedQuery(RegistrationKeyFindManyArgs)
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async registrationKeys(
    @common.Req() request: Request
  ): Promise<RegistrationKey[]> {
    const args = plainToClass(RegistrationKeyFindManyArgs, request.query);
    return this.service.registrationKeys({
      ...args,
      select: {
        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        role: true,
        value: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: RegistrationKey })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async registrationKey(
    @common.Param() params: RegistrationKeyWhereUniqueInput
  ): Promise<RegistrationKey | null> {
    const result = await this.service.registrationKey({
      where: params,
      select: {
        condoUnit: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        role: true,
        value: true,
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
  @swagger.ApiOkResponse({ type: RegistrationKey })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateRegistrationKey(
    @common.Param() params: RegistrationKeyWhereUniqueInput,
    @common.Body() data: RegistrationKeyUpdateInput
  ): Promise<RegistrationKey | null> {
    try {
      return await this.service.updateRegistrationKey({
        where: params,
        data: {
          ...data,

          condoUnit: {
            connect: data.condoUnit,
          },
        },
        select: {
          condoUnit: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          role: true,
          value: true,
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
  @swagger.ApiOkResponse({ type: RegistrationKey })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "RegistrationKey",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteRegistrationKey(
    @common.Param() params: RegistrationKeyWhereUniqueInput
  ): Promise<RegistrationKey | null> {
    try {
      return await this.service.deleteRegistrationKey({
        where: params,
        select: {
          condoUnit: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          role: true,
          value: true,
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
