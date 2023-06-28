const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const acessToken = req.headers.authorization.replace("Bearer ", "");
    const jwt_payload = jsonwebtoken.verify(acessToken, process.env.jwt_salt);

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
module.exports = auth;
