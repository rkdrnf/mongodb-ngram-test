require('dotenv').config()
const grammit = require("./grammit");
const { MongoClient } = require("mongodb");
const process = require('process');

/** @param {MongoClient} dbClient */
async function fetch(dbClient) {
  const searchgram = grammit(
    "This is a base sentence for TM matching algorithm test.",
    true
  );

  const col = dbClient.db("ngram").collection("sentences");

  const results = await col
    .aggregate()
    .match({
      ngrams: { $in: searchgram },
    })
    .project({
      size: {
        $size: "$ngrams",
      },
      source: "$text",
      found: {
        $size: {
          $filter: {
            input: "$ngrams",
            cond: {
              $in: ["$$this", searchgram],
            },
          },
        },
      },
      score: {
        $divide: [
          {
            $size: {
              $filter: {
                input: "$ngrams",
                cond: {
                  $in: ["$$this", searchgram],
                },
              },
            },
          },
          { $size: "$ngrams" },
        ],
      },
    })
    .sort({ score: -1 })
    .toArray();

  console.log(results);
}

async function run() {
  const mongoClient = new MongoClient(process.env.CONNECTION_STRING);

  try {
    // Connect the client to the server
    await mongoClient.connect();

    // Establish and verify connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    await fetch(mongoClient);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
  }
}

run().catch(console.error);
