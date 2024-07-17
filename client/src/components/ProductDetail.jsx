import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('https://json-server.bytexl.app/products')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find(product => product.id.toString() === id);
        setProduct(foundProduct);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          alt={product.name}
          height="140"
          image={`https://picsum.photos/200/300?random=${product?.id}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Company: {product.company}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rating: {product.rating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Discount: {product.discount}%
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Availability: {product.availability}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetail;
