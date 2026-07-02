import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { TournamentForm } from "@components/PagesComponents/Tournament/TournamentForm/TournamentForm";
import { UxButton } from "@components/UxComponents";
import { UxBaseModal } from "@components/UxComponents/UxBaseModal/UxBaseModal";
import { TOURNAMENT_INITIAL_STATE } from "@modules/tournament/tournament.constants";
import { tournamentStore } from "@modules/tournament/tournament.store";
import { IPostTournament } from "@modules/tournament/tournament.types";
import { ModalTypeEnum } from "@stores";

export const AddTournamentModal = observer(() => {
  const [tournamentForm] = useForm();

  const onFinish = (tournament: IPostTournament) => {
    void tournamentStore.createTournament(tournament);
  };

  return (
    <UxBaseModal
      name={ModalTypeEnum.TOURNAMENT_MODAL}
      title={"Dodaj turnir"}
      onCancel={() => {
        tournamentStore.handleChange("tournament", TOURNAMENT_INITIAL_STATE);
      }}
    >
      <TournamentForm form={tournamentForm} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            tournamentForm.submit();
          }}
          testId="submit-tournament"
        >
          Sačuvaj
        </UxButton>
      </Flex>
    </UxBaseModal>
  );
});
