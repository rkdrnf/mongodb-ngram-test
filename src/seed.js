require("dotenv").config();

const fs = require("fs");
const { MongoClient } = require("mongodb");
const grammit = require("./grammit");

const seedPath = "./data/seed.json";
// const seedPath = "./data/name-seed.json";

/** @param {MongoClient} dbClient */
async function seed(dbClient) {
  const buffer = await new Promise((res, rej) => {
    fs.readFile(seedPath, async (err, buffer) => {
      if (err) {
        rej(err);
        return;
      }
      res(buffer);
    });
  });

  /** @type {{text: string}[]} */
  const items = JSON.parse(buffer.toString("utf-8"));

  const col = dbClient.db("ngram").collection("sentences");
  try {
    await col.drop();
    console.log("collection dropped");
  } catch {
    console.log("collection does not exists");
  }

  await Promise.all(
    items.map((item) =>
      col.insertOne(
        {
          text: item.text,
          ngrams: grammit(item.text, true),
        },
        {}
      )
    )
  );
}

async function run() {
  const mongoClient = new MongoClient(process.env.CONNECTION_STRING);
  try {
    // Connect the client to the server
    await mongoClient.connect();

    // Establish and verify connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    await seed(mongoClient);
    console.log("seeding done");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
  }
}

run().catch(console.error);
