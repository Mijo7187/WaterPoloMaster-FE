import { FC, useEffect } from "react";

import { Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react-lite";
import { QuarterForm } from "@components/PagesComponents/Quarter/QuarterForm/QuarterForm";
import { UxButton, UxCard } from "@components/UxComponents";
import { UxDynamicScrollDiv } from "@components/UxComponents/UxDynamicScrollDiv/UxDynamicScrollDiv";
import { IGetQuarter, quarterStore } from "@modules/quarter";

interface IGeneralQuarterTabProps {
  quarter: IGetQuarter;
}

export const GeneralQuarterTab: FC<IGeneralQuarterTabProps> = observer(
  ({ quarter }) => {
    const [form] = useForm<IGetQuarter>();

    const onFinish = (values: IGetQuarter) => {
      void quarterStore.updateQuarter(quarter.id, values);
      void quarterStore.getQuartersList();
    };

    useEffect(() => {
      if (!quarter.id) return;
      form.setFieldsValue({ ...quarter });
    }, [quarter]);

    return (
      <>
        <UxCard className="p-20" testId={"quarter"}>
          <UxDynamicScrollDiv
            wrapperId={"quarter-form"}
            idsToSubtract={[""]}
            extraMinus={380}
          >
            <QuarterForm form={form} onFinish={onFinish} />
          </UxDynamicScrollDiv>
        </UxCard>
        <Flex justify="end" className="mt-10">
          <UxButton
            type="primary"
            onClick={() => {
              form.submit();
            }}
            testId="submit-edit-quarter"
          >
            Sačuvaj
          </UxButton>
        </Flex>
      </>
    );
  },
);
