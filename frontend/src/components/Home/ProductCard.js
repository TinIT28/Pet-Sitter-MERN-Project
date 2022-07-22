import React from "react";
import { Link } from "react-router-dom";
import ReactStarts from "react-star-rating-component";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link to={`/product/${product._id}`} className="shop-item col-xl-3 col-lg-5 col-sm-6 col-12" style={{textDecoration: "none" }}>
        <div className="card">
          <div className="card-img">
            <img
              src={product.images[0].url}
              className="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="card-body">
            <p className="card-text">{product.name}</p>
            <div className="shop-infor">
              <div className="shop-price">{`${product.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}`}</div>
              <div className="shop-orders">
                <div className="shop-icon">
                  <Rating {...options} />{" "}
                </div>
                ({product.numOfReviews} Reviews)
              </div>
            </div>
          </div>
        </div>
    </Link>
  );
};

export default ProductCard;
