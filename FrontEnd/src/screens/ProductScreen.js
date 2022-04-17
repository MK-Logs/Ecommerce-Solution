import "./ProductScreen.css";
import axios from "axios";
import { useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartHandler = () => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <div>
      <h4>{[product.name]}</h4>
      <img className="img-large" src={product.image} alt={product.name} />
      <div className="ProductScreenItemsList">
        <ListGroup.Item>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
        </ListGroup.Item>
        <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
        <ListGroup.Item>
          <div className="d-grid">
            <Button onClick={addToCartHandler} variant="primary">
              Add to Cart
            </Button>
          </div>
        </ListGroup.Item>
      </div>
    </div>
  );
}
export default ProductScreen;
