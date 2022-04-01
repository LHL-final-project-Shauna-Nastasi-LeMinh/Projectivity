# Projectivity - a Bug Tracker, and a general task management tool using Kanban board

## Tech stack

ReactJS with MUI for front-end. NodeJS, Express server, Sequelize ORM, PostgreSQL for back-end. Pusher dedicated WebSocket server for real-time notification

## Back-end server setup

1. Install dependencies: in the "back-end-with-Sequelize" folder, run: `npm i`
2. Install dev dependencies: `npm i nodemon --save-dev`
3. Config your database connection params in "back-end-with-Sequelize/config/config.json"
4. Install sequelize-cli globally: `npm install -g sequelize-cli`
5. If your database in config.json has not been created yet, create one with this: `sequelize db:create`
6. Create tables: `sequelize db:migrate`

- Check the db folder to see what gets created and seeded in the SDB

7. Seed the data: `sequelize db:seed:all`
8. Run the server: `npm run local` or `npm start`
9. Run React front-end or Insomnia app to test this back-end

## Front-end setup

1. To install all required packages, in the "front-end" folder, run: `npm i`

2. To start front-end server, in the "front-end" folder, run: `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Screenshot

#### Create / Edit / Delete a project

![Create / Edit / Delete a project](https://github.com/LHL-final-project-Shauna-Nastasi-LeMinh/final-project/blob/master/doc/projects_management.gif?raw=true)

#### Kanban columns management with drag and drop

![Kanban columns management with drag and drop](https://github.com/LHL-final-project-Shauna-Nastasi-LeMinh/final-project/blob/master/doc/columns_management.gif?raw=true)

#### Tickets management

![Tickets management](https://github.com/LHL-final-project-Shauna-Nastasi-LeMinh/final-project/blob/master/doc/tickets_management.gif?raw=true)

#### Tickets' status transfer with drag and drop

![Tickets' status transfer with drag and drop](https://github.com/LHL-final-project-Shauna-Nastasi-LeMinh/final-project/blob/master/doc/transfer_ticket.gif?raw=true)

#### Tickets bulk removal with drag and drop

![Tickets bulk removal with drag and drop](https://github.com/LHL-final-project-Shauna-Nastasi-LeMinh/final-project/blob/master/doc/recycle_bin.gif?raw=true)

#### Real-time notifications with Pusher dedicated WebSocket server

![Real-time notifications with Pusher dedicated WebSocket server](https://github.com/LHL-final-project-Shauna-Nastasi-LeMinh/final-project/blob/master/doc/notifications.gif?raw=true)
