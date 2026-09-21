import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { SeasonForm } from "@components/PagesComponents/Season/SeasonForm/SeasonForm";
import { UxButton, UxCard } from "@components/UxComponents";
import { seasonStore } from "@modules/season/season.store";
import { IGetSeason } from "@modules/season/season.types";

interface IGeneralSeasonTabProps {
  season: IGetSeason;
}

const toFormDate = (value?: string | null) =>
  value ? (dayjs(value) as unknown as string) : "";

export const GeneralSeasonTab: FC<IGeneralSeasonTabProps> = observer(
  ({ season }) => {
    const [form] = useForm<IGetSeason>();

    const onFinish = (values: IGetSeason) => {
      void seasonStore.updateSeason(season.id, values);
    };

    useEffect(() => {
      if (!season.id) return;
      form.setFieldsValue({
        ...season,
        start_date: toFormDate(season.start_date),
        end_date: toFormDate(season.end_date),
      });
    }, [season]);

    return (
      <>
        <UxCard className="p-20" testId={"season"}>
          <SeasonForm form={form} onFinish={onFinish} />
        </UxCard>
        <Flex justify="end" className="mt-10">
          <UxButton
            type="primary"
            onClick={() => {
              form.submit();
            }}
            testId="submit-edit-season"
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </>
    );
  },
);
