import { Button } from "antd-mobile";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const Layout = () => {
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
