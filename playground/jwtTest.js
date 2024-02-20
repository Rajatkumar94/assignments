const jwt = require("jsonwebtoken");
const jwtPassword = "secret";

function createJwtToken(username) {
  const token = jwt.sign({ username: username }, jwtPassword);

  console.log(token);
}

function decodeJwtToken(token) {
  console.log(jwt.decode(token));
}

function verifiedJwt(token) {
  const jwtVerifiedToken = jwt.verify(token, jwtPassword);
  console.log(jwtVerifiedToken);
}

createJwtToken("Rajat");
decodeJwtToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhamF0IiwiaWF0IjoxNzA3Mzk3NTc1fQ.UhHkh0ZR_95QawA11qPH0tdaODe2VozLnhG5aJnXJSQ"
);
verifiedJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhamF0IiwiaWF0IjoxNzA3Mzk3NTc1fQ.UhHkh0ZR_95QawA11qPH0tdaODe2VozLnhG5aJnXJii")


