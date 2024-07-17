import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import ProductCard from "./ProductCard";

function ProductListNew() {
    const axiosClient = axios.create({
        baseURL: "https://json-server-c67opnddza-el.a.run.app",
    });
    const [totalProduct, setTotalProduct] = useState(undefined);
    const [productList, setProducts] = useState([]);
    const [categoryList, setCategoryList] = useState(["All"]);
    const [categorySelect, setCategorySelect] = useState("All");
    const [companyList, setCompanyList] = useState(["All"]);
    const [companySelect, setCompanySelect] = useState("All");
    const [sortOption, setSortOption] = useState("");
    const [sortBasis, setSortBasis] = useState("Ascending");
    const [availability, setAvailability] = useState("All");
    const [topProducts, setTopProducts] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    let query = `?top=${topProducts || 5}&availability=${availability}&minPrice=${minPrice || 0
        }&maxPrice=${maxPrice || 5000}`;

    useEffect(() => {
        axiosClient
            .get("/products")
            .then((response) => {
                setProducts(response.data);
                setTotalProduct(response.data.length);
            })
            .catch((err) => console.error(err));

        axiosClient
            .get("/companies")
            .then((response) => {
                setCompanyList(
                    response.data.map((item) => ({
                        desc: item.description,
                        name: item.name,
                    }))
                );
            })
            .catch((err) => console.error(err));

        axiosClient
            .get("/categories")
            .then((response) => {
                setCategoryList(response.data.map((item) => item.name));
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (topProducts > totalProduct) {
            setTopProducts(totalProduct);
        }
        if (
            categorySelect &&
            companySelect &&
            categorySelect !== "All" &&
            companySelect !== "All"
        ) {
            axiosClient
                .get(
                    `/companies/${companySelect.substring(
                        0,
                        3
                    )}/categories/${categorySelect}/products` + query
                )
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((err) => console.error(err));
        } 
        
        else if (categorySelect && categorySelect !== "All") {
            axiosClient
                .get(`/categories/${categorySelect}/products` + query)
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((err) => console.error(err));
        } 
        
        else if (companySelect && companySelect !== "All") {
            axiosClient
                .get(`/companies/${companySelect.substring(0, 3)}/products` + query)
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((err) => console.error(err));
        } 
        
        else {
            axiosClient
                .get("/products")
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((err) => console.error(err));
        }
    }, [
        categorySelect,
        companySelect,
        availability,
        topProducts,
        minPrice,
        maxPrice,
    ]);

    useEffect(() => {
        let sorted = [...productList];
        if (sortOption) {
            sorted.sort((a, b) => {
                if (sortOption === "price") {
                    return a.price - b.price;
                } else if (sortOption === "rating") {
                    return b.rating - a.rating;
                } else if (sortOption === "discount") {
                    return b.discount - a.discount;
                } else if (sortOption === "name") {
                    return a.productName.localeCompare(b.productName);
                }
                return 0;
            });
            if (sortBasis === "Descending") sorted.reverse();
        }
        setProducts(sorted);
    }, [sortOption, sortBasis]);

    const handleResetButtonClick = () => {
        setCategorySelect("All");
        setCompanySelect("All");
        setSortOption("All");
        setSortBasis("Ascending");
        setAvailability("All");
        setTopProducts("All");
        setMinPrice("");
        setMaxPrice("");
    };

    const isFilteredApplied = () => {
        return (
            categorySelect !== "All" ||
            companySelect !== "All" ||
            availability !== "All"
        );
    };

    const showData = () => {
        if (!isFilteredApplied() && productList.length === 0) {
            return (
                <Stack
                    alignItems={"center"}
                    justifyItems={"center"}
                    mt={10}
                    width={"100%"}
                >
                    <h2>Loading Data...</h2>
                    <CircularProgress color="secondary" />
                </Stack>
            );
        } else if (isFilteredApplied() && productList.length === 0) {
            return (
                <Box sx={{ alignItems: "center" }}>
                    <h1>No Data Found...</h1>
                    <h4>Please try to change your filters.</h4>
                </Box>
            );
        } else {
            return productList.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ));
        }
    };

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "fit-content",
                }}
            >
                <h1>All Products</h1>
                <Button variant="outlined" onClick={handleResetButtonClick}>
                    Clear Filters
                </Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} padding={"0 28px"}>
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                    >
                        <Autocomplete
                            disablePortal
                            id="combo-box-category"
                            value={categorySelect}
                            onChange={(_, newValue) => {
                                setCategorySelect(newValue);
                            }}
                            options={[...categoryList, "All"]}
                            sx={{ width: 200 }}
                            isOptionEqualToValue={(option, value) =>
                                option.name === value.name
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Category" />
                            )}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-company"
                            value={companySelect}
                            onChange={(_, newValue) => {
                                setCompanySelect(newValue);
                            }}
                            options={[...companyList, { desc: "All", name: "All" }].map(
                                (item) => `${item.name} (${item.desc})`
                            )}
                            sx={{ width: 200 }}
                            isOptionEqualToValue={(option, value) =>
                                option.name === value.name
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Company" />
                            )}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-availability"
                            value={availability}
                            onChange={(_, newValue) => {
                                setAvailability(newValue);
                            }}
                            options={["All", "yes", "no"]}
                            getOptionLabel={(option) =>
                                option === "yes"
                                    ? "Stock Available"
                                    : option === "no"
                                        ? "Out of Stock"
                                        : "All"
                            }
                            sx={{ width: 200 }}
                            isOptionEqualToValue={(option, value) =>
                                option.name === value.name
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Availability" />
                            )}
                        />
                        <Autocomplete
                            disablePortal
                            value={sortOption}
                            id="combo-box-sort"
                            onChange={(_, newValue) => {
                                setSortOption(newValue);
                            }}
                            options={["name", "price", "rating", "discount"]}
                            getOptionLabel={(option) => option}
                            sx={{ width: 200 }}
                            isOptionEqualToValue={(option, value) =>
                                option.name === value.name
                            }
                            renderInput={(params) => (
                                <TextField {...params} label="Sort By" />
                            )}
                        />
                        {sortBasis === "Ascending" ? (
                            <Button
                                disabled={sortOption ? false : true}
                                variant="outlined"
                                startIcon={<GoSortDesc height="100%" width="100%" />}
                                onClick={() => setSortBasis("Descending")}
                            >
                                Desc
                            </Button>
                        ) : (
                            <Button
                                disabled={sortOption ? false : true}
                                variant="outlined"
                                startIcon={<GoSortAsc height="100%" width="100%" />}
                                onClick={() => setSortBasis("Ascending")}
                            >
                                Asce
                            </Button>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={"row"} justifyContent={"space-around"}>
                        <TextField
                            disabled={!isFilteredApplied() ? true : false}
                            variant="outlined"
                            type="number"
                            label="First Top Products"
                            value={topProducts}
                            onChange={(event) => {
                                setTopProducts(event.target.value);
                            }}
                        />
                        <TextField
                            disabled={!isFilteredApplied() ? true : false}
                            variant="outlined"
                            type="number"
                            label="Min Price"
                            value={minPrice}
                            onChange={(event) => {
                                setMinPrice(event.target.value);
                            }}
                        />
                        <TextField
                            disabled={!isFilteredApplied() ? true : false}
                            variant="outlined"
                            type="number"
                            label="Max Price"
                            value={maxPrice}
                            onChange={(event) => {
                                setMaxPrice(event.target.value);
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justify="space-between">
                        {showData()}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductListNew;
