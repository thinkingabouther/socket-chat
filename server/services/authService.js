const userRepository = require("../dbal/userRepository");
const { OAuth2Client } = require("google-auth-library");
const config = require("../config.js");
const client = new OAuth2Client(config.oauth.clientId);
const oauthConfig = config.oauth;

exports.login = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: oauthConfig.clientId,
  });
  const { name, email, picture } = ticket.getPayload();
  const existingUser = await userRepository.findByEmail(email);
  const returningUser = existingUser
    ? existingUser
    : await userRepository.save({ name, email, picture });
  console.log(returningUser);
  return returningUser;
};
