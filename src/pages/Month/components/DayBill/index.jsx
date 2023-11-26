import classNames from "classnames";
import "./index.scss";
import { useMemo, useState } from "react";
import { billTypeToName } from "@/contants";
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

  /* ----------------- 7.箭头的翻转，详情列表的显示和隐藏 ----------------- */
  // 7.1 状态变量控制显隐和箭头翻转
  const [visible, setVisible] = useState(false);

  return (
    <div className={classNames("dailyBill")}>
      {/* 单日列表统计区 */}
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span
            // 7.3 visible值控制箭头的翻转
            className={classNames("arrow", visible && "expand")}
            // 7.2 点击箭头，visible值取反
            onClick={() => setVisible(!visible)}
          ></span>
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
      {/* 单日列表详细显示区 */}
      {/* 7.4 visible的值控制单日列表详细显示区的显示和隐藏 */}
      {visible && (
        <div className="billList">
          {dailyBillList.map((item) => {
            return (
              <div className="bill" key={item.id}>
                {/* 图标 */}
                <div className="detail">
                  {/* billTypeToName-用于中英文名字的适配： */}
                  {/* billTypeToName[英文]=>中文 */}
                  <div className="billType">{billTypeToName[item.useFor]}</div>
                </div>
                <div className={classNames("money", item.type)}>
                  {item.money.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default DailyBill;
