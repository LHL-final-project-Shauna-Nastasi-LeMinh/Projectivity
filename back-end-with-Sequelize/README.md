## Getting Started

1. Install dependencies: `npm i`
2. Install dev dependencies: `npm i nodemon --save-dev`
3. If `finalproject` database has not been created yet, create one with this: `sequelize db:create`
4. Create table : `sequelize db:migrate`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
6. Run React front-end or Insomnia app to test this back-end

## Note: 
1. To reset database, run 
  `sequelize db:drop`
  `sequelize db:create`
  `sequelize db:migrate`

2. To generate new model:
sequelize model:generate --name User --attributes firstname:string,lastname:string




