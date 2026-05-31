// import { Form } from 'antd';
// import { FormInstance, useForm } from 'antd/es/form/Form';
// import { FilterTableForm } from 'components/TableData/FilterTableForm/FilterTableForm';
// import { observer } from 'mobx-react-lite';
// import { paginationInitialState } from 'modules/nriz/nriz.constants';
// import { readOnlySifarnikTypes } from 'modules/sifarnici/sifarnici.constants';
// import { sifarniciService } from 'modules/sifarnici/sifarnici.service';
// import { sifarniciStore } from 'modules/sifarnici/sifarnici.store';
// import { ISifarniciFilters, ISifarniciFormData } from 'modules/sifarnici/sifarnici.types';
// import { IS_ACTIVE_SWITCH } from 'modules/sifarnici/sifarniciFormObj.constants';
// import React, { FC, useMemo } from 'react';
// import { FiltersNameEnum } from 'store/filteri.store';

// import { IFilterTableProps } from 'typescript/NrizTypes';

// interface ISifarniciFiltersProps {
//   filtersConfig: ISifarniciFormData;
// }

// export const SifarniciFilters: FC<ISifarniciFiltersProps> = observer(({ filtersConfig }) => {
//   const [sifarniciFilterForm] = useForm();

//   const components = useMemo(() => {
//     return filtersConfig;
//   }, [Form.useWatch([], sifarniciFilterForm), filtersConfig]) as ISifarniciFormData;

//   const fetchSifarniciList = () => {
//     return sifarniciStore.fetchSifarnikListTable(paginationInitialState);
//   };

//   const data = {
//     form: sifarniciFilterForm as FormInstance<ISifarniciFilters>,
//     filterOptions: sifarniciService.removeRules([
//       ...components.components(sifarniciFilterForm),
//       ...(!readOnlySifarnikTypes.includes(sifarniciStore.sifarnik_type) ? [IS_ACTIVE_SWITCH] : []),
//     ]),

//     initialState: {
//       ...components.filtersInitialState,
//       order_by: '',
//     } as ISifarniciFilters,

//     filterStoreName: FiltersNameEnum.SIFARNICI,
//     resetForm: sifarniciStore.sifarnik_type,
//     fetchTableList: fetchSifarniciList,
//     modifyPayload: sifarniciService.modifyPayloadSifarniciFilters,
//   } as IFilterTableProps;

//   return <FilterTableForm data={data} />;
// });
