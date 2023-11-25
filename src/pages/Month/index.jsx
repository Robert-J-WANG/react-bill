import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import classNames from "classnames";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

const Month = () => {
  /* ------------------- 1. 时间弹窗的打开和关闭功能 ------------------ */
  // 控制时间弹窗的打开和关闭
  const [dateVisible, setDateVisible] = useState(false);

  /* -------------------- 2.所选时间的回显及格式化 ------------------- */
  // 显示时间的变量
  const [currentDate, setCurrentDate] = useState(
    dayjs(new Date()).format("YYYY-MM") //初始化时间为当前时间,并进行格式化
  );

  // 点击确认的回调
  const onComfirm = (date) => {
    // 关闭时间弹窗
    setDateVisible(false);
    // 设置所选时间
    console.log(date);
    // 格式化时间弹框里的时间，并设置为所选时间
    const formatDate = dayjs(date).format("YYYY-MM");
    setCurrentDate(formatDate);
  };
  /* ---------------------- 3.数据按月分组 ---------------------- */
  //3.1 从redux中拿到数据
  const billList = useSelector((state) => state.bill.billList);
  // 3.2 数据的二次处理，使用useMemo钩子
  const monthGroup = useMemo(() => {
    // return 出去处理后的数据
    //3.3 按月分组 - 分组方法使用lodash库，并对时间进行格式化
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log(monthGroup);
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
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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
      </div>
    </div>
  );
};

export default Month;
