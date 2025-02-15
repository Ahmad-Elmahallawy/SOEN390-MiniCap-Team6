import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Locker, // @ts-ignore
  CondoUnit, // @ts-ignore
  Property,
} from "@prisma/client";

export class LockerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.LockerCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.LockerCountArgs>
  ): Promise<number> {
    return this.prisma.locker.count(args);
  }

  async lockers<T extends Prisma.LockerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.LockerFindManyArgs>
  ): Promise<Locker[]> {
    return this.prisma.locker.findMany(args);
  }
  async locker<T extends Prisma.LockerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.LockerFindUniqueArgs>
  ): Promise<Locker | null> {
    return this.prisma.locker.findUnique(args);
  }
  async createLocker<T extends Prisma.LockerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LockerCreateArgs>
  ): Promise<Locker> {
    return this.prisma.locker.create<T>(args);
  }
  async updateLocker<T extends Prisma.LockerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LockerUpdateArgs>
  ): Promise<Locker> {
    return this.prisma.locker.update<T>(args);
  }
  async deleteLocker<T extends Prisma.LockerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.LockerDeleteArgs>
  ): Promise<Locker> {
    return this.prisma.locker.delete(args);
  }

  async getCondoUnits(parentId: number): Promise<CondoUnit | null> {
    return this.prisma.locker
      .findUnique({
        where: { id: parentId },
      })
      .condoUnits();
  }

  async getProperty(parentId: number): Promise<Property | null> {
    return this.prisma.locker
      .findUnique({
        where: { id: parentId },
      })
      .property();
  }
}
