import { CheckCircleOutlined } from "@ant-design/icons";

export default function Toast({ type, message }: any) {
  let iconSet: any = {
    success: {
      class: "bc-toast-success",
      icon: <CheckCircleOutlined />,
    },
    warning: {
      class: "bc-toast-warning",
      icon: <CheckCircleOutlined />,
    },
    info: {
      class: "bc-toast-info",
      icon: <CheckCircleOutlined />,
    },
    error: {
      class: "bc-toast-error",
      icon: <CheckCircleOutlined />,
    },
  };
  return (
    <div className={`bc-toast-message ${iconSet[type].class}`}>
      <span>{message}</span>
    </div>
  );
}
