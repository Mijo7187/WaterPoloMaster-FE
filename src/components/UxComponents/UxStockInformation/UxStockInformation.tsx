import {
  CodeSandboxOutlined,
  EuroCircleOutlined,
  LockOutlined
} from "@ant-design/icons";
import { Col, Flex, Row } from "antd";
import { MyCard } from "components/Cards/MyCard/MyCard";
import { observer } from "mobx-react-lite";
import { FC } from "react";

interface IUxStockInformationProps {
  stockAmount: number | string;
  reservedAmount: number | string;
  incomeAmount: number | string;
}

export interface StockOptions {
  icon: React.ReactNode;
  label: string;
  description: string;
  amount: string | number | React.ReactNode;
}

export const UxStockInformation: FC<IUxStockInformationProps> = observer(
  ({ stockAmount, reservedAmount, incomeAmount }) => {
    const STOCK_INFO_OPTIONS: StockOptions[] = [
      {
        icon: (
          <CodeSandboxOutlined style={{ fontSize: 20, fontWeight: "bold" }} />
        ),
        label: "Stock",
        description: "units avaliable",
        amount: stockAmount ?? 0
      },
      {
        icon: <LockOutlined style={{ fontSize: 20, fontWeight: "bold" }} />,
        label: "Reserved stock",
        description: "units pending",
        amount: reservedAmount ?? 0
      },
      {
        icon: (
          <EuroCircleOutlined style={{ fontSize: 20, fontWeight: "bold" }} />
        ),
        label: "Income amount",
        description: "this month",
        amount: `${incomeAmount ?? 0} €`
      }
    ];

    return (
      <Flex
        className="w-100"
        justify={"space-around"}
        gap={16}
        align={"middle"}
      >
        {STOCK_INFO_OPTIONS.map((item: StockOptions, index: number) => {
          return (
            <MyCard cardColor="glassLight" cardClass="w-100" key={index}>
              <Row align="middle" gutter={10}>
                <Col span={24}>
                  <Flex
                    // justify="space-between"
                    align="center"
                    gap={10}
                    className="w-100"
                  >
                    <strong>{item.icon}</strong>
                    <label>
                      <strong>{item.label}</strong>
                    </label>
                  </Flex>
                </Col>
                <Col span={24} style={{ fontWeight: "bold", fontSize: "24px" }}>
                  {item.amount}
                </Col>
                <Col span={24}>
                  <p>{item.description}</p>
                </Col>
              </Row>
            </MyCard>
          );
        })}
      </Flex>
    );
  }
);
