import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  // 静态状态数据
  initialState: {
    billList: [],
  },
  // 同步：更新状态的方法
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },

    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

// 解构出状态creater对象
const { setBillList, addBill } = billStore.actions;

// 编写异步方法
const getBillList = () => {
  return async (dispatch) => {
    // 获取异步数据
    const res = await axios.get("http://localhost:8888/ka");
    // 触发同步方法更行状态数据
    dispatch(setBillList(res.data));
  };
};
// 编写异步add方法
const addBillList = (data) => {
  return async (dispatch) => {
    // 获取异步数据
    const res = await axios.post("http://localhost:8888/ka", data);
    // 触发同步方法更行状态数据
    dispatch(addBill(res.data));
  };
};

// 导出异步方法
export { getBillList, addBillList };

const billReducer = billStore.reducer;
export default billReducer;
