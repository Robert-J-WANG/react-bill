import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import { closeFnSet } from "antd-mobile/es/components/dialog/show";
import DailyBill from "./components/DayBill";

const Month = () => {
  /* ------------------- 1. 时间弹窗的打开和关闭功能 ------------------ */
  // 1.1 控制时间弹窗的打开和关闭
  const [dateVisible, setDateVisible] = useState(false);

  /* -------------------- 2.所选时间的回显及格式化 ------------------- */
  // 2.1 显示时间的变量
  const [currentDate, setCurrentDate] = useState(
    dayjs().format("YYYY-MM") //初始化时间为当前时间,并进行格式化
    // ""
  );

  /* ---------------------- 3.数据按月分组 ---------------------- */
  // 3.1 从redux中拿到数据
  const billList = useSelector((state) => state.bill.billList);
  // 3.2 数据的二次处理，使用useMemo钩子
  const monthGroup = useMemo(() => {
    // return 出去处理后的数据
    //3.3 按月分组 - 分组方法使用lodash库，并对时间进行格式化
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  // console.log(monthGroup);

  /* ------------------- 4. 计算按月分组之后的数据 ------------------- */
  // 4.1 当前月份对应的数据数组
  const [currentMonthList, setCurrentMonthList] = useState([]);
  console.log(currentMonthList);
  // 4.3 对当前月份的数组数据二次计算
  const monthResult = useMemo(() => {
    // return出去二次计算后的数据
    // 支出 / 收入 / 结余
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [currentMonthList]);
  // 4.4 解构出计算结果用于组件中回显数据
  const { pay, income, total } = monthResult;
  console.log(monthResult);

  /* --------------- 5. 页面初始化时，就把当前月份账单显示出来 --------------- */
  // 5.1 页面初始化操作使用uesEffect钩子
  useEffect(() => {
    // 5.2 以当前时间作为key,去账单数组
    const nowDate = dayjs().format("YYYY-MM");
    // 5.3  设置当前时间
    setCurrentDate(nowDate);
    // 5.4 重新计算monthResult
    // 边界限定，防止undefined
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate]);
    }
  }, []);

  // 点击确认的回调
  const onComfirm = (date) => {
    // console.log(date)
    // 1.2 关闭时间弹窗
    setDateVisible(false);
    //  格式化时间弹框里的时间，
    const formatDate = dayjs(date).format("YYYY-MM");
    // 2.2 设置为所选时间
    setCurrentDate(formatDate);
    // 4.2 找到选择月份按月分组之后的对应的数组
    // 边界控制，以防monthGroup[formatDate]不存在（undefined），如果不存在，怎不更新currentMonthList，即为初始值-空数组
    // console.log(monthGroup[formatDate]);
    if (monthGroup[formatDate]) {
      setCurrentMonthList(monthGroup[formatDate]);
    } else {
      setCurrentMonthList([]);
    }
  };

  /* --------------------- 6. 单日统计列表功能 -------------------- */
  // 6.1 当前月按日期分组
  // 数据的二次处理，使用useMemo钩子
  const dayGroup = useMemo(() => {
    // return 出去处理后的数据
    //6.2 按日分组 - 分组方法使用lodash库，并对时间进行格式化
    const groupDate = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const dayKeys = Object.keys(groupDate);
    return { groupDate, dayKeys };
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {/* jsx不能渲染object对象，+‘’ 转化为字符串 */}
              {currentDate + ""}
              月账单
            </span>
            {/* 箭头朝上还是朝下？ */}
            {/* 思路：根据当前弹框打开的状态控制expand类名是否存在 */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          {/* 4.5 当前月份数据的回显 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onCancel={() => setDateVisible(false)} //点击取消按钮
            onConfirm={onComfirm} //点击确认按钮
            onClose={() => setDateVisible(false)} //点击蒙层
          />
        </div>
        {/* 单日列表统计 */}
        {/* 6.3 遍历日期列表 */}
        {dayGroup.dayKeys.map((key) => (
          <DailyBill
            key={key}
            date={key}
            dailyBillList={dayGroup.groupDate[key]}
          />
        ))}
      </div>
    </div>
  );
};

export default Month;
