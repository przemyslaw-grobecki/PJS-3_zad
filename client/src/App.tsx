import {useEffect, useState} from 'react'
import axios from 'axios';
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import Product from "./types/Product";
import BasketItem from "./types/BasketItem";
import config from "./config.json";
import Skeleton from '@mui/material/Skeleton';
import './App.css'
import {ListItem, List, Stack} from "@mui/material";
import Basket from './components/Basket';


function App() {
    const [basketOpen, setBasketOpen] = useState(false);
    const [basket, setBasket] = useState<Array<BasketItem>>([]);
    const [products, setProducts] = useState<Array<Product>>([]);

    const handleClickOpenBasket = () => {
        setBasketOpen(true);
    };

    const handleCloseBasket = () => {
        setBasketOpen(false);
    };


    const addProductToBasket = (product: Product) => {
        let item = basket.find(b => b._id == product._id);
        if (item == undefined) {
            item = {
                _id: product._id,
                name: product.name,
                quantity: 1,
                price: product.price
            };
            setBasket((prevBasket) => [
                ...prevBasket,
                item as BasketItem
            ]);
        }else {
            setBasket((prevBasket) => {
                return [...prevBasket].map(b => {
                    if(b._id == product._id){
                        b.quantity = Number(b.quantity) + 1;
                    }
                    return b;
                });
            });
        }

        console.log(basket);
    };

    const removeProductFromBasket = (product: Product) => {
        let item = basket.find(b => b._id == product._id)
        if (item != undefined) {
            item.quantity = Number(item.quantity) - 1;
            if (item.quantity === 0) {
                setBasket(basket.filter(b => b._id !== product._id));
                return;
            }
            setBasket((prevBasket) => {
                return [...prevBasket].map(b => {
                    if(b._id == product._id){
                        b.quantity = Number(b.quantity);
                    }
                    return b;
                });
            });
        }
        console.log(basket);
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: `${config.serverURL}/products`
        }).then((response) => {
            console.log(response);
            setProducts((prevProducts) => {
                return [
                    ...response.data
                ]
            });
        });
    }, []);

    return (
        <div className="App">
            <Header openBasket={handleClickOpenBasket}/>
            <Basket basketItems={basket}
                basketOpen={basketOpen}
                closeBasket={handleCloseBasket}/>
            <List direction="row" component={Stack}>
                {
                    products.map((product) =>
                        <ListItem>
                            <ProductCard product={product}
                                addProductToBasket={addProductToBasket}
                                removeProductFromBasket={removeProductFromBasket}
                            />
                        </ListItem>
                    )
                }
            </List>
        </div>
    )
}

export default App
