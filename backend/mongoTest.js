const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://najbinhanef_db_user:YOUR_PASSWORD@cluster0.bytsjge.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. Successfully connected to MongoDB!");

  } catch(error) {
    console.log("MongoDB Error:");
    console.log(error.message);

  } finally {
    await client.close();
  }
}

run();