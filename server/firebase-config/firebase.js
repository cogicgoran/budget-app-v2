const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require("firebase-admin/auth");

var serviceAccount = require("./serviceAccountKey.json");

const app = initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth(app);

async function registerUser(data){
  const result = await auth.createUser({
    email:data.email,
    password:data.password
  });
  console.log(JSON.stringify(result, null, 2));
  return result;
}

async function getUser(token) {
  try {
    const result = await auth.verifyIdToken(token);
    return result;
  } catch (error) {
    // throw invalid token error
  }
}

module.exports = {auth, registerUser, getUser};