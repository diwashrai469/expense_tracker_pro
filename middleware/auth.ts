import jsonwebtoken from "jsonwebtoken";

const auth = (req: any, res: any, next: any) => {
  const secretKey = process.env.jwt_salt;

  if (!secretKey) {
    throw new Error("No JWT salt provided!");
  }

  try {
    const acessToken = req.headers.authorization.replace("Bearer ", "");
    const jwt_payload = jsonwebtoken.verify(acessToken, secretKey);

    req.user = jwt_payload; // this is done so that every page can acess thsi req.for example user A and user B have seperate dashboard data which can be determined by this req.user
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
    return;
  }
  next();
};
export default auth;
