//Imports
import dbConfig from "./db_config.json" assert { type: "json" };
import exampleData from "./example_data.json" assert { type: "json" };
import mongoose from "mongoose";
import Product from "./product.js";

//Configure database connection
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connectionURI = `mongodb://127.0.0.1:${dbConfig.port}/${dbConfig.collectionName}`;
mongoose.set('strictQuery', true);
await mongoose.connect(connectionURI, connectionOptions);

const db = mongoose.connection;
//console.log(db);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

exampleData.products.forEach(async data => {
    console.log(data);
    try{
        await Product.create(data);
    }
    catch (error){
        console.log(`AWDAWDWA ${error}`)
    }
});

const firstProduct = await Product.findOne({});
console.log(firstProduct);

process.exit();
