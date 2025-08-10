import jwt from "jsonwebtoken";
export function createToken({ id }: { id: string }) {
  const token = jwt.sign(id, process.env.JWT_SECRET_KEY as string);
  return token;
}
