
// if React-19 is not working change it's versions to given version in package.json file
// "react": "^18.3.1",
// "react-dom": "^18.3.1",

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListNew from './components/productListNew';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListNew />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
