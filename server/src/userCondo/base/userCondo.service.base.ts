import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  UserCondo, // @ts-ignore
  CondoUnit, // @ts-ignore
  User,
} from "@prisma/client";

export class UserCondoServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.UserCondoCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCondoCountArgs>
  ): Promise<number> {
    return this.prisma.userCondo.count(args);
  }

  async userCondos<T extends Prisma.UserCondoFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCondoFindManyArgs>
  ): Promise<UserCondo[]> {
    return this.prisma.userCondo.findMany(args);
  }
  async userCondo<T extends Prisma.UserCondoFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCondoFindUniqueArgs>
  ): Promise<UserCondo | null> {
    return this.prisma.userCondo.findUnique(args);
  }
  async createUserCondo<T extends Prisma.UserCondoCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCondoCreateArgs>
  ): Promise<UserCondo> {
    return this.prisma.userCondo.create<T>(args);
  }
  async updateUserCondo<T extends Prisma.UserCondoUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCondoUpdateArgs>
  ): Promise<UserCondo> {
    return this.prisma.userCondo.update<T>(args);
  }
  async deleteUserCondo<T extends Prisma.UserCondoDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCondoDeleteArgs>
  ): Promise<UserCondo> {
    return this.prisma.userCondo.delete(args);
  }

  async getCondo(parentId: number): Promise<CondoUnit | null> {
    return this.prisma.userCondo
      .findUnique({
        where: { id: parentId },
      })
      .condo();
  }

  async getUser(parentId: number): Promise<User | null> {
    return this.prisma.userCondo
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
