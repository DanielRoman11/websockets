export const createJWT = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
}