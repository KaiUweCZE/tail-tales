import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();

  prisma.$use(async (params, next) => {
    if (params.model === "User" && params.action === "create") {
      const result = await next(params);

      try {
        const config = await prisma.defaultConfiguration.create({
          data: {
            userId: result.id,
          },
        });

        const updatedUser = await prisma.user.update({
          where: { id: result.id },
          data: {
            configurationId: config.id,
          },
          include: { configuration: true },
        });

        console.log("Created config:", config);
        console.log("Updated user:", updatedUser);
        return updatedUser;
      } catch (error) {
        console.error("Error creating config: ", error);
      }
    }

    return next(params);
  });

  return prisma;
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;

//@ts-nocheck
/*import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}



if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
*/
