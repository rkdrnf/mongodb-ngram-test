## Installation

`npm i`

## How to run

1. Launch mongodb
2. Configure connection string for mongodb in `.env`. If you use local mongodb instance, `.env.example` might be used for `.env` without any changes.
3. run `node src/seed.js` to populate test data set.
4. run `node src/index.js` to get the result.

## Possible improvements

Using weighted arithmetic mean score of multi ngram might results in better relavancy in fetched sentences.

## Score calculation

Score is calculated as 2.4 N-Gram Precision section in https://www.aclweb.org/anthology/E14-1022.pdf
In this implementation, it uses arithmetic mean of 1-gram, 2-gram, 3-gram precisions.

## Result

When tested with sentence

```
This is a base sentence for TM matching algorithm test.
```

, below is the result.

```
[
  {
    _id: 5fc49712ba3fdb612c6eb5e5,
    source: 'This is a base sentence for TM matching algorithm test.',
    score: 1,
    score1: 1,
    score2: 1,
    score3: 1
  },
  {
    _id: 5fc49712ba3fdb612c6eb5e8,
    source: 'This is a base sentence for TM matching algorithm test with addition.',
    score: 0.8993265993265993,
    score1: 0.9090909090909091,
    score2: 0.9,
    score3: 0.8888888888888888
  },
  {
    _id: 5fc49712ba3fdb612c6eb5e7,
    source: 'This is a base sentence for TM matching algorithm test with 4 more words.',
    score: 0.8171717171717172,
    score1: 0.8333333333333334,
    score2: 0.8181818181818182,
    score3: 0.8
  },
  {
    _id: 5fc49712ba3fdb612c6eb5eb,
    source: 'This is a sentence for TM matching algorithm test.',
    score: 0.8125214998280014,
    score1: 0.9473684210526315,
    score2: 0.8235294117647058,
    score3: 0.6666666666666666
  },
  {
    _id: 5fc49712ba3fdb612c6eb5e9,
    source: 'This is a replaced sentence for TM matching algorithm test.',
    score: 0.7675925925925927,
    score1: 0.9,
    score2: 0.7777777777777778,
    score3: 0.625
  },
  {
    _id: 5fc49712ba3fdb612c6eb5e6,
    source: 'This is a base sentence for TM matching algorithm test with many more additional non-related words.',
    score: 0.7488344988344989,
    score1: 0.7692307692307693,
    score2: 0.75,
    score3: 0.7272727272727273
  },
  {
    _id: 5fc49712ba3fdb612c6eb5ec,
    source: 'a sentence for TM matching algorithm test.',
    score: 0.701860231271996,
    score1: 0.8235294117647058,
    score2: 0.6666666666666666,
    score3: 0.6153846153846154
  },
  {
    _id: 5fc49712ba3fdb612c6eb5ed,
    source: 'a replaced sentence for TM matching algorithm test.',
    score: 0.6580687830687831,
    score1: 0.7777777777777778,
    score2: 0.625,
    score3: 0.5714285714285714
  },
  {
    _id: 5fc49712ba3fdb612c6eb5ee,
    source: 'a replaced sentence for TM matching algorithm test with addition.',
    score: 0.5851851851851851,
    score1: 0.7,
    score2: 0.5555555555555556,
    score3: 0.5
  },
  {
    _id: 5fc49712ba3fdb612c6eb5ea,
    source: 'These are replaced sentences for TM matching algorithm test.',
    score: 0.4656346749226006,
    score1: 0.5263157894736842,
    score2: 0.47058823529411764,
    score3: 0.4
  },
  {
    _id: 5fc49712ba3fdb612c6eb5ef,
    source: 'a little overlap',
    score: 0.05128205128205129,
    score1: 0.15384615384615385,
    score2: 0,
    score3: 0
  }
]

```
