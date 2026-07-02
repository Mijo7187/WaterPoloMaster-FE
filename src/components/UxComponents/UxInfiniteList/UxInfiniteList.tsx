import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Divider, List, Skeleton } from "antd";

export interface IUxInfiniteListProps<T> {
  testId: string;
  dataSource: T[];
  renderItem: (item: T) => ReactNode;
  loading?: boolean;
  hasMore: boolean;
  next: () => void;
  scrollHeight?: number | string;
}

export const UxInfiniteList = <T extends object>({
  testId,
  dataSource,
  renderItem,
  loading,
  hasMore,
  next,
  scrollHeight = 400,
}: IUxInfiniteListProps<T>) => {
  const scrollableId = `infinite-scroll-${testId}`;

  return (
    <div
      id={scrollableId}
      style={{ height: scrollHeight, overflow: "auto" }}
    >
      <InfiniteScroll
        dataLength={dataSource.length}
        next={next}
        hasMore={hasMore}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>No more data</Divider>}
        scrollableTarget={scrollableId}
      >
        <List<T>
          data-testid={`infinite-list-${testId}`}
          dataSource={dataSource}
          renderItem={renderItem}
          loading={loading}
        />
      </InfiniteScroll>
    </div>
  );
};
