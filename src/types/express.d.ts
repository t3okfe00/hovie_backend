import { User } from "./path-to-your-user-model"; // Import your User type/model

declare global {
  namespace Express {
    interface Request {
      user?: User; // or adjust the type according to your payload
    }
  }
}
