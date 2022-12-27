import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ProductCardProps = {
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    imageURL: String | null | undefined
}

const ProductCard: React.FC<ProductCardProps> = (props : ProductCardProps) => {
    return (
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg"
                    title="product"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.price.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.quantity.toString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Add to cart</Button>
                </CardActions>
            </Card>
    )
}
export default ProductCard

/*
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
*/