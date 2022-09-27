HuntDB

*** This is a WIP ***

HuntDB is a database for the Hunt Showdown online multiplayer FPS game by Crytek GmbH. This database is in no way affiliated with Hunt or Crytek and is a simple labor of love to provide access to data points and game assets to be used by the wider community. 

To get started: 

Must have MongoDB installed on your local machine to initialize the database. Some working knowledge of Prisma will help facilitate that.

1) Download the database to your local machine. 
2) Run `npm i` to initialize the package dependencies.
3) Replace the `process.env` variables with your own (landing page isn't necessary to have the server process and send data).
4) Run `npm run seed` to seed MongoDB (may need to ctrl + c to stop the process).
5) Run `npm run start` to have the server live and ready for requests (default port is 8080)