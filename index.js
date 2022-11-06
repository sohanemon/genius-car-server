require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
const mongodb = require("mongodb");
const client = new mongodb.MongoClient(process.env.URI);
const serviceCollection = client.db("ultra_genius_car").collection("services");
const orderCollection = client.db("ultra_genius_car").collection("orders");
try {
  (() => {
    app.get("/", (req, res) => {
      res.send("Data");
    });
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find({});
      const data = await cursor.toArray();
      res.send(data);
    });
    app.get("/service/:id", async (req, res) => {
      const data = await serviceCollection.findOne({
        _id: mongodb.ObjectId(req.params.id),
      });
      res.send(data);
    });
    app.get("/service", async (req, res) => {
      const data = await serviceCollection.findOne({
        title: req.query.title,
      });
      res.send(data);
    });
    app.post("/orders", async (req, res) => {
      console.log(req.body);
      const result = await orderCollection.insertOne(req.body);
      res.send(result);
    });
    app.get("/orders", async (req, res) => {
      const cursor = orderCollection.find(
        req.query.email ? { email: req.query.email } : {}
      );
      const data = await cursor.toArray();
      res.send(data);
    });
    app.delete("/order/:id", async (req, res) => {
      const result = await orderCollection.deleteOne({
        _id: mongodb.ObjectId(req.params.id),
      });
      res.send(result);
    });
  })();
} catch (error) {
  console.log("🚀 > error", error);
}
app.listen(port, () => console.log(`App listening on port ${port}!`));
