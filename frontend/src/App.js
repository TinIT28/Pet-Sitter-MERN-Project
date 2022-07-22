import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import Loader from "./components/layout/Loader/Loader";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import UpdateProduct from "./components/Admin/UpdateProduct"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewProduct from "./components/Admin/NewProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UserList from "./components/Admin/UserList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droids San", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Fragment>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route
                exact
                path="/process/payment"
                element={<ProtectedRoute component={Payment} />}
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/account"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            exact
            path="/me/update"
            element={<ProtectedRoute component={UpdateProfile} />}
          />
          <Route
            exact
            path="/password/update"
            element={<ProtectedRoute component={UpdatePassword} />}
          />
          <Route
            exact
            path="/shipping"
            element={<ProtectedRoute component={Shipping} />}
          />
          <Route
            exact
            path="/success"
            element={<ProtectedRoute component={OrderSuccess} />}
          />
          <Route
            exact
            path="/orders"
            element={<ProtectedRoute component={MyOrders} />}
          />
          <Route
            exact
            path="/admin/dashboard"
            element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
          />
          <Route
            exact
            path="/admin/products"
            element={<ProtectedRoute isAdmin={true} component={ProductList} />}
          />
          <Route
            exact
            path="/admin/product"
            element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
          />
          <Route
            exact
            path="/admin/product/:id"
            element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />}
          />
          <Route
            exact
            path="/admin/orders"
            element={<ProtectedRoute isAdmin={true} component={OrderList} />}
          />
          <Route
            exact
            path="/admin/order/:id"
            element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
          />
          <Route
            exact
            path="/admin/users"
            element={<ProtectedRoute isAdmin={true} component={UserList} />}
          />
          <Route
            exact
            path="/admin/user/:id"
            element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
          />
          <Route
            exact
            path="/admin/reviews"
            element={<ProtectedRoute isAdmin={true} component={ProductReviews} />}
          />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route path="/sad" element={<Loader />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
        <Routes>
          <Route
            exact
            path="/order/confirm"
            element={<ProtectedRoute component={ConfirmOrder} />}
          />
          <Route
            exact
            path="/order/:id"
            element={<ProtectedRoute component={OrderDetails} />}
          />
        </Routes>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
