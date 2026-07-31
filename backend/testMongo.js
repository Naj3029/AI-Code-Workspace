const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("MongoDB Driver Connection Successful");
  } catch (error) {
    console.log("Connection Failed:");
    console.log(error.message);
  } finally {
    await client.close();
  }
}

run();