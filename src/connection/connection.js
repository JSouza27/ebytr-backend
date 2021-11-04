const { MongoClient } = require('mongodb');
require('dotenv/config');

const MONGO_DB_URL = process.env.ATLAS_URI;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let schema = null;

const connection = async () => (schema
  ? Promise.resolve(schema)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db('ebytrDB'))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.log(err);
    })
);

module.exports = { connection };
