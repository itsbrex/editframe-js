import { compile } from "path-to-regexp";

const compilePath = (path: string): ((params: any, options: any) => string) =>
  compile(path);

// This function is copied from react-router-dom
export const generatePath = (path = "/", params = {}): string =>
  path === "/" ? path : compilePath(path)(params, { pretty: true });
