const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-500 text-green-799 ";
      case "error":
        return "bg-red-500 text-red-799 ";
      default:
        return "bg-blue-100 text-blue-799";
    }
  };
  return <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>;
};
export default Message;
