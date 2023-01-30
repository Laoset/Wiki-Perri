const { Dog, conn, Temperament } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Dog.create({ name: "Pug" });
      });
    });
    describe("height", () => {
      it("should throw an error if height is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should work when its a valid height", () => {
        Dog.create({ height: ["20-25"] });
      });
      it("should throw an error if height is invalid type", (done) => {
        Dog.create({ height: 25 })
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
    });
    describe("weight", () => {
      it("should throw an error if weight is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid weight")))
          .catch(() => done());
      });
      it("should work when its a valid weight", () => {
        Dog.create({ weight: ["20-25"] });
      });
      it("should throw an error if weight is invalid type", (done) => {
        Dog.create({ weight: 25 })
          .then(() => done(new Error("It requires a valid weight")))
          .catch(() => done());
      });
    });
    describe("properties", () => {
      it("should throw an error if any of the required fields are incomplete", (done) => {
        Dog.create({ height: ["5-10"], weight: ["20,25"] })
          .then(() => done(new Error("It requires name, height and weight")))
          .catch(() => done());
      });
    });
  });
});
describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe("name", () => {
      it("should work only with string", () => {
        expect(typeof Temperament.name).equal("string");
      });
    });
  });
});
