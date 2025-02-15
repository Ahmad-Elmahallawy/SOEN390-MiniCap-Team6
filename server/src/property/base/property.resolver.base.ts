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
import { Property } from "./Property";
import { PropertyCountArgs } from "./PropertyCountArgs";
import { PropertyFindManyArgs } from "./PropertyFindManyArgs";
import { PropertyFindUniqueArgs } from "./PropertyFindUniqueArgs";
import { CreatePropertyArgs } from "./CreatePropertyArgs";
import { UpdatePropertyArgs } from "./UpdatePropertyArgs";
import { DeletePropertyArgs } from "./DeletePropertyArgs";
import { CondoUnitFindManyArgs } from "../../condoUnit/base/CondoUnitFindManyArgs";
import { CondoUnit } from "../../condoUnit/base/CondoUnit";
import { FileFindManyArgs } from "../../file/base/FileFindManyArgs";
import { File } from "../../file/base/File";
import { LockerFindManyArgs } from "../../locker/base/LockerFindManyArgs";
import { Locker } from "../../locker/base/Locker";
import { ParkingSpotFindManyArgs } from "../../parkingSpot/base/ParkingSpotFindManyArgs";
import { ParkingSpot } from "../../parkingSpot/base/ParkingSpot";
import { Company } from "../../company/base/Company";
import { PropertyService } from "../property.service";
import { RequestFindManyArgs } from "../../request/base/RequestFindManyArgs";
import { RequestObject } from "../../request/base/Request";
import { CommonFacilityFindManyArgs } from "../../commonFacility/base/CommonFacilityFindManyArgs";
import { CommonFacility } from "../../commonFacility/base/CommonFacility";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Property)
export class PropertyResolverBase {
  constructor(
    protected readonly service: PropertyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "any",
  })
  async _propertiesMeta(
    @graphql.Args() args: PropertyCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Property])
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "any",
  })
  async properties(
    @graphql.Args() args: PropertyFindManyArgs
  ): Promise<Property[]> {
    return this.service.properties(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [CommonFacility], { name: "commonFacilities" })
  @nestAccessControl.UseRoles({
    resource: "CommonFacility",
    action: "read",
    possession: "any",
  })
  async findCommonFacilities(
      @graphql.Parent() parent: Property,
      @graphql.Args() args: CommonFacilityFindManyArgs
  ): Promise<CommonFacility[]> {
    const results = await this.service.findCommonFacilities(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
  
  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Property, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "read",
    possession: "own",
  })
  async property(
    @graphql.Args() args: PropertyFindUniqueArgs
  ): Promise<Property | null> {
    const result = await this.service.property(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Property)
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "create",
    possession: "any",
  })
  async createProperty(
    @graphql.Args() args: CreatePropertyArgs
  ): Promise<Property> {
    return await this.service.createProperty({
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
  @graphql.Mutation(() => Property)
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "update",
    possession: "any",
  })
  async updateProperty(
    @graphql.Args() args: UpdatePropertyArgs
  ): Promise<Property | null> {
    try {
      return await this.service.updateProperty({
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

  @graphql.Mutation(() => Property)
  @nestAccessControl.UseRoles({
    resource: "Property",
    action: "delete",
    possession: "any",
  })
  async deleteProperty(
    @graphql.Args() args: DeletePropertyArgs
  ): Promise<Property | null> {
    try {
      return await this.service.deleteProperty(args);
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
  @graphql.ResolveField(() => [CondoUnit], { name: "condoUnits" })
  @nestAccessControl.UseRoles({
    resource: "CondoUnit",
    action: "read",
    possession: "any",
  })
  async findCondoUnits(
    @graphql.Parent() parent: Property,
    @graphql.Args() args: CondoUnitFindManyArgs
  ): Promise<CondoUnit[]> {
    const results = await this.service.findCondoUnits(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [File], { name: "files" })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async findFiles(
    @graphql.Parent() parent: Property,
    @graphql.Args() args: FileFindManyArgs
  ): Promise<File[]> {
    const results = await this.service.findFiles(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Locker], { name: "lockers" })
  @nestAccessControl.UseRoles({
    resource: "Locker",
    action: "read",
    possession: "any",
  })
  async findLockers(
    @graphql.Parent() parent: Property,
    @graphql.Args() args: LockerFindManyArgs
  ): Promise<Locker[]> {
    const results = await this.service.findLockers(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [ParkingSpot], { name: "parkingSpots" })
  @nestAccessControl.UseRoles({
    resource: "ParkingSpot",
    action: "read",
    possession: "any",
  })
  async findParkingSpots(
    @graphql.Parent() parent: Property,
    @graphql.Args() args: ParkingSpotFindManyArgs
  ): Promise<ParkingSpot[]> {
    const results = await this.service.findParkingSpots(parent.id, args);

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
  async getCompany(
    @graphql.Parent() parent: Property
  ): Promise<Company | null> {
    const result = await this.service.getCompany(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Request], { name: "requests" })
  @nestAccessControl.UseRoles({
    resource: "Request",
    action: "read",
    possession: "any",
  })
  async findRequests(
      @graphql.Parent() parent: Property,
      @graphql.Args() args: RequestFindManyArgs
  ): Promise<RequestObject[]> {
    const results = await this.service.findRequests(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
}
