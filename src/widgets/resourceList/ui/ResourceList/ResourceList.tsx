import { type FC, type PropsWithChildren, type ReactNode, useEffect } from "react";
import { useIntersectionObserver } from "react-intersection-observer-hook";

import { Grid, type StackProps } from "@mui/material";

import { WithUIStatuses } from "@/shared/types";

type Props = PropsWithChildren<
  WithUIStatuses<{
    skeleton?: {
      component: ReactNode;
      count: number;
    };
    onLoadMore?: (...args: any[]) => any;
    canLoadMore?: boolean;
    disableInfiniteScroll?: boolean;
    loadMoreElement?: (onClick: () => void) => ReactNode;
  }>
> &
  Pick<StackProps, "gap" | "direction">;

const LoadingFallback = () => {
  return "Loading...";
};

export const ResourceList: FC<Props> = ({
  skeleton,
  children,
  isLoading,
  isError,
  isSuccess,
  onLoadMore,
  canLoadMore,
  disableInfiniteScroll,
  loadMoreElement,
}) => {
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const isShowInfiniteTrigger = !isError && canLoadMore && !disableInfiniteScroll;
  const isShowClickTrigger = !isError && canLoadMore && disableInfiniteScroll && onLoadMore;

  useEffect(() => {
    if (isVisible) {
      onLoadMore?.();
    }
  }, [isVisible, children, onLoadMore]);

  return (
    <>
      <Grid container spacing={"1rem"}>
        {isLoading &&
          (skeleton ? (
            new Array(skeleton?.count).fill(1).map(() => skeleton.component)
          ) : (
            <LoadingFallback />
          ))}
        {isSuccess && children}
      </Grid>
      {isShowInfiniteTrigger && <div ref={ref} style={{ height: 1, width: "100%" }}></div>}
      {isShowClickTrigger && loadMoreElement?.(onLoadMore)}
    </>
  );
};
