## Installation

`npm i`

## How to run

1. Launch mongodb
2. Configure connection string for mongodb in `.env`. If you use local mongodb instance, `.env.example` might be used for `.env` without any changes.
3. run `node src/seed.js` to populate test data set.
4. run `node src/index.js` to get the result.




## Result

When tested with sentence
```
This is a base sentence for TM matching algorithm test.
```
, below is the result.

```
[
  {
    _id: 5fc46bf8cacc6650158baf17,
    size: 8,
    source: 'This is a base sentence for TM matching algorithm test.',
    found: 8,
    score: 1
  },
  {
    _id: 5fc46bf8cacc6650158baf1a,
    size: 10,
    source: 'This is a base sentence for TM matching algorithm test with addition.',
    found: 8,
    score: 0.8
  },
  {
    _id: 5fc46bf8cacc6650158baf1e,
    size: 5,
    source: 'a sentence for TM matching algorithm test.',
    found: 4,
    score: 0.8
  },
  {
    _id: 5fc46bf8cacc6650158baf1d,
    size: 7,
    source: 'This is a sentence for TM matching algorithm test.',
    found: 5,
    score: 0.7142857142857143
  },
  {
    _id: 5fc46bf8cacc6650158baf1f,
    size: 6,
    source: 'a replaced sentence for TM matching algorithm test.',
    found: 4,
    score: 0.6666666666666666
  },
  {
    _id: 5fc46bf8cacc6650158baf19,
    size: 12,
    source: 'This is a base sentence for TM matching algorithm test with 4 more words.',
    found: 8,
    score: 0.6666666666666666
  },
  {
    _id: 5fc46bf8cacc6650158baf1b,
    size: 8,
    source: 'This is a replaced sentence for TM matching algorithm test.',
    found: 5,
    score: 0.625
  },
  {
    _id: 5fc46bf8cacc6650158baf18,
    size: 14,
    source: 'This is a base sentence for TM matching algorithm test with many more additional non-related words.',
    found: 8,
    score: 0.5714285714285714
  },
  {
    _id: 5fc46bf8cacc6650158baf20,
    size: 8,
    source: 'a replaced sentence for TM matching algorithm test with addition.',
    found: 4,
    score: 0.5
  },
  {
    _id: 5fc46bf8cacc6650158baf1c,
    size: 7,
    source: 'These are replaced sentences for TM matching algorithm test.',
    found: 3,
    score: 0.42857142857142855
  }
]
```

