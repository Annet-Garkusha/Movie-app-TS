import { Alert } from "antd";

export const Error: React.FC = (): JSX.Element => (
  <>
    <Alert
      message="Error"
      description="The server is not responding, but we will fix it soon..."
      type="error"
      showIcon
    />
  </>
);

export default Error;
