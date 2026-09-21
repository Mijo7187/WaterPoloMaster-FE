import dayjs, { Dayjs } from "dayjs";
import {
  ContractStatusEnum,
  IContractInstallmentItem,
} from "@modules/contract/contract.types";

type DateInput = Dayjs | string | null | undefined;

const DATE_FORMAT = "YYYY-MM-DD";

const round2 = (value: number) => Math.round(value * 100) / 100;

/**
 * Status is derived from the term, day-level. "Today" counts as started (and
 * an end date of today is still running). A cancelled contract stays
 * cancelled — dates never revive it.
 */
export const computeContractStatus = (
  startDate: DateInput,
  endDate: DateInput,
  currentStatus?: ContractStatusEnum | null,
): ContractStatusEnum => {
  if (currentStatus === ContractStatusEnum.CANCELLED) {
    return ContractStatusEnum.CANCELLED;
  }
  const today = dayjs().startOf("day");
  if (!startDate || dayjs(startDate).startOf("day").isAfter(today)) {
    return ContractStatusEnum.DRAFT;
  }
  if (endDate && dayjs(endDate).startOf("day").isBefore(today)) {
    return ContractStatusEnum.ENDED;
  }
  return ContractStatusEnum.ACTIVE;
};

export const sumInstallments = (
  rows?: Pick<IContractInstallmentItem, "amount">[] | null,
): number =>
  round2((rows ?? []).reduce((sum, row) => sum + (row.amount ?? 0), 0));

interface ISplitMembershipParams {
  startMonth: DateInput;
  monthsCount: number;
  installmentsCount: number;
  total: number;
}

/**
 * Splits a catalog plan into its installment schedule: whole months per row,
 * leftover months and leftover cents both land on the last row so the total
 * always matches exactly.
 */
export const splitMembershipIntoInstallments = ({
  startMonth,
  monthsCount,
  installmentsCount,
  total,
}: ISplitMembershipParams): IContractInstallmentItem[] => {
  const count = Math.max(1, installmentsCount);
  const months = Math.max(1, monthsCount);
  const monthsPerRow = Math.max(1, Math.floor(months / count));
  const amountPerRow = Math.floor((total * 100) / count) / 100;

  let cursor = dayjs(startMonth ?? undefined).startOf("month");

  return Array.from({ length: count }, (_, index) => {
    const isLast = index === count - 1;
    const rowMonths = isLast
      ? Math.max(1, months - monthsPerRow * (count - 1))
      : monthsPerRow;
    const periodStart = cursor;
    const periodEnd = periodStart.add(rowMonths - 1, "month").endOf("month");
    cursor = periodEnd.add(1, "day").startOf("month");

    return {
      period_start: periodStart.format(DATE_FORMAT),
      period_end: periodEnd.format(DATE_FORMAT),
      due_date: periodStart.format(DATE_FORMAT),
      amount: isLast ? round2(total - amountPerRow * (count - 1)) : amountPerRow,
    };
  });
};
