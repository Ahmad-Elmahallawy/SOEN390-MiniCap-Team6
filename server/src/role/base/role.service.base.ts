import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Role } from "@prisma/client";

export class RoleServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.RoleCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleCountArgs>
  ): Promise<number> {
    return this.prisma.role.count(args);
  }

  async roles<T extends Prisma.RoleFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleFindManyArgs>
  ): Promise<Role[]> {
    return this.prisma.role.findMany(args);
  }
  async role<T extends Prisma.RoleFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleFindUniqueArgs>
  ): Promise<Role | null> {
    return this.prisma.role.findUnique(args);
  }
  async createRole<T extends Prisma.RoleCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleCreateArgs>
  ): Promise<Role> {
    return this.prisma.role.create<T>(args);
  }
  async updateRole<T extends Prisma.RoleUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleUpdateArgs>
  ): Promise<Role> {
    return this.prisma.role.update<T>(args);
  }
  async deleteRole<T extends Prisma.RoleDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.RoleDeleteArgs>
  ): Promise<Role> {
    return this.prisma.role.delete(args);
  }
}
