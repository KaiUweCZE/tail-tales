import { DefaultConfiguration, HtmlElements, htmlElements } from "../types";

export const convertDbConfig = (dbConfig: any): DefaultConfiguration => {
  const { id, userId, createdAt, updatedAt, elementStyles } = dbConfig;

  const clientConfig: DefaultConfiguration = {
    id,
    userId,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };

  if (elementStyles) {
    Object.entries(elementStyles).forEach(([key, value]) => {
      const htmlKey = key as HtmlElements;
      if (htmlElements.includes(key as HtmlElements)) {
        (clientConfig as any)[key] = value;
      }
    });
  }

  return clientConfig;
};
