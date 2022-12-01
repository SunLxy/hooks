import { useEffect, useRef } from 'react';

interface UseLoadMoreProps {
  /**触底位置*/
  offsetTop?: number;
  /**触底加载方法*/
  onLoader?: () => void;
  /**判断是否是 document */
  isDocument?: boolean;
}

export const useLoadMore = (props: UseLoadMoreProps) => {
  const { offsetTop = 20, onLoader, isDocument } = props || {};
  const isLoade = useRef(false);
  const container = useRef<HTMLDivElement | HTMLElement>();

  /**获取判断数据*/
  const getData = (target: HTMLDivElement | HTMLElement) => {
    let top = 0;
    let clientHeight = 0;
    let scrollHeight = 0;
    let topSum = offsetTop;
    if (isDocument) {
      top = document.documentElement.scrollTop || 0;
      clientHeight = document.documentElement.clientHeight || 0;
      scrollHeight = parseInt(`${document.documentElement?.scrollHeight || 0}`);
      topSum = parseInt(`${top + clientHeight + offsetTop}`);
    } else {
      top = target?.scrollTop || 0;
      clientHeight = target?.clientHeight || 0;
      scrollHeight = parseInt(`${target?.scrollHeight || 0}`);
      topSum = parseInt(`${top + clientHeight + offsetTop}`);
    }
    return {
      top,
      clientHeight,
      scrollHeight,
      topSum,
    };
  };

  /**监听触底加载*/
  const onScroll: EventListenerOrEventListenerObject = (event) => {
    const target = event.target as HTMLDivElement | HTMLElement;
    const { scrollHeight, topSum } = getData(target);
    if (topSum >= scrollHeight && !isLoade.current) {
      isLoade.current = true;
      if (typeof onLoader === 'function') onLoader();
    } else if (topSum < scrollHeight) {
      isLoade.current = false;
    }
  };

  useEffect(() => {
    if (isDocument) {
      document.addEventListener('scroll', onScroll.bind(this));
    } else if (container.current) {
      container.current.addEventListener('scroll', onScroll.bind(this));
    }
    return () => {
      if (isDocument) {
        document.removeEventListener('scroll', onScroll.bind(this));
      } else if (container.current) {
        container.current.removeEventListener('scroll', onScroll.bind(this));
      }
    };
  }, [container]);

  return [container];
};
