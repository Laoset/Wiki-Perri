require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { DB_PORT } = process.env;
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(DB_PORT, () => {
    console.log("%s listening at", process.env.DB_PORT); // eslint-disable-line no-console
  });
});
