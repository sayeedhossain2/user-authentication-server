const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middle Wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.khpqtwr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const allCompany = client.db("companyInfo").collection("details");

    // details post
    app.post("/details", async (req, res) => {
      const information = req.body;
      const result = await allCompany.insertOne(information);
      res.send(result);
    });

    // details get
    app.get("/alldetails", async (req, res) => {
      const query = {};
      const allInfo = await allCompany.find(query).toArray();
      res.send(allInfo);
    });

    // delete method
    app.delete("/companyInfor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await allCompany.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("test task server is running");
});

app.listen(port, () => {
  console.log(`Test task server running on ${port}`);
});
