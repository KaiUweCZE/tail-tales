import { Prisma } from "@prisma/client";
import { DefaultConfiguration, htmlElements, HtmlKeys } from "../types";

interface PrismaDefaultConfiguration {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  elementStyles?: Prisma.JsonValue | null;
}

export const convertDbConfig = (
  dbConfig: PrismaDefaultConfiguration
): DefaultConfiguration => {
  const { id, userId, createdAt, updatedAt, name, elementStyles } = dbConfig;

  const clientConfig: DefaultConfiguration = {
    name,
    id,
    userId,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };

  if (elementStyles) {
    Object.entries(elementStyles).forEach(([key, value]) => {
      if (htmlElements.includes(key as HtmlKeys)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (clientConfig as any)[key] = value;
      }
    });
  }

  return clientConfig;
};
