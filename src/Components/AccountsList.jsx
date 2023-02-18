import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBalance } from "../Redux/accountsSlice";
import "./AccountsList.css";

const AccountsList = () => {
const balances= useSelector((state)=>state.data.balances)
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addBalance(amount))
    setAmount("");
  };

  return (
    <div className="main">
      <h2>Accounts</h2>
      <h4>Count: {balances.length}</h4>
      <div>
        <div className="balanceDiv">
            <h5>Balance</h5>
          <div>
            <input
              type="tel"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <div>
        {balances.map((value,index) => {
          return <h5 key={index}>Balance : {value}</h5>;
        })}
      </div>
    </div>
  );
};

export default AccountsList;
