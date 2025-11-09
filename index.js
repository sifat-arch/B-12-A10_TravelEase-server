const express = require("express");

const cors = require("cors");

const port = 3000;
dotenv.config();

const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

// const admin = require("firebase-admin");

// const serviceAccount = require("./firebase-admin-key.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// middle were
app.use(cors());
app.use(express.json());

// const verifyFirebaseToken = async (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (!authorization) {
//     return res.status(401).send({ message: "Unauthorize Access" });
//   }
//   const token = authorization.split(" ")[1];
//   if (!token) {
//     return res.status(401).send({ message: "Unauthorize Access" });
//   }

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     console.log("inside token", decoded);
//     req.token_email = decoded.email;
//     next();
//   } catch {
//     return res.status(401).send({ message: "Unauthorize Access" });
//   }
// };

// mongodb
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.USERPASS}@cluster0.0qspeye.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    // do all crud operations here
    const travelsDB = client.db("travelsDB");
    const vehiclesCollection = travelsDB.collection("vehiclesCollection");

    // vehicles collection related apis
    app.post("/vehicles", async (req, res) => {
      const newUserInfo = req.body;
      const result = await vehiclesCollection.insertOne(newUserInfo);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to b10 server");
});

app.listen(port, () => {
  console.log(`Server is running to the port:${port}`);
});

// user-travelEaseDB
// psss-LA3v9CTujTp0rLGS
