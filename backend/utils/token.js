import jwt from "jsonwebtoken";
import { promisify } from "util";

export const generateToken = (id, fullName, role) => {
  return jwt.sign({ id, fullName, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const setTokenInCookie = (token, res) => {
  const expiryDateInMS = process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000;
  res.cookie("jwt", token, {
    maxAge: expiryDateInMS, // Fixed maxAge should be expiry in milliseconds
    httpOnly: true, // prevent XSS
    sameSite: "strict", // prevent CSRF
    secure: process.env.NODE_ENV === "production",
  });
};

export const verifyToken = async (token, secret) => {
  //  "jwt.verify" => this will retun callBack Function , so i promisify it because i like to work with promise
  const verifyToken = promisify(jwt.verify);
  return await verifyToken(token, secret);
};
