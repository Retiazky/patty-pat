import consola from "consola";

export const useLogger = (prefix?: string) => {
  const logger = consola.create({ defaults: { tag: prefix } });
  return { logger };
};
