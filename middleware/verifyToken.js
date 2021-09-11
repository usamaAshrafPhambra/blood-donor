const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "682785319429-1de8p9vjsishbb58q9qudk634jbd6q3m.apps.googleusercontent.com"
);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "682785319429-1de8p9vjsishbb58q9qudk634jbd6q3m.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
  });

  const payload = ticket.getPayload();

  return payload;
};

module.exports = verifyGoogleToken;
