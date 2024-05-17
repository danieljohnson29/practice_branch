import { Button, FormInstance } from "antd";
import React from "react";
import { Form } from "antd";

interface SubmitButtonProps {
  form: FormInstance;
  handleOk: any;
}
export const SubmitButton: React.FC<
  React.PropsWithChildren<SubmitButtonProps>
> = ({ form, children, handleOk }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      onClick={handleOk}
    >
      {children}
    </Button>
  );
};
