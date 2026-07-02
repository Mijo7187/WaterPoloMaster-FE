import to from "await-to-js";
import { makeAutoObservable } from "mobx";
import {
  drawerStore,
  DrawerTypeEnum,
  FilterGroupsEnum,
  FiltersWithPagination,
  IBaseStoreConfig,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
  modalStore,
  ModalTypeEnum,
  PaginationEnum,
  paginationStore,
} from "@stores";
import { filtersStore } from "@stores/filters/filters.store";

import { PAYMENT_INITIAL_STATE } from "./payment.constants";
import { paymentService } from "./payment.service";
import { FPayment, IGetPayment, IPostPayment } from "./payment.types";

class PaymentStore implements IBaseStoreConfig<PaymentStore> {
  paymentList: IGetPayment[] = [];
  payment: IGetPayment | IPostPayment = PAYMENT_INITIAL_STATE;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterPayment(): IGetPayment | IPostPayment {
    return this.payment;
  }

  get getterPaymentList(): IGetPayment[] {
    return this.paymentList;
  }

  handleChange<K extends keyof PaymentStore>(key: K, value: PaymentStore[K]) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  getPaymentList = async () => {
    this.isLoading = true;
    const filters = {
      ...filtersStore.getFilterGroupValues(FilterGroupsEnum.PAYMENT),
      ...paginationStore.getRequestPaginationParams(
        PaginationEnum.PAYMENT_PAGINATION,
      ),
    } as FiltersWithPagination<FPayment>;

    const [err, res] = await to<IPaginatedResponse<IGetPayment>>(
      paymentService.getPaymentList(filters),
    );
    if (err) return Promise.reject(err);
    this.handleChange("paymentList", [...res.items]);
    paginationStore.set(PaginationEnum.PAYMENT_PAGINATION, res.pagination);
  };

  getPaymentById = async (id: string) => {
    this.isLoading = true;
    const [err, res] = await to<IGetPayment>(
      paymentService.getPaymentById(id),
    );
    if (err) return Promise.reject(err);
    this.handleChange("payment", res);
  };

  createPayment = async (payload: IPostPayment) => {
    this.isLoading = true;
    const [err] = await to<IPostResponse>(
      paymentService.createPayment(payload),
    );
    if (err) return Promise.reject(err);
    modalStore.clearModal(ModalTypeEnum.PAYMENT_MODAL);
    void this.getPaymentList();
  };

  updatePayment = async (id: string, payload: IPostPayment) => {
    this.isLoading = true;
    const [err] = await to<INoContentResponse>(
      paymentService.updatePayment(id, payload),
    );
    if (err) return Promise.reject(err);
    drawerStore.clearDrawer(DrawerTypeEnum.PAYMENT_DRAWER);
    void this.getPaymentList();
  };
}

export const paymentStore = new PaymentStore();
