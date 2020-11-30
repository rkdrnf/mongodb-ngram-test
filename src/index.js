require("dotenv").config();

const grammit = require("./grammit");
const { MongoClient } = require("mongodb");
const process = require("process");

function projectScore(searchgram, n, zValue) {
  return {
    $divide: [
      {
        $size: {
          $filter: {
            input: `$ngrams${n}`,
            cond: {
              $in: ["$$this", searchgram],
            },
          },
        },
      },
      {
        $add: [
          { $multiply: [{ $size: `$ngrams${n}` }, 1 - zValue] },
          { $multiply: [searchgram.length, zValue] },
        ],
      },
    ],
  };
}

/** @param {MongoClient} dbClient */
async function fetch(dbClient) {
  const col = dbClient.db("ngram").collection("sentences");

  const zValue = Number(process.env.Z_VALUE);
  const nLowerbound = Number(process.env.NGRAM_LOWERBOUND);
  const nUpperbound = Number(process.env.NGRAM_UPPERBOUND);

  console.log(zValue, nLowerbound, nUpperbound);

  const querySentence =
    "This is a base sentence for TM matching algorithm test.";

  const searchgrams = {};

  const projection = {
    source: "$text",
  };

  const nValues = [];
  for (let n = nLowerbound; n <= nUpperbound; n++) {
    nValues.push(n);
    searchgrams[n] = grammit(querySentence, true, n);
  }

  projection["score"] = {
    $divide: [
      {
        $add: nValues.map((n) => projectScore(searchgrams[n], n, zValue)),
      },
      nValues.length,
    ],
  };

  for (let n = nLowerbound; n <= nUpperbound; n++) {
    projection[`score${n}`] = projectScore(searchgrams[n], n, zValue);
  }

  // const match = {
  //   $or: nValues.map((n) => {
  //     const key = `ngrams${n}`;
  //     return {
  //       [key]: { $in: searchgrams[n] },
  //     };
  //   }),
  // };

  const match = {
    ngrams1: { $in: searchgrams[1] },
  };

  const results = await col
    .aggregate()
    .match(match)
    .project(projection)
    .sort({ score: -1 })
    .toArray();

  console.log("matched sentences", results.length);
  console.log(results);

  const explain = await col
    .aggregate()
    .match(match)
    .project(projection)
    .sort({ score: -1 })
    .explain();

  console.log(JSON.stringify(explain));
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
