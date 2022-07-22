import React, {Fragment, useEffect} from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAdminProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
ChartJS.register(...registerables);

const Dashboard = () => {

  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const { orders } = useSelector(state => state.allOrders);
  const { users } = useSelector(state => state.allUsers);

  let outOfStock = 0;

  products && products.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAdminProduct());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 5000],
        fill: false,
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      }
    ]
  }

  return (
    <Fragment>
      <MetaData title="Dashboard Admin" />
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 20000 VND{" "}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
            <Line data={lineState}  />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />

        </div>
      </div>
    </div>

    </Fragment>
  );
};

export default Dashboard;
