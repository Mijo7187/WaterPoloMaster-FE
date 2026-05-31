import { observer } from "mobx-react-lite";
import { UxList } from "../UxList/UxList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import {
  IGetPagination,
  IPaginatedApiResponse,
} from "modules/globals/appGlobal/appGlobal.types";
import { Divider, Skeleton } from "antd";
import { ListProps } from "antd/lib";
import { PAGINATION_INITIAL_STATE } from "@stores";
// import { PAGINATION_INITIAL_STATE } from "modules/globals/appGlobal/appGlobal.constants";

interface IUxInfiniteListProps<T> extends ListProps<T> {
  name: string;
  loadData: ({
    page,
    size,
  }: {
    page: number;
    size: number;
  }) => IPaginatedApiResponse<T>;
  listItemComponent: (item: T) => React.ReactNode;
  wrapperHeight?: number | string;
  listStyle?: React.CSSProperties;
}

export const UxInfiniteList = observer(
  <T,>({
    name,
    loadData,
    listItemComponent,
    wrapperHeight = 400,
    listStyle = { padding: "20px" },
    ...rest
  }: IUxInfiniteListProps<T>) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);
    const [pagination, setPagination] = useState<IGetPagination>(
      PAGINATION_INITIAL_STATE,
    );

    const loadMoreData = async () => {
      if (
        loading ||
        (data.length === pagination.total && pagination.total > 0)
      ) {
        return;
      }
      setLoading(true);
      const response = await loadData({ page: pagination.page, size: 50 });
      if (response) {
        setData([...data, ...response.items]);
        setPagination(response.pagination);
      }
      setLoading(false);
    };

    useEffect(() => {
      loadMoreData();
    }, []);

    return (
      <div
        id="scrollableDiv"
        style={{
          height: wrapperHeight,
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <UxList
            style={listStyle}
            name={name}
            dataSource={data}
            renderItem={(item) => listItemComponent(item)}
            {...rest}
          />
        </InfiniteScroll>
      </div>
    );
  },
);
