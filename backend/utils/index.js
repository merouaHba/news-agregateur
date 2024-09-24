const apiFeatures = require('./apiFeatures');
const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const logger = require('./logger')
const sheduledFunction = require('./cronsheduledFunction')
const xmlParser = require('./XMLParser');


module.exports = {
  apiFeatures,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  logger,
  sheduledFunction,
  xmlParser
};