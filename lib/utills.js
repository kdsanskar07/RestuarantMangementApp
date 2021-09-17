const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const Config = require('../config/config');

const PRIV_KEY = Config.development.private_key;

function issueJWT(id) {
  const expiresIn = '10d';

  const payload = {
    sub: id,
    at: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }

}


module.exports.issueJWT = issueJWT;