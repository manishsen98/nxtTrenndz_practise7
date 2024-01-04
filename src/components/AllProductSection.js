import React, { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import ProductCart from "./ProductCart";
import "../Assets/css/AllProductSection.css"




function AllProductsSection() {
   const [productsList, setProductsList] = useState([]);
   

  const getProducts = useCallback(async () => {
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = `http://localhost:5000/api//getproducts`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        setProductsList(fetchedData)
        console.log(fetchedData)
      }
      
    } catch (error) {
      console.log(error)
    }
  }, []);



  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const renderProductsList = () => (
    <>
       <ul className="product-list">
        {productsList.map((product) => (
          <ProductCart  productData = {product} key = {product.id} />
        ) ) }
       </ul>
    </>
  );

 
  return  renderProductsList() ; 
}

export default AllProductsSection;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NThlYjk4NDY3NzM1MDE0NTcwNDljN2EiLCJpYXQiOjE3MDM4NTMxNTAsImV4cCI6MTcwMzg1MzE1MH0.6tkeFIEef6D9edXnfGw3e3GDPvlGil4xOAJw3PIi-G8