import { Request, Response, NextFunction } from "express";
import { fireAuth } from "../../fireBase";

// Decodes jwt tokens sent by web-client & set's the logged-in user on the request obj
export async function decodeJwt(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    try {
      const decodedToken = await fireAuth.verifyIdToken(
        // extract the id-token from headers
        req.headers.authorization.split("Bearer ")[1]
      );

      // set user on the request
      req["currentUser"] = decodedToken;
    } catch (err) {
      throw new Error(err);
    }
  }

  next();
}

// Throw error if logged-in fireBase user does not exist
export function getAuthUser(req: Request) {
  const user = req["currentUser"];

  if (!user) {
    throw new Error("User not authorized, must be logged-in for this action");
  }

  return user;
}
