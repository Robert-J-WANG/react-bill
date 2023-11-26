// 8.2 根据type的值，动态渲染icon图标
const Icon = ({ type }) => {
  return (
    <img
      src={`https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/${type}.svg`}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }}
    />
  );
};

export default Icon;
