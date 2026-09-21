import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { SeasonForm } from "@components/PagesComponents/Season/SeasonForm/SeasonForm";
import { UxButton } from "@components/UxComponents";
import { UxBaseModal } from "@components/UxComponents/UxBaseModal/UxBaseModal";
import { SEASON_INITIAL_STATE } from "@modules/season/season.constants";
import { seasonStore } from "@modules/season/season.store";
import { IGetSeason } from "@modules/season/season.types";
import { ModalTypeEnum } from "@stores";

export const AddSeasonModal = observer(() => {
  const [seasonForm] = useForm<IGetSeason>();

  const onFinish = (season: IGetSeason) => {
    void seasonStore.createSeason(season);
  };

  return (
    <UxBaseModal
      name={ModalTypeEnum.SEASON_MODAL}
      title={"Dodaj sezonu"}
      width={700}
      onCancel={() => {
        seasonStore.handleChange("season", SEASON_INITIAL_STATE);
        seasonForm.resetFields();
      }}
    >
      <SeasonForm form={seasonForm} onFinish={onFinish} />
      <Flex justify="end" className="mt-10">
        <UxButton
          type="primary"
          onClick={() => {
            seasonForm.submit();
          }}
          testId="submit-season"
        >
          Sačuvaj
        </UxButton>
      </Flex>
    </UxBaseModal>
  );
});
