require("dotenv").config();

const fs = require("fs");
const { MongoClient } = require("mongodb");
const grammit = require("./grammit");

const seedPath = "./data/seed.json";

const nLowerbound = Number(process.env.NGRAM_LOWERBOUND);
const nUpperbound = Number(process.env.NGRAM_UPPERBOUND);

/** @type {item: string} */
function generateRecord(item) {
  const record = {
    text: item.text,
  };

  for (let n = nLowerbound; n <= nUpperbound; n++) {
    record[`ngrams${n}`] = grammit(item.text, true, n);
  }

  return record;
}

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
  const index = await col.createIndex({ ngrams1: 1 });
  console.log("index created", index);

  await Promise.all(items.map((item) => col.insertOne(generateRecord(item))));
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
