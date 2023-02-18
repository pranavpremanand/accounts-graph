import React from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Graph.css";
import { useState } from "react";
import { paymentAmount } from "../Redux/accountsSlice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let payments = [];
let monthsCount = [];

const Graph = () => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("");
  const initialBalance = useSelector((state) => state.data.initialBalance);
  const months = useSelector((state) => state.data.months);

  //Set graph data
  function graphData() {
    payments = [];
    monthsCount = [];
    for (let i = 0; i <= months; i++) {
      let value = initialBalance - payment * i;
      if (!value > 0) break;
      monthsCount.push(i);
      payments.push(value);
    }
  }
  graphData();

  //Set payment amount
  function handleClick() {
    dispatch(paymentAmount(payment));
  }

  //Graph data
  const labels = monthsCount;
  const data = {
    labels,
    datasets: [
      {
        label:'Payments',
        data: payments,
      },
    ],
  };

  //Payment input handler
  const handleChange = (e) => {
    if(e.target.value<initialBalance){
        setPayment(e.target.value);
    }
  };

  return (
    <div className="outerDivdiv">
      <div>
        <div>
          <h3>Initial Balance: {initialBalance}</h3>
          <div className="payment">
            <h4>Monthly Payment</h4>
            <div className="paymentBox">
              <input type="tel" value={payment} onChange={handleChange} />
              <button onClick={handleClick}>Set payment</button>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div>
        <h3>Balance of accounts after a number of months</h3>
        <div>
          <Line
            data={data}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Graph;
