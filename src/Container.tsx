import React, { useEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";
import Loading from "./components/Loading";
import { editorFonts } from "./constants/fonts";
import { useAppDispatch } from "./store/store";
import { getFonts } from "./store/slices/fonts/actions";
import useGraphicContext from "./hooks/useGraphicContext";

const Container = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isMobile, setIsMobile } = useGraphicContext();
  const [loaded, setLoaded] = useState(false);
  const updateMediaQuery = (value: number) => {
    if (!isMobile && value >= 800) {
      setIsMobile(false);
    } else if (!isMobile && value < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    const containerElement = containerRef.current!;
    const containerWidth = containerElement.clientWidth;
    updateMediaQuery(containerWidth);
    const resizeObserver = new ResizeObserver((entries) => {
      const { width = containerWidth } = (entries[0] && entries[0].contentRect) || {};
      updateMediaQuery(width);
    });
    resizeObserver.observe(containerElement);
    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // @ts-ignore
    dispatch(getFonts(editorFonts));
    /*  
    dispatch(getUploads())
    loadFonts() */
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}>
      {loaded ? <>{children} </> : <Loading />}
    </div>
  );
};

export default Container;
