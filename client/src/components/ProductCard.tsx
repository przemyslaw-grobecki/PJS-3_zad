import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Product from "../types/Product";
import { useState } from 'react';

type ProductCardProps = {
    product: Product,
    addProductToBasket: Function,
    removeProductFromBasket: Function
}

const ProductCard: React.FC<ProductCardProps> = (props : ProductCardProps) => {
    const [product, setProduct] = useState(props.product);

    const removeFromBasket = () => {
        if(product.quantity < props.product.quantity){
            setProduct(prevState => ({
                ...prevState,
                quantity: Number(prevState.quantity) + 1
            }))
            props.removeProductFromBasket(props.product);
        }
    };

    const addToBasket = () => {
        if(product.quantity > 0){
            setProduct(prevState => ({
                ...prevState,
                quantity: Number(prevState.quantity) - 1
            }))
            props.addProductToBasket(props.product);
        }
    };

    return (
            <Card sx={{ width: 245 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={product.imageURL}
                    title="product"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {product.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {product.price.toString()} $
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Amount in stock: {product.quantity.toString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={addToBasket}>Add to cart</Button>
                </CardActions>
                <CardActions>
                    <Button size="small" color="secondary" onClick={removeFromBasket}>Remove From Cart</Button>
                </CardActions>
            </Card>
    )
}
export default ProductCard