import db from "../../utils/db";
import hashToken from "../../utils/hashToken";

function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: any) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

export { addRefreshTokenToWhitelist };
