import { FC } from "react";

import { observer } from "mobx-react-lite";
import { UxCard } from "@components/UxComponents";
import {
  IGetSparringSegment,
  IGetTraining,
} from "@modules/training/training.types";

import { SparringSegmentHeader } from "./components/SparringHeader/SparringHeader";
import { SparringScoreboard } from "./components/SparringScoreboard/SparringScoreboard";
import { useStopwatch } from "./useStopwatch";

// export const SparringSegment: FC<ISparringSegmentProps> = observer(
//   ({ training, segment }) => {
//     const [form] = useForm();
//     const segmentKey = `${segment.id ?? "new"}`;
//     const stopwatch = useStopwatch(segment.duration_minutes);

//     const [events, setEvents] = useState<ISparringEventRow[]>([]);
//     const [modalSide, setModalSide] = useState<SparringSideEnum | null>(null);

//     const homeStoreKey = `home-company-${segmentKey}`;
//     const awayStoreKey = `away-company-${segmentKey}`;

//     const homeCompanyId = Form.useWatch("home_company_id", form);
//     const awayCompanyId = Form.useWatch("away_company_id", form);

//     useEffect(() => {
//       void trainingStore.getTrainingUsersList();
//     }, [training.id]);

//     useEffect(() => {
//       if (!segment?.sparring) return;
//       form.setFieldsValue({
//         home_company_id: segment.sparring.home_company_id,
//         away_company_id: segment.sparring.away_company_id,
//         sparring_notes: segment.sparring.notes,
//         participants: segment.sparring.participants.map((participant) => ({
//           user_id: participant.user_id,
//           side: participant.side,
//         })),
//       });
//       setEvents(
//         segment.sparring.events.map((event) => ({
//           clientId: crypto.randomUUID(),
//           user_id: event.user_id,
//           side: event.side ?? SparringSideEnum.HOME,
//           event_type: event.event_type,
//           minute: event.minute,
//           note: event.note,
//         })),
//       );
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [segment]);

//     const playerOptions: IPlayerOption[] =
//       trainingStore.getterTrainingUsersList.map((item) => ({
//         label: `${item.user.first_name} ${item.user.last_name}`,
//         value: item.user_id,
//       }));

//     const playerNameById = new Map(
//       playerOptions.map((option) => [option.value, option.label]),
//     );

//     const resolvePlayerName = (userId?: number | null): string =>
//       userId == null ? "Protivnik" : (playerNameById.get(userId) ?? "Igrač");

//     const resolveTeamName = (
//       storeKey: string,
//       id?: number | null,
//     ): string | null => {
//       if (id == null) return null;
//       const items = sifarniciStore.getSifarnikByKey(storeKey)?.items ?? [];
//       const found = items.find((item) => item.value === id);
//       return found && typeof found.label === "string" ? found.label : null;
//     };

//     // Players tagged for a side in the lineup; falls back to everyone if empty.
//     const getSideOptions = (side: SparringSideEnum): IPlayerOption[] => {
//       const participants = form.getFieldValue("participants") as
//         | ISparringFormValues["participants"]
//         | undefined;
//       const sideUserIds = (participants ?? [])
//         .filter((row) => row.side === side && row.user_id != null)
//         .map((row) => row.user_id);
//       if (!sideUserIds.length) return playerOptions;
//       return playerOptions.filter((option) =>
//         sideUserIds.includes(option.value),
//       );
//     };

//     const addEvents = (newEvents: ISparringEventRow[]) => {
//       setEvents((prev) => [...prev, ...newEvents]);
//     };

//     const removeEvent = (clientId: string) => {
//       setEvents((prev) => prev.filter((event) => event.clientId !== clientId));
//     };

//     const onFinish = (values: ISparringFormValues) => {
//       const participants: ISparringParticipantInput[] = (
//         values.participants ?? []
//       )
//         .map((row): ISparringParticipantInput | null => {
//           if (row.user_id == null || row.side == null) return null;
//           return { user_id: row.user_id, side: row.side };
//         })
//         .filter((row): row is ISparringParticipantInput => row !== null);

//       const eventsInput: ISparringEventInput[] = events.map((event) => ({
//         user_id: event.user_id ?? null,
//         side: event.side,
//         event_type: event.event_type,
//         minute: event.minute ?? null,
//         note: event.note ?? null,
//       }));

//       const sparring = {
//         home_company_id: values.home_company_id ?? null,
//         away_company_id: values.away_company_id ?? null,
//         notes: values.sparring_notes ?? null,
//         participants,
//         events: eventsInput,
//       };

//       const duration_minutes = stopwatch.hasStarted
//         ? Math.ceil(stopwatch.elapsedSeconds / 60)
//         : null;

//       if (segment) {
//         const payload: ITrainingSegmentUpdate = {
//           duration_minutes,
//           notes: values.notes ?? null,
//           sparring,
//         };
//         void trainingStore.updateSegment(segment.id, training.id, payload);
//         return;
//       }

//       const payload: IPostSparringSegment = {
//         training_id: training.id,
//         segment_type: TrainingSegmentEnum.SPARRING,
//         duration_minutes,
//         notes: values.notes ?? null,
//         sparring,
//       };
//       void trainingStore.createSegment(payload).then(() => onSaved?.());
//     };

//     const homeName = resolveTeamName(homeStoreKey, homeCompanyId) ?? "Domaćin";
//     const awayName = resolveTeamName(awayStoreKey, awayCompanyId) ?? "Gost";

//     return (
//       <Form form={form} onFinish={onFinish} layout="vertical">
//         <SparringScoreboard
//           segmentKey={segmentKey}
//           homeName={homeName}
//           awayName={awayName}
//           homeGoals={goalsForSide(SparringSideEnum.HOME)}
//           awayGoals={goalsForSide(SparringSideEnum.AWAY)}
//           formatted={stopwatch.formatted}
//           isRunning={stopwatch.isRunning}
//           hasStarted={stopwatch.hasStarted}
//           onStart={stopwatch.start}
//           onPause={stopwatch.pause}
//           onResume={stopwatch.resume}
//           onReset={stopwatch.reset}
//           onOpenModal={setModalSide}
//         />

//         <SparringTimeline
//           events={events}
//           resolvePlayerName={resolvePlayerName}
//           onRemove={removeEvent}
//         />

//         <SparringLineup segmentKey={segmentKey} playerOptions={playerOptions} />

//         <SparringEventModal
//           key={modalSide ?? "closed"}
//           segmentKey={segmentKey}
//           side={modalSide}
//           minute={stopwatch.minute}
//           formatted={stopwatch.formatted}
//           sideLabel={modalSide ? SPARRING_SIDE_LABEL_MAP[modalSide] : ""}
//           playerOptions={modalSide ? getSideOptions(modalSide) : []}
//           onAdd={addEvents}
//           onClose={() => {
//             setModalSide(null);
//           }}
//         />
//       </Form>
//     );
//   },
// );

interface ISparringSegmentProps {
  training: IGetTraining;
  segment: IGetSparringSegment;
}

const SparringSegment: FC<ISparringSegmentProps> = ({ segment }) => {
  const stopwatch = useStopwatch();

  return (
    <>
      <SparringScoreboard segment={segment} stopwatch={stopwatch} />
    </>
  );
};

export const SparringSegmentCard: FC<ISparringSegmentProps> = observer(
  ({ training, segment }) => {
    return (
      <UxCard className="p-0 mt-10" testId={`segment-card-${segment.id}`}>
        <SparringSegmentHeader training={training} segment={segment} />
        <SparringSegment training={training} segment={segment} />
      </UxCard>
    );
    // return <SparringSegment training={training} segment={segment} />;
  },
);
