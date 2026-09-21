import { FC, useState } from "react";

import { ClockCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { UxButton, UxModal } from "@components/UxComponents";
import { UxSelect } from "@components/UxFormComponents";
import { EVENT_TYPE_OPTIONS } from "@modules/training/training.constants";
import {
  EventTypeEnum,
  IEventDraftRow,
  IPlayerOption,
  ISparringEventRow,
  SparringSideEnum,
} from "@modules/training/training.types";

import styles from "../../SparringSegment.module.scss";

interface ISparringEventModalProps {
  segmentKey: string;
  side: SparringSideEnum | null;
  minute: number;
  formatted: string;
  sideLabel: string;
  playerOptions: IPlayerOption[];
  onAdd: (events: ISparringEventRow[]) => void;
  onClose: () => void;
}

const makeEmptyRow = (): IEventDraftRow => ({
  clientId: crypto.randomUUID(),
  user_id: null,
  event_type: undefined,
});

export const SparringEventModal: FC<ISparringEventModalProps> = ({
  segmentKey,
  side,
  minute,
  formatted,
  sideLabel,
  playerOptions,
  onAdd,
  onClose,
}) => {
  // Reset to a single empty row on each open: the parent remounts this via a
  // `key` on `side`, so initial state is always fresh.
  const open = side !== null;
  const [rows, setRows] = useState<IEventDraftRow[]>([makeEmptyRow()]);

  const updateRow = (clientId: string, patch: Partial<IEventDraftRow>) => {
    setRows((prev) =>
      prev.map((row) =>
        row.clientId === clientId ? { ...row, ...patch } : row,
      ),
    );
  };

  const removeRow = (clientId: string) => {
    setRows((prev) => prev.filter((row) => row.clientId !== clientId));
  };

  const addRow = () => {
    setRows((prev) => [...prev, makeEmptyRow()]);
  };

  const handleOk = () => {
    if (side === null) return;
    const events: ISparringEventRow[] = rows
      .filter((row): row is IEventDraftRow & { event_type: EventTypeEnum } =>
        Boolean(row.event_type),
      )
      .map((row) => ({
        clientId: crypto.randomUUID(),
        user_id: row.user_id ?? null,
        side,
        event_type: row.event_type,
        minute,
        note: null,
      }));

    if (events.length) onAdd(events);
    onClose();
  };

  return (
    <UxModal
      open={open}
      title={`Događaji — ${sideLabel}`}
      okText="Dodaj"
      cancelText="Otkaži"
      onOk={handleOk}
      onCancel={onClose}
      testId={`sparring-event-modal-${segmentKey}`}
    >
      <div className={styles.modalMinute}>
        <ClockCircleOutlined />
        <span>Vreme:</span>
        <span className={styles.modalMinuteValue}>{formatted}</span>
      </div>

      {rows.map((row) => (
        <div key={row.clientId} className={styles.modalRow}>
          <UxSelect
            placeholder="Igrač (opciono)"
            options={playerOptions}
            value={row.user_id ?? undefined}
            allowClear
            onChange={(value) => {
              updateRow(row.clientId, {
                user_id: (value as number | undefined) ?? null,
              });
            }}
            testId={`event-player-${row.clientId}`}
          />
          <UxSelect
            placeholder="Akcija"
            options={EVENT_TYPE_OPTIONS}
            value={row.event_type}
            onChange={(value) => {
              updateRow(row.clientId, { event_type: value as EventTypeEnum });
            }}
            testId={`event-action-${row.clientId}`}
          />
          <UxButton
            icon={<DeleteOutlined />}
            danger
            disabled={rows.length === 1}
            onClick={() => {
              removeRow(row.clientId);
            }}
            testId={`event-remove-${row.clientId}`}
          />
        </div>
      ))}

      <UxButton onClick={addRow} testId={`event-add-row-${segmentKey}`}>
        + Dodaj akciju
      </UxButton>
    </UxModal>
  );
};
