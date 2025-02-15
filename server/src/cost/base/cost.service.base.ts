import { PrismaService } from "../../prisma/prisma.service";

// @ts-ignore
import {
  Prisma, // @ts-ignore
  Cost, // @ts-ignore
  Company,
} from "@prisma/client";

export class CostServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CostCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.CostCountArgs>
  ): Promise<number> {
    return this.prisma.cost.count(args);
  }

  async costs<T extends Prisma.CostFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CostFindManyArgs>
  ): Promise<Cost[]> {
    return this.prisma.cost.findMany(args);
  }
  async cost<T extends Prisma.CostFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CostFindUniqueArgs>
  ): Promise<Cost | null> {
    return this.prisma.cost.findUnique(args);
  }
  async createCost<T extends Prisma.CostCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CostCreateArgs>
  ): Promise<Cost> {
    return this.prisma.cost.create<T>(args);
  }
  async updateCost<T extends Prisma.CostUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CostUpdateArgs>
  ): Promise<Cost> {
    return this.prisma.cost.update<T>(args);
  }
  async deleteCost<T extends Prisma.CostDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CostDeleteArgs>
  ): Promise<Cost> {
    return this.prisma.cost.delete(args);
  }

  async getCompany(parentId: number): Promise<Company | null> {
    return this.prisma.cost
      .findUnique({
        where: { id: parentId },
      })
      .company();
  }
}
