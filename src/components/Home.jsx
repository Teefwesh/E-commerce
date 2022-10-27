import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const Home = () => {
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const { items: data } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      <>
        <h2>New Arrivals</h2>

        <div className="products">
          {data?.map((product) => (
            <div key={product._id} className="product">
              {/* <Link to={`/product/${product._id}`}> */}
              <img src={product.image?.url} alt={product.name} />
              {/* </Link> */}
              <h3
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: "-15px",
                }}
              >
                {product.name}
              </h3>
              {/* <div className="details">
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.desc}
                </span>
              </div> */}
              <span
                className="price"
                style={{ fontWeight: "500", fontSize: "1.5rem" }}
              >
                &#8358; {product.price}
              </span>
              {/* <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button> */}
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Home;
