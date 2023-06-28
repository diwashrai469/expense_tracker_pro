const jsonwebtoken = require("jsonwebtoken");

//works like a global function to create a jwt acess token and the information to be shown jwt token is decoded
const jwtManager = (user) => {
  const acessToken = jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.full_name,
      balance: user.balance,
    },
    process.env.jwt_salt
  );
  return acessToken;
};
module.exports = jwtManager;
