import { useEditor } from "@layerhub-io/react";
import React from "react";

const useGraphic = () => {
  const editor = useEditor();

  /* ----------------- Editor Canvas Functions --------------- */
  /* An Overall Function for Adding Object to Canvas */
  const addCanvasObject = React.useCallback(
    async (url: string, type: string) => {
      try {
        if (editor) {
          const options = {
            type: type || "StaticImage",
            src: url,
          };
          await editor.objects.add(options);
          console.log("Added Canvas image");
        }
      } catch (error) {
        console.error("Error While Adding Image:", error);
      }
    },
    [editor]
  );
  /* Function to add backgrounf to Frame */
  const addCanvasBackground = React.useCallback(
    async (url: string) => {
      try {
        await addCanvasObject(url, LayerTypes.BACKGROUND_IMAGE);
        return;
      } catch (error) {
        console.error("Error While Adding Background:", error);
      }
    },
    [editor]
  );

  /* Function to add Image to Canvas */
  const addCanvasImage = React.useCallback(
    async (url: string) => {
      try {
        await addCanvasObject(url, LayerTypes.STATIC_IMAGE);
        return;
      } catch (error) {
        console.error("Error While Adding Image:", error);
      }
    },
    [editor]
  );

  return { editor, addCanvasBackground, addCanvasImage, addCanvasObject };
};

export default useGraphic;

export const LayerTypes = {
  STATIC_VECTOR: "StaticVector",
  STATIC_GROUP: "StaticGroup",
  DYNAMIC_GROUP: "DynamicGroup",
  STATIC_PATH: "StaticPath",
  DYNAMIC_PATH: "DynamicPath",
  STATIC_IMAGE: "StaticImage",
  BACKGROUND_IMAGE: "BackgroundImage",
  STATIC_VIDEO: "StaticVideo",
  STATIC_AUDIO: "StaticAudio",
  DYNAMIC_IMAGE: "DynamicImage",
  STATIC_TEXT: "StaticText",
  DYNAMIC_TEXT: "DynamicText",
  BACKGROUND: "Background",
  PRINT_ITEM: "PrintItem",
  FRAME: "Frame",
  GROUP: "Group",
  ACTIVE_SELECTION: "activeSelection",
};
