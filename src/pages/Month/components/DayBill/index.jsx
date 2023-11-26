import classNames from "classnames";
import "./index.scss";
import { useMemo } from "react";
// 6.4 接收dailyBill数据并渲染
const DailyBill = ({ date, dailyBillList }) => {
  // console.log(dailyBillList);
  // 6.5 统计计算dailyBillList数据
  // 支出 / 收入 / 结余
  const dailyResult = useMemo(() => {
    // return出去二次计算后的数据
    // 支出 / 收入 / 结余
    const pay = dailyBillList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = dailyBillList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [dailyBillList]);

  return (
    <div className={classNames("dailyBill")}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span className={classNames("arrow")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dailyResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dailyResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dailyResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyBill;
