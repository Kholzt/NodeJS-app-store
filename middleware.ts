import dotenv from "dotenv";
dotenv.config();
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

// const middleware = ClerkExpressRequireAuth();
const middleware = (err: any, req: any, res: any, next: any) => {
  next();
};
export { middleware };
