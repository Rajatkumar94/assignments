import { sign, verify, decode } from "jwtwebtoken";
const jwtPassword = "secret";
import { string } from "zod";

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

const usernameSchema = string().email();
const passwordSchema = string().atleast(6);
function signJwt(username, password) {
  // Your code here
  const userZod = usernameSchema.safeParse(username);
  const passwordZod = passwordSchema.safeParse(password);

  if (userZod.success === true && passwordZod.success === true) {
    return sign({ username: username }, jwtPassword);
  } else {
    return null;
  }
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
  // Your code here
  try {
    verify(token, jwtPassword);
    return true;
  } catch (e) {}

  return false;
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
  // Your code here

  return decode(token);
}

export default {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
