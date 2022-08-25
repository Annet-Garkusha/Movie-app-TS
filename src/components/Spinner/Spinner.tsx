import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 34, color: "blue" }} spin />
);

const Spinner: React.FC = () => <Spin indicator={antIcon} />;

export default Spinner;
