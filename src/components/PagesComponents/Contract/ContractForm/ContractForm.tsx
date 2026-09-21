import { FC, useEffect } from "react";

import { Col, Form, FormInstance, Row, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import {
  UxFormDatePicker,
  UxFormInputNumber,
  UxFormScrollSelect,
  UxFormSelect,
} from "@components/UxFormComponents";
import { authStore } from "@modules/auth/auth.store";
import {
  CONTRACT_INITIAL_STATE,
  CONTRACT_INSTALLMENT_ITEM_INITIAL_STATE,
  CONTRACT_STATUS_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
} from "@modules/contract/contract.constants";
import {
  ContractStatusEnum,
  ContractTypeEnum,
  IGetContract,
} from "@modules/contract/contract.types";
import { IGetMembership } from "@modules/membership/membership.types";
import { sifarniciStore } from "@modules/sifarnici";
import { SifarniciTypeEnum } from "@modules/sifarnici/sifarnici.types";
import {
  computeContractStatus,
  splitMembershipIntoInstallments,
  sumInstallments,
} from "@utils/contractHelpers";
import { REQUIRED_FIELD_RULE } from "@utils/formRules";

import { ContractInstallmentsList } from "./ContractInstallmentsList";

const MEMBERSHIP_STORE_KEY = "contract_membership";

interface IContractFormProps {
  form: FormInstance<IGetContract>;
  readOnly?: boolean;
  /** True when editing an existing contract — locks the non-updatable fields. */
  isEdit?: boolean;
  onFinish: (payload: IGetContract) => void;
}

export const ContractForm: FC<IContractFormProps> = observer(
  ({ form, readOnly, isEdit, onFinish }) => {
    const contractType = Form.useWatch("contract_type", form);
    const installments = Form.useWatch("installments_list", form);
    const startDate = Form.useWatch("start_date", form);
    const endDate = Form.useWatch("end_date", form);

    const isMembership = contractType === ContractTypeEnum.MEMBERSHIP;
    // Create: MEMBERSHIP edits its schedule (STAFF gets it from the salary
    // job). Edit: the saved schedule is always shown read-only, for both types
    // — single installments are edited elsewhere.
    const showInstallments = Boolean(isEdit) || isMembership;

    /**
     * MEMBERSHIP on create: the rows are the source of truth — the amount is
     * their sum and the term runs from the first row's start to the last row's
     * end. On edit the schedule is fixed, so the saved values stand.
     */
    useEffect(() => {
      if (isEdit || !isMembership) return;
      const rows = installments ?? [];
      form.setFieldsValue({
        amount: sumInstallments(rows),
        start_date: rows[0]?.period_start ?? "",
        end_date: rows[rows.length - 1]?.period_end ?? null,
      });
    }, [form, installments, isMembership, isEdit]);

    // Status always follows the term's dates (a cancelled contract stays so).
    useEffect(() => {
      const currentStatus = form.getFieldValue("status") as
        | ContractStatusEnum
        | undefined;
      form.setFieldValue(
        "status",
        computeContractStatus(
          startDate as Dayjs | string | null,
          endDate as Dayjs | string | null,
          currentStatus,
        ),
      );
    }, [form, startDate, endDate]);

    /**
     * The catalog plan seeds the schedule, but every row stays editable — a
     * contract can be signed off a plan at a discount (siblings, scholarships)
     * without the catalog row itself changing.
     */
    const onMembershipChange: SelectProps["onChange"] = (_value, option) => {
      const membership = (option as DefaultOptionType | undefined)?.item as
        | IGetMembership
        | undefined;
      if (!membership) return;

      // An empty first row carries "" — fall back to the current month.
      const firstPeriodStart = installments?.[0]?.period_start;
      const rows = splitMembershipIntoInstallments({
        startMonth: dayjs(firstPeriodStart).isValid() ? firstPeriodStart : dayjs(),
        monthsCount: membership.months_count,
        installmentsCount: membership.installments_count,
        total: membership.price_total,
      }).map((row) => ({
        ...row,
        period_start: dayjs(row.period_start) as unknown as string,
        period_end: dayjs(row.period_end) as unknown as string,
        due_date: dayjs(row.due_date) as unknown as string,
      }));
      form.setFieldValue("installments_list", rows);
    };

    /**
     * A membership means nothing on a STAFF contract, and the options already
     * loaded are the wrong catalog — clear both when the type flips, along
     * with any schedule entered for the old type.
     */
    const onContractTypeChange = () => {
      form.setFieldsValue({
        membership_id: null,
        membership: null,
        installments_list: [CONTRACT_INSTALLMENT_ITEM_INITIAL_STATE],
        amount: null,
        start_date: "",
        end_date: null,
      });
      sifarniciStore.resetSifarnikByKey(MEMBERSHIP_STORE_KEY);
    };

    return (
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={CONTRACT_INITIAL_STATE}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={6}>
            <UxFormSelect
              formName="contract_type"
              label="Tip ugovora"
              testId="contract-type"
              options={CONTRACT_TYPE_OPTIONS}
              rules={[REQUIRED_FIELD_RULE(true)]}
              // Fixes the payment direction — not updatable. Changing it means
              // cancelling and re-signing.
              disabled={readOnly ?? isEdit}
              onChange={onContractTypeChange}
            />
          </Col>
          <Col span={12}>
            <UxFormScrollSelect
              storeKey="contract_user"
              formName="user_id"
              objName="user"
              sifarnikName={SifarniciTypeEnum.USER}
              label="Korisnik"
              testId="contract-user"
              filtersForGet={{
                company_id: authStore.getAuthUser.company_id,
              }}
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly ?? isEdit}
            />
          </Col>
          <Col span={6}>
            <UxFormDatePicker
              formName="signed_at"
              label="Datum potpisa"
              testId="contract-signed-at"
              readOnly={readOnly}
              format="DD-MM-YYYY"
            />
          </Col>

          {isMembership ? (
            <Col span={24}>
              <UxFormScrollSelect
                storeKey={MEMBERSHIP_STORE_KEY}
                formName="membership_id"
                objName="membership"
                sifarnikName={SifarniciTypeEnum.MEMBERSHIP}
                label="Članarina"
                testId="contract-membership"
                filtersForGet={{
                  company_id: authStore.getAuthUser.company_id,
                  // Retired plans are not for sale.
                  is_active: true,
                }}
                rules={[REQUIRED_FIELD_RULE(true)]}
                readOnly={readOnly ?? isEdit}
                onChange={onMembershipChange}
              />
            </Col>
          ) : null}

          <Col span={6}>
            <UxFormInputNumber
              formName="amount"
              // The MEMBERSHIP amount is the total for the whole term — the sum
              // of its installments. STAFF is the monthly salary.
              label={isMembership ? "Ukupna cena" : "Iznos"}
              testId="contract-amount"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              disabled={isMembership}
            />
          </Col>
          <Col span={6}>
            <UxFormDatePicker
              formName="start_date"
              label={"Početak"}
              testId="contract-start-date"
              rules={[REQUIRED_FIELD_RULE(true)]}
              readOnly={readOnly}
              // MEMBERSHIP: taken from the first installment. Never updatable.
              disabled={isMembership || isEdit}
              format="DD-MM-YYYY"
            />
          </Col>
          <Col span={6}>
            <UxFormDatePicker
              formName="end_date"
              label={"Kraj"}
              testId="contract-end-date"
              readOnly={readOnly}
              // MEMBERSHIP: taken from the last installment.
              disabled={isMembership}
              format="DD-MM-YYYY"
            />
          </Col>
          <Col span={6}>
            <UxFormSelect
              formName="status"
              label="Status"
              testId="contract-status"
              options={CONTRACT_STATUS_OPTIONS}
              // Derived from the dates — see computeContractStatus.
              disabled
            />
          </Col>

          {showInstallments ? (
            <Col span={24}>
              <ContractInstallmentsList readOnly={readOnly ?? isEdit} />
            </Col>
          ) : null}
        </Row>
      </Form>
    );
  },
);
