const axios = require('axios');

const API_BASE_URL = 'https://json-server.bytexl.app';

const getProducts = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const filterProducts = async (req, res) => {
  try {
    const {
      selectedCategory,
      selectedCompany,
      selectedRating,
      minPrice,
      maxPrice,
      selectedAvailability,
      sortBy,
      isSortAscending,
      searchTerm,
    } = req.query;

    let url = `${API_BASE_URL}/products`;
    const queryParams = [];

    if (selectedCategory !== 'All') {
      url = `${API_BASE_URL}/categories/${encodeURIComponent(selectedCategory)}/products`;
    }
    if (selectedCompany !== 'All') {
      url = `${API_BASE_URL}/companies/${encodeURIComponent(selectedCompany)}/products`;
    }
    if (selectedCategory !== 'All' && selectedCompany !== 'All') {
      url = `${API_BASE_URL}/companies/${encodeURIComponent(selectedCompany)}/categories/${encodeURIComponent(selectedCategory)}/products`;
    }

    if (minPrice) {
      queryParams.push(`minPrice=${encodeURIComponent(Number(minPrice))}`);
    }
    if (maxPrice) {
      queryParams.push(`maxPrice=${encodeURIComponent(Number(maxPrice))}`);
    }
    if (selectedAvailability) {
      queryParams.push(`availability=${encodeURIComponent(selectedAvailability === "yes" ? "yes" : "no")}`);
    }
    if ((selectedCategory !== 'All' || selectedCompany !== 'All') && !searchTerm.trim()) {
      queryParams.push(`top=${encodeURIComponent(1000)}`); // Adjust 1000 to your desired number
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    const response = await axios.get(url);
    let filteredProducts = response.data;

    const isSortAscendingBoolean = isSortAscending === 'true';
    if (sortBy) {
      switch (sortBy) {
        case "Name":
          filteredProducts.sort((a, b) => {
            const nameA = a.productName.toLowerCase();
            const nameB = b.productName.toLowerCase();

            const splitByDigit = (str) => {
              return str
                .split(/(\d+)/)
                .filter(Boolean)
                .map((part) => isNaN(part) ? part.toLowerCase() : parseInt(part, 10));
            };

            const naturalCompare = (partsA, partsB) => {
              const minLength = Math.min(partsA.length, partsB.length);
              for (let i = 0; i < minLength; i++) {
                const partA = partsA[i];
                const partB = partsB[i];
                if (typeof partA === "string" && typeof partB === "string") {
                  const compareResult = partA.localeCompare(partB);
                  if (compareResult !== 0) return compareResult;
                } else if (typeof partA === "number" && typeof partB === "number") {
                  if (partA !== partB) return partA - partB;
                } else {
                  return typeof partA === "string" ? -1 : 1;
                }
              }
              return partsA.length - partsB.length;
            };

            const partsA = splitByDigit(nameA);
            const partsB = splitByDigit(nameB);
            return isSortAscendingBoolean ? naturalCompare(partsA, partsB) : naturalCompare(partsB, partsA);
          });
          break;

        case "Price":
          filteredProducts.sort((a, b) => {
            const effectivePriceA = a.price - (a.price * a.discount) / 100;
            const effectivePriceB = b.price - (b.price * b.discount) / 100;
            return isSortAscendingBoolean ? effectivePriceA - effectivePriceB : effectivePriceB - effectivePriceA;
          });
          break;

        case "Discount":
          filteredProducts.sort((a, b) => isSortAscendingBoolean ? a.discount - b.discount : b.discount - a.discount);
          break;

        case "Rating":
          filteredProducts.sort((a, b) => isSortAscendingBoolean ? a.rating - b.rating : b.rating - a.rating);
          break;

        default:
          break;
      }
    }

    if (selectedRating !== "") {
      filteredProducts = filteredProducts.filter((product) => product.rating >= parseFloat(selectedRating));
    }
    if (searchTerm.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) => product.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    res.json(filteredProducts);
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ error: 'Error filtering products' });
  }
};

module.exports = { getProducts, filterProducts };
