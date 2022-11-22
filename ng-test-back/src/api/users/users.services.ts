import bcrypt from "bcrypt";
import db from "../../utils/db";

function findUserByEmail(username: any) {
  return db.user.findUnique({
    where: {
      username,
    },
  });
}

function createUserByEmailAndPassword(user: { password: any }) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id: any) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export { findUserByEmail, findUserById, createUserByEmailAndPassword };
