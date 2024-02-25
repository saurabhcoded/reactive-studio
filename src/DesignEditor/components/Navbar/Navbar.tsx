import React from "react";
import { styled, ThemeProvider, DarkTheme } from "baseui";
import { Theme } from "baseui/theme";
import { Button, KIND } from "baseui/button";
import Logo from "~/components/Icons/Logo";
import Play from "~/components/Icons/Play";
import { Block } from "baseui/block";
import { useEditor } from "@layerhub-io/react";
import { IScene } from "@layerhub-io/types";
import { loadTemplateFonts } from "~/utils/fonts";
import { loadVideoEditorAssets } from "~/utils/video";
import DesignTitle from "./DesignTitle";
import { IDesign } from "~/interfaces/DesignEditor";
import Github from "~/components/Icons/Github";
import useGraphicContext from "~/hooks/useGraphicContext";

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "grid",
  padding: "0 1.25rem",
  gridTemplateColumns: "380px 1fr 380px",
  alignItems: "center",
}));

const Navbar = () => {
  const { setDisplayPreview, setScenes, setCurrentDesign, currentDesign, scenes } = useGraphicContext();
  const editor = useEditor();
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const parseGraphicJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: "GRAPHIC",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(graphicTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const parsePresentationJSON = () => {
    const currentScene = editor.scene.exportToJSON();

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          duration: 5000,
          layers: currentScene.layers,
          name: currentScene.name,
        };
      }
      return {
        id: scn.id,
        duration: 5000,
        layers: scn.layers,
        name: scn.name,
      };
    });

    if (currentDesign) {
      const presentationTemplate: IDesign = {
        id: currentDesign.id,
        type: "PRESENTATION",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(presentationTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const parseVideoJSON = () => {
    const currentScene = editor.scene.exportToJSON();
    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: scn.id,
          duration: scn.duration,
          layers: currentScene.layers,
          name: currentScene.name ? currentScene.name : "",
        };
      }
      return {
        id: scn.id,
        duration: scn.duration,
        layers: scn.layers,
        name: scn.name ? scn.name : "",
      };
    });
    if (currentDesign) {
      const videoTemplate: IDesign = {
        id: currentDesign.id,
        type: "VIDEO",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      };
      makeDownload(videoTemplate);
    } else {
      console.log("NO CURRENT DESIGN");
    }
  };

  const makeDownload = (data: Object) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "template.json";
    a.click();
  };

  const makeDownloadTemplate = async () => {
    if (editor) {
      return parseGraphicJSON();
    }
  };

  const loadGraphicTemplate = async (payload: IDesign) => {
    const scenes = [];
    const { scenes: scns, ...design } = payload;
    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      };
      const loadedScene = await loadVideoEditorAssets(scene);
      await loadTemplateFonts(loadedScene);

      const preview = (await editor.renderer.render(loadedScene)) as string;
      scenes.push({ ...loadedScene, preview });
    }

    return { scenes, design };
  };

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      let template = await loadGraphicTemplate(data);
      console.log("Loading....", template);
      //   @ts-ignore
      setScenes(template.scenes);
      //   @ts-ignore
      setCurrentDesign(template.design);
    },
    [editor]
  );

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (res) => {
        const result = res.target!.result as string;
        const design = JSON.parse(result);
        handleImportTemplate(design);
      };
      reader.onerror = (err) => {
        console.log(err);
      };

      reader.readAsText(file);
    }
  };

  console.log("Scenes", scenes, "Current Design", currentDesign);
  return (
    // @ts-ignore
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <Logo size={36} />
        </div>
        <DesignTitle />
        <Block $style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <input multiple={false} onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />
          <Button
            size="compact"
            onClick={handleInputFileRefClick}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}>
            Import
          </Button>

          <Button
            size="compact"
            onClick={makeDownloadTemplate}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}>
            Export
          </Button>
          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}>
            <Play size={24} />
          </Button>

          <Button size="compact" onClick={() => window.location.replace("https://github.com/saurabhcoded/reactive-studio")} kind={KIND.tertiary}>
            <Github size={24} />
          </Button>
        </Block>
      </Container>
    </ThemeProvider>
  );
};

export default Navbar;
