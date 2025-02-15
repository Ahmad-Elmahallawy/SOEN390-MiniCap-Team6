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
import { Reservation } from "./Reservation";
import { ReservationCountArgs } from "./ReservationCountArgs";
import { ReservationFindManyArgs } from "./ReservationFindManyArgs";
import { ReservationFindUniqueArgs } from "./ReservationFindUniqueArgs";
import { CreateReservationArgs } from "./CreateReservationArgs";
import { UpdateReservationArgs } from "./UpdateReservationArgs";
import { DeleteReservationArgs } from "./DeleteReservationArgs";
import { CommonFacility } from "../../commonFacility/base/CommonFacility";
import { User } from "../../user/base/User";
import { ReservationService } from "../reservation.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Reservation)
export class ReservationResolverBase {
  constructor(
    protected readonly service: ReservationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "read",
    possession: "any",
  })
  async _reservationsMeta(
    @graphql.Args() args: ReservationCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Reservation])
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "read",
    possession: "any",
  })
  async reservations(
    @graphql.Args() args: ReservationFindManyArgs
  ): Promise<Reservation[]> {
    return this.service.reservations(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Reservation, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "read",
    possession: "own",
  })
  async reservation(
    @graphql.Args() args: ReservationFindUniqueArgs
  ): Promise<Reservation | null> {
    const result = await this.service.reservation(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Reservation)
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "create",
    possession: "any",
  })
  async createReservation(
    @graphql.Args() args: CreateReservationArgs
  ): Promise<Reservation> {
    return await this.service.createReservation({
      ...args,
      data: {
        ...args.data,

        commonFacility: args.data.commonFacility
          ? {
              connect: args.data.commonFacility,
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
  @graphql.Mutation(() => Reservation)
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "update",
    possession: "any",
  })
  async updateReservation(
    @graphql.Args() args: UpdateReservationArgs
  ): Promise<Reservation | null> {
    try {
      return await this.service.updateReservation({
        ...args,
        data: {
          ...args.data,

          commonFacility: args.data.commonFacility
            ? {
                connect: args.data.commonFacility,
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

  @graphql.Mutation(() => Reservation)
  @nestAccessControl.UseRoles({
    resource: "Reservation",
    action: "delete",
    possession: "any",
  })
  async deleteReservation(
    @graphql.Args() args: DeleteReservationArgs
  ): Promise<Reservation | null> {
    try {
      return await this.service.deleteReservation(args);
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
  @graphql.ResolveField(() => CommonFacility, {
    nullable: true,
    name: "commonFacility",
  })
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "read",
    possession: "any",
  })
  async getCommonFacility(
    @graphql.Parent() parent: Reservation
  ): Promise<CommonFacility | null> {
    const result = await this.service.getCommonFacility(parent.id);

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
  async getUser(@graphql.Parent() parent: Reservation): Promise<User | null> {
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
