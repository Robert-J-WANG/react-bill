import { createSlice } from "@reduxjs/toolkit";

const billStore = createSlice({
  name: "bill",
  // 静态状态数据
  initialState: {
    billList: [1, 2],
  },
  // 同步：更新状态的方法
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

// 解构出状态creater对象
const { setBillList } = billStore.actions;
const billReducer = billStore.reducer;

export default billReducer;
