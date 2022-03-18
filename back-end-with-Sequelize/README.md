## Getting Started

1. Install dependencies: `npm i`
2. Install dev dependencies: `npm i nodemon --save-dev`
3. Install sequelize-cli globally: `npm install -g sequelize-cli`
4. If `finalproject` database has not been created yet, create one with this: `sequelize db:create`
5. Create table: `sequelize db:migrate`
  - Check the db folder to see what gets created and seeded in the SDB
6. Seed the data: `sequelize db:seed:all`
7. Run the server: `npm run local`
8. Run React front-end or Insomnia app to test this back-end

## Note: 
1. To reset database, run 
  `sequelize db:drop`
  `sequelize db:create`
  `sequelize db:migrate`
  `sequelize db:seed:all`

2. To generate new model .js file (no space between column name):
sequelize model:generate --name tablename --attributes column1:string,column2:string

3. To generate new seeds .js file (e.g. add-user.js file as follow): 
sequelize seed:generate --name add-users




