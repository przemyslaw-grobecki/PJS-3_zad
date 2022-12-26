//Imports
import dbConfig from "./db_config.json" assert { type: "json" };
import serverConfig from "./server_config.json" assert { type: "json" };
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Product from "./models/product.js";

//Configure server application
const app = express();
app.use(express.json());
app.use(cors());

//Configure database connection
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connectionURL = `mongodb://127.0.0.1:${dbConfig.port}/${dbConfig.collectionName}`;
mongoose.connect(connectionURL, connectionOptions);
app.listen(serverConfig.port, () => console.log(`Server started on http://localhost:${serverConfig.port}`));

app.get('/products', async (req, res) => {
    res.status(200).send(
        await Product.find({})
    );
});

app.post('/authenticate', (req, res) => {

});

app.post('/products/:productId', (req, res) => {
    console.log(req.body)
    const id = req.params;
    res.status(201).send()
});