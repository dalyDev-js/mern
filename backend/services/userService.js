import User from "../model/userModel.js";

export const createUser = async (userData) => {
  const profilePic = `https://robohash.org/${userData.username}`;

  const newUser = await User.create({
    fullName: userData.fullName,
    username: userData.username,
    email: userData.email,
    gender: userData.gender,
    profilePic,
    role: userData.role,
    password: userData.password,
    passwordConfirm: userData.passwordConfirm,
  });

  return newUser;
};
