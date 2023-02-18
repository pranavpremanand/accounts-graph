import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balances: [],
  months: 0,
  paymentAmount: 0,
  initialBalance: 0,
};
const accountsSlice = createSlice({
  name: "accountsSlice",
  initialState,
  reducers: {
    addBalance: (state, action) => {
      let balance = parseInt(action.payload);
      if (Number.isInteger(balance)) {
        state.balances.push(balance);
        state.initialBalance = state.balances.reduce((acc, curr) => {
          return acc + curr;
        });
      }
    },
    paymentAmount: (state, action) => {
      let amount = parseInt(action.payload);
      if (Number.isInteger(amount)) {
        state.paymentAmount = amount;
        state.months = Math.floor(state.initialBalance / state.paymentAmount);
      }
    },
  },
});

export const { addBalance, paymentAmount } = accountsSlice.actions;
export default accountsSlice.reducer;
