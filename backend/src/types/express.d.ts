import type { Config } from "../config/index";

declare global {
  namespace Express {
    interface Request {
      /** Request-scoped config (if needed) */
      config?: Config;
    }
  }
}

export {};
