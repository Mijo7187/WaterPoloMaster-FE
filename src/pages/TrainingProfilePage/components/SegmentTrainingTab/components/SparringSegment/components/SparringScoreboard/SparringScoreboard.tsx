import { FC } from "react";

import {
  PauseOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { UxButton, UxPopconfirm } from "@components/UxComponents";
import { trainingService } from "@modules/training";
import {
  IGetSparringSegment,
  SparringSideEnum,
} from "@modules/training/training.types";

import type { IUseStopwatch } from "../../useStopwatch";

import styles from "../../SparringSegment.module.scss";

interface ISparringScoreboardProps {
  segment: IGetSparringSegment;
  stopwatch: IUseStopwatch;
  onOpenModal?: (side: SparringSideEnum) => void;
}

export const SparringScoreboard: FC<ISparringScoreboardProps> = ({
  segment,
  stopwatch,
  onOpenModal,
}) => {
  const segmentKey = String(segment.id);
  const {
    formatted,
    isRunning,
    hasStarted,
    start: onStart,
    pause: onPause,
    resume: onResume,
    reset: onReset,
  } = stopwatch;

  const homeGoals = trainingService.goalsForSide(
    SparringSideEnum.HOME,
    segment.events ?? [],
  );
  const awayGoals = trainingService.goalsForSide(
    SparringSideEnum.AWAY,
    segment.events ?? [],
  );

  const homeName = segment.home_company?.name ?? "";
  const awayName = segment.away_company?.name ?? "";

  return (
    <div className={styles.board}>
      <div className={styles.liveRow}>
        <span className={styles.liveDot} />
        <span className={styles.liveLabel}>
          {isRunning ? "UŽIVO" : "SPARING"}
        </span>
      </div>

      <div className={styles.scoreRow}>
        <div className={`${styles.team} ${styles.teamHome}`}>
          <span className={styles.teamBadge}>Domaćin</span>
          <div>{homeName}</div>
        </div>

        <div className={styles.center}>
          <div className={styles.score}>
            {homeGoals}
            <span className={styles.scoreSep}>:</span>
            {awayGoals}
          </div>
          <div
            className={`${styles.timer} ${hasStarted ? "" : styles.timerIdle}`}
          >
            {formatted}
          </div>
        </div>

        <div className={`${styles.team} ${styles.teamAway}`}>
          <span className={styles.teamBadge}>Gost</span>
          <div>{awayName}</div>
        </div>
      </div>

      <div className={styles.controls}>
        {!hasStarted ? (
          <UxButton
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={onStart}
            testId={`sparring-start-${segmentKey}`}
          >
            Započni sparing
          </UxButton>
        ) : isRunning ? (
          <UxButton
            icon={<PauseOutlined />}
            onClick={onPause}
            testId={`sparring-pause-${segmentKey}`}
          >
            Pauza
          </UxButton>
        ) : (
          <UxButton
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={onResume}
            testId={`sparring-resume-${segmentKey}`}
          >
            Nastavi
          </UxButton>
        )}

        <UxPopconfirm
          title="Resetuj vreme"
          description="Da li ste sigurni?"
          onConfirm={onReset}
          testId={`sparring-reset-${segmentKey}`}
        >
          <UxButton
            danger
            icon={<RedoOutlined />}
            disabled={!hasStarted}
            testId={`sparring-reset-${segmentKey}`}
          >
            Resetuj vreme
          </UxButton>
        </UxPopconfirm>
      </div>

      <div className={styles.eventButtons}>
        <button
          type="button"
          className={`${styles.eventBtn} ${styles.eventBtnHome}`}
          disabled={!hasStarted}
          onClick={() => {
            onOpenModal?.(SparringSideEnum.HOME);
          }}
          data-testid={`sparring-home-event-${segmentKey}`}
        >
          <PlusOutlined />
          Događaj — Domaćin
        </button>
        <button
          type="button"
          className={`${styles.eventBtn} ${styles.eventBtnAway}`}
          disabled={!hasStarted}
          onClick={() => {
            onOpenModal?.(SparringSideEnum.AWAY);
          }}
          data-testid={`sparring-away-event-${segmentKey}`}
        >
          <PlusOutlined />
          Događaj — Gost
        </button>
      </div>
    </div>
  );
};
