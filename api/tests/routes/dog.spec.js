/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
//El perro creado de ejemplo
const dog = {
  name: "Pug",
  weight: ["3-5"],
  height: ["20-35"],
  life_span: "25",
  image: "urlejmeplo.com",
  temperaments: "Wild",
};
const dogFail = {
  name: "Pug",
  weight: 25,
  height: 36,
  life_span: "25",
  image: "urlejmeplo.com",
  temperaments: "Wild",
};

describe("Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });
  describe("POST /dogs", () => {
    it("should get 200 when its created", () =>
      agent.post("/dogs").send(dog).expect(200));
    it("should get 400 when the data provided is incorrect or missing", () =>
      agent.post("/dogs").send(dogFail).expect(400));
  });
  //Temperamento
  describe("GET /temperaments", () => {
    it("should get 200", () => agent.get("/temperaments").expect(200));
  });
});
