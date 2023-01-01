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

app.post('/products/buy', async (req, res) => {
    console.log(req.body.basket);
    console.log(req.params);
    if (req.body.basket.length !== 0) {
        try{
            req.body.basket.forEach(product => {
                buyProduct(product._id, product.quantity);
            });
            res.status(201).send("Succesfully bought in PrzemekShop");
        } catch( err ) {
            res.status(500).send(err.message);
        }
    }
    else {
        res.status(500).send({
            "ErrorMessage": "You need to specify how much You would like to buy {quantity: {amount}}"
        });
    }
});

const buyProduct = async (productId, quantity) => {
    await Product.findByIdAndUpdate({ _id: productId }, { "$inc": { quantity: -quantity } });
}