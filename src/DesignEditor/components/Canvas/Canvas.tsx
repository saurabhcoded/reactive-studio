import { Canvas as LayerhubCanvas, useEditor } from "@layerhub-io/react";
import ContextMenu from "../ContextMenu";

const Canvas = () => {
  const editor = useEditor();
  console.log("Editor", editor);
  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      <ContextMenu />
      <LayerhubCanvas
        config={{
          background: "#f1f2f6",
          controlsPosition: {
            rotation: "BOTTOM",
          },
          shadow: {
            blur: 4,
            color: "#fcfcfc",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  );
};

export default Canvas;
