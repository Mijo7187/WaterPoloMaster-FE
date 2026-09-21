import { FC } from "react";

import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { UrlFilters } from "@components/UrlComponents";
import {
  PAYABLE_TYPE_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
} from "@modules/payment/payment.constants";
import { paymentStore } from "@modules/payment/payment.store";
import {
  FilterConfig,
  FilterGroupsEnum,
  FilterTypeEnum,
  IFiltersComponentProps,
  PaginationEnum,
} from "@stores";

export const PaymentFilters: FC<IFiltersComponentProps> = observer(
  ({ handleFiltersChange, hiddenFields }) => {
    const [form] = useForm();

    const optionsFilters: FilterConfig[] = [
      {
        type: FilterTypeEnum.SELECT,
        formName: "status",
        label: "Status",
        placeholder: "Svi statusi",
        options: PAYMENT_STATUS_OPTIONS,
        testId: "payment-status",
        colSpan: 6,
      },
      {
        type: FilterTypeEnum.SELECT,
        formName: "payable_type",
        label: "Tip plaćanja",
        placeholder: "Svi tipovi",
        options: PAYABLE_TYPE_OPTIONS,
        testId: "payment-payable-type",
        colSpan: 6,
      },
    ];

    return (
      <UrlFilters
        testId="payment"
        form={form}
        filterOptions={optionsFilters}
        hiddenFields={hiddenFields}
        filterName={FilterGroupsEnum.PAYMENT}
        paginationName={PaginationEnum.PAYMENT_PAGINATION}
        handleFiltersChange={
          handleFiltersChange ??
          (() => {
            void paymentStore.getPaymentList();
          })
        }
      />
    );
  },
);
