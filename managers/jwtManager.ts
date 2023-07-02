import jsonwebtoken from "jsonwebtoken";

// Works like a global function to create a JWT access token and the information to be shown when the JWT token is decoded
const jwtManager = (user: any) => {
  const secretKey = process.env.jwt_salt;

  if (!secretKey) {
    throw new Error('No JWT salt provided!');
  }

  const accessToken = jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.full_name,
      balance: user.balance,
    },
    secretKey
  );

  return accessToken;
};

export default jwtManager;
