import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Grid } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Star } from "@mui/icons-material"
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function ProductCard({ product }) {
  const [isCardLiked,setIsCardLiked] = useState(false)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/product/${product.id}`}>

        <CardMedia
          component="img"
          height="194"
          image={`https://picsum.photos/200/300?random=${product?.id}`}
          alt="Random Image"
          objectfit="fill"
        />
         </Link>
        <CardContent>
          <Grid
            container
            spacing={2}
            justifyContent={"space-between"}
          >
            <Grid
              item
              display={"flex"}
              justifyContent={"space-between"}
              sx={
                {
                  "width": "100%",
                  "alignItems": "baseline"
                }
              }>
              <Box display={"flex"}
                justifyContent={'space-between'}
                alignItems={"center"}>
                <Box>
                <Typography
                  color="text.primary"
                  sx={{
                    fontWeight: "550",
                    fontSize: "22px",
                    display: "block"
                  }}
                >
                  {product?.productName} ({product?.company})
                  
                </Typography>
                <Box sx={{fontSize:"16px",fontWeight:"normal",color:"#888"}}>
                    {product.category}
                  </Box>
                </Box>
              </Box>
              <Box sx={{
                lineHeight: "normal",
                height: "fit-content",
                display: "inline-flex",
                color: "#fff",
                padding: "2px 4px 2px 2px",
                borderRadius: "3px",
                fontWeight: 500,
                gap: "2px",
                fontSize: "12px",
                verticalAlign: "middle",
                backgroundColor: "#388e3c",
                alignItems: "center",
              }}>
                <Star sx={{
                  color: "rgb(255,255,255)",
                  height: "15px",
                  width: "15px"
                }}
                />
                {" " + `${product?.rating}`}
              </Box>
            </Grid>
            <Grid item width={"100%"}>
              <Box display={"flex"}
                alignItems={"center"}
                justifyContent={'space-between'}>
                <Typography
                  color="text.primary"
                  variant='h6'
                  fontSize={"25px"}
                  fontWeight={550}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  ₹ {product?.price}
                  <Typography variant='body 1'
                    fontSize={"16px"}
                  >
                    <span style={{
                      textDecoration: "line-through",
                      fontWeight: "500",
                      color: "#888"
                    }}
                    >
                      {`₹${Math.ceil((100 * (product?.price)) / (100 - product?.discount))}`}
                    </span>
                    {` ${product?.discount}`}% off
                  </Typography>
                </Typography>
                <span style={{display:"flex", flexDirection:"column", "alignItems":"end"}}>
                <IconButton
                  onClick={()=>{setIsCardLiked(!isCardLiked)}}
                  aria-label="add to favorites"
                  sx={{
                    height: "30px",
                    width: "30px"
                  }}>
                  <FavoriteIcon 
                    sx={{"color":isCardLiked?"red":"none"}}
                  />
                </IconButton>
                {product?.availability==="yes"?"Stock Available":"Out of the Stock"}
                </span>
                
              </Box>
            </Grid>
          </Grid>
        </CardContent>
    </Card >
  );
}
