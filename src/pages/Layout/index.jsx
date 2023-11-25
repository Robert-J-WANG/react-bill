import { getBillList } from "@/store/Modules/billStore";
import { Button } from "antd-mobile";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  // 页面初次渲染时，触发异步函数，更新并获取状态数据
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);
  return (
    <div>
      <Outlet />
      Layout
      <Button color="primary">全局主题</Button>
      <div className="purple-theme">
        <Button color="primary">局部主题</Button>
      </div>
    </div>
  );
};
