const express = require('express')
const faker = require('faker')
const _ = require('lodash')
const app = express()

const names = _.times(500, () => faker.name.findName());

app.get('/names', (req, res) => {
  const {from, to} = req.query;
  res.status(200).json(names.slice(parseInt(from) - 1, parseInt(to) - 1))
})

app.listen(3000, () => {
  console.log("API listening on port 3000")
})
