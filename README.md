# budget-app-v2

NodeJS Express Server serving React App.

## Requirements:
1. NodeJS(used v14.17.6), npm (used v6.14.15)
2. MySQL Database Server
3. Firebase Authentication

## Steps:
1. Execute the sql query files `setup.sql` and/or `example-data.sql` found in `/server/database/` folder.
2. Change `/server/database/connection.js` file to match your own database credentials.
3. Add environment variables for `/server/client/src/config/firebase-config.js` file. [More details below](#firebase-setup).
4. Go into `/server/client` in your terminal and run `npm install && npm run build` to build React App.
5. Run `npm install` in projects root folder.
6. Run `npm run start` to create server which opens on port 8000.


### Firebase Setup:
1. Create a firebase account if you don't have one at `https://firebase.google.com/`.
2. Add new project
3. Register a web app for that project. You will be given configuration object with configuration properties.
  Create `/server/client/.env.local` hidden file  where you will set these environment variables with received configuration properties.

        REACT_APP_FIREBASE_API_KEY=`YourConfigApiKey`
        REACT_APP_FIREBASE_AUTH_DOMAIN=`YourConfigAuthDomain`
        REACT_APP_FIREBASE_PROJECT_ID=`YourConfigProjectId`
        REACT_APP_FIREBASE_STORAGE_BUCKET=`YourConfigStorageBucket`
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=`YourConfigMessagingSenderId`
        REACT_APP_FIREBASE_APP_ID=`YourConfigAppId`

4. In your project you need to add following Authentication Sign-in methods:
  `Email/Password`
  `Google`
  `Facebook`

5. In Authentication Sign-in method advanced section you should check option
`Allow creation of multiple accounts with the same email address`



