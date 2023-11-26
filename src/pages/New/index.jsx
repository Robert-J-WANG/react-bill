import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/contants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const New = () => {
  const navigate = useNavigate();
  /* -------------------- 9.支出和收入切换功能 -------------------- */
  // 9.1 控制收入支出的状态
  // pay-支出，income-收入
  const [billType, setBillType] = useState("pay");

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            // 9.2 billType的值适配是否激活样式？
            className={classNames(billType === "pay" ? "selected" : "")}
            // 9.3 点击时，设置billType的值
            onClick={() => setBillType("pay")}
          >
            支出
          </Button>
          <Button
            // 9.2 billType的值适配是否激活样式？
            className={classNames(billType === "income" ? "selected" : "")}
            shape="rounded"
            // 9.3 点击时，设置billType的值
            onClick={() => setBillType("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{dayjs().format("YYYY-MM-DD")}</span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={100}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {/* 9.4 billType的值适配记账列表数据 */}
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    // selected
                    <div className={classNames("item", "")} key={item.type}>
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save">保 存</Button>
      </div>
    </div>
  );
};

export default New;
