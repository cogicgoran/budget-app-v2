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

module.exports = {auth, registerUser};