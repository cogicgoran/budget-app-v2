# budget-app-v2

NodeJS Express Server serving React App.

## Requirements:
1. NodeJS(used v14.17.6), npm (used v6.14.15)
2. MySQL Database Server

## Steps:
1. Execute the sql query files `setup.sql` and/or `example-data.sql` found in `/server/database/` folder
2. Change `/server/database/connection.js` file to match your own database credentials
3. Go into `/server/client` in your terminal and run `npm install && npm run build` to build React App 
4. Run `npm install` in projects root folder 
5. Run `npm run start` to create server which opens on port 8000



