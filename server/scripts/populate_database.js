//Imports
import dbConfig from "../db_config.json" assert { type: "json" };
import exampleData from "../example_data.json" assert { type: "json" };
import mongoose from "mongoose";
import Product from "../models/product.js";

//Configure database connection
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connectionURI = `mongodb://127.0.0.1:${dbConfig.port}/${dbConfig.collectionName}`;
mongoose.set('strictQuery', true);
await mongoose.connect(connectionURI, connectionOptions);

await Product.insertMany(exampleData.products)
    .catch((error) => {
        console.log(error);
        throw error;
    })
    .then(async () => {
        await mongoose.disconnect();
    });
