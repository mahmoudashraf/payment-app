import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface BalanceState {
  balance: number
}

const initialState: BalanceState = {
  balance: 0,
};


export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    recharge: (state) => {
      state.balance += 10;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance =action.payload;
    },
  },
});

export const {recharge: recharge, setBalance: setBalance} =
balanceSlice.actions;

export default balanceSlice.reducer;
