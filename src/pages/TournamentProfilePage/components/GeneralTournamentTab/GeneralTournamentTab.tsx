import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { TournamentForm } from "@components/PagesComponents/Tournament/TournamentForm/TournamentForm";
import { UxButton, UxCard } from "@components/UxComponents";
import { UxDynamicScrollDiv } from "@components/UxComponents/UxDynamicScrollDiv/UxDynamicScrollDiv";
import { IGetTournament, tournamentStore } from "@modules/tournament";

interface IGeneralTournamentTabProps {
  tournament: IGetTournament;
}

export const GeneralTournamentTab: FC<IGeneralTournamentTabProps> = observer(
  ({ tournament }) => {
    const [form] = useForm<IGetTournament>();

    const onFinish = (values: IGetTournament) => {
      void tournamentStore.updateTournament(tournament.id, values);
      void tournamentStore.getTournamentsList();
    };

    useEffect(() => {
      if (!tournament.id) return;
      form.setFieldsValue({
        ...tournament,
        from_date: tournament.from_date
          ? (dayjs(tournament.from_date) as unknown as string)
          : "",
        to_date: tournament.to_date
          ? (dayjs(tournament.to_date) as unknown as string)
          : "",
      });
    }, [tournament]);

    return (
      <>
        <UxCard className="p-20" testId={"tournament"}>
          <UxDynamicScrollDiv
            wrapperId={"tournament-form"}
            idsToSubtract={[""]}
            extraMinus={380}
          >
            <TournamentForm form={form} onFinish={onFinish} />
          </UxDynamicScrollDiv>
        </UxCard>
        <Flex justify="end" className="mt-10">
          <UxButton
            type="primary"
            onClick={() => {
              form.submit();
            }}
            testId="submit-edit-tournament"
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </>
    );
  },
);
