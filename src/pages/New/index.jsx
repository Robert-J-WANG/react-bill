import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/contants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addBillList } from "@/store/Modules/billStore";
import { useDispatch } from "react-redux";

const New = () => {
  const navigate = useNavigate();
  /* -------------------- 9.支出和收入切换功能 -------------------- */
  // 9.1 控制收入支出的状态
  // pay-支出，income-收入
  const [billType, setBillType] = useState("pay");

  /* ---------------------- 10.保存账单功能 --------------------- */
  // 10.1 收集money
  const [money, setMoney] = useState(0);
  // 10.2 使用受控组件，收集money数据
  const changeMoney = (value) => {
    setMoney(value);
  };
  // 10.3  收集账单类型
  const [useFor, setUseFor] = useState("");
  // 10.6 使用useDispatch钩子调用异步方法
  const dispatch = useDispatch();

  // 10.5 收集表单数据
  const saveBill = () => {
    const data = {
      type: billType,
      money: billType === "pay" ? -money : +money,
      // 11.7 收集选择的时间
      date: date,
      useFor: useFor,
    };
    console.log(data);
    // 10.7 提交异步方法，保存账单
    dispatch(addBillList(data));
  };

  /* --------------------- 11. 完善新增账单 --------------------- */
  // 11.2 控制时间选择器的显示隐藏
  const [dateVisible, setDateVisible] = useState(false);
  //  11.5 存储选择的时间
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  // 11.6 点击确定时的回调
  const onConfirm = (value) => {
    console.log(value);
    setDate(dayjs(value).format("YYYY-MM-DD"));
    setDateVisible(false);
  };

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
              <span
                className="text" // 11.3 点击时控制显示和隐藏
                onClick={() => setDateVisible(true)}
              >
                {dayjs(date).format("YYYY-MM-DD")}
              </span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={onConfirm}
                onCancel={() => setDateVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                // 10.2 使用受控组件，收集money数据
                value={money}
                onChange={changeMoney}
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
                    // 11.1 点击激活 selected
                    <div
                      className={classNames(
                        "item",
                        useFor === item.type ? "selected" : ""
                      )}
                      key={item.type}
                      // 10.4  点击图标，收集账单类型
                      onClick={() => setUseFor(item.type)}
                    >
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
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
