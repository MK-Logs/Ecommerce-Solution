import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import Col from "react-bootstrap/Col";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("api/products");
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h4>Jackets Catalog</h4>
      <br></br>
      <div className="products">
        {products.map((product) => (
          <Col key={product.slug}>
            <Product product={product}> </Product>
          </Col>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
