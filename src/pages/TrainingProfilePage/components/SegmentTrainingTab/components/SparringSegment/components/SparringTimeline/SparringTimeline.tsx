import { FC } from "react";

import { CloseOutlined } from "@ant-design/icons";
import { EVENT_TYPE_LABEL_MAP } from "@modules/training/training.constants";
import {
  EventTypeEnum,
  ISparringEventRow,
  SparringSideEnum,
} from "@modules/training/training.types";

import styles from "../../SparringSegment.module.scss";

interface ISparringTimelineProps {
  events: ISparringEventRow[];
  resolvePlayerName: (userId?: number | null) => string;
  onRemove: (clientId: string) => void;
}

const EVENT_ICON_MAP: Record<EventTypeEnum, string> = {
  [EventTypeEnum.GOAL]: "⚽",
  [EventTypeEnum.ASSIST]: "🅰️",
  [EventTypeEnum.SAVE]: "🧤",
  [EventTypeEnum.EXCLUSION]: "🟥",
  [EventTypeEnum.PENALTY]: "🎯",
};

export const SparringTimeline: FC<ISparringTimelineProps> = ({
  events,
  resolvePlayerName,
  onRemove,
}) => {
  if (!events.length) {
    return (
      <div className={styles.timeline}>
        <div className={styles.timelineEmpty}>
          Još nema događaja — započni sparing i dodaj prvu akciju.
        </div>
      </div>
    );
  }

  // Most recent minute first (live-feed feel); stable within the same minute.
  const sorted = [...events].sort(
    (a, b) => (b.minute ?? 0) - (a.minute ?? 0),
  );

  return (
    <div className={styles.timeline}>
      {sorted.map((event) => {
        const isHome = event.side === SparringSideEnum.HOME;
        const isGoal = event.event_type === EventTypeEnum.GOAL;
        const sideClass = isHome
          ? styles.timelineSideHome
          : styles.timelineSideAway;

        return (
          <div key={event.clientId} className={styles.timelineRow}>
            <div
              className={`${styles.timelineSide} ${sideClass} ${
                isGoal ? styles.timelineGoal : ""
              }`}
            >
              <span className={styles.eventIcon}>
                {EVENT_ICON_MAP[event.event_type]}
              </span>
              <div className={styles.eventMeta}>
                <span className={styles.eventPlayer}>
                  {resolvePlayerName(event.user_id)}
                </span>
                <span className={styles.eventType}>
                  {EVENT_TYPE_LABEL_MAP[event.event_type]}
                </span>
              </div>
              <button
                type="button"
                className={styles.removeEvent}
                onClick={() => {
                  onRemove(event.clientId);
                }}
                data-testid={`timeline-remove-${event.clientId}`}
              >
                <CloseOutlined />
              </button>
            </div>

            <span className={styles.minuteChip}>{event.minute ?? 0}&apos;</span>
          </div>
        );
      })}
    </div>
  );
};
