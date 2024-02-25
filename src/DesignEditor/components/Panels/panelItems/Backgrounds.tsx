import { Block } from "baseui/block";
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft";
import Scrollable from "~/components/Scrollable";
import { backgrounds } from "~/constants/mock-data";
import Uploads from "./Uploads";
import useGraphic, { LayerTypes } from "~/hooks/useGraphic";
import useGraphicContext from "~/hooks/useGraphicContext";

const Backgrounds = () => {
  const { setIsSidebarOpen } = useGraphicContext();
  const { addCanvasBackground } = useGraphic();
  return (
    <Block style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}>
        <Block>Backgrounds</Block>
        <Block onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Uploads type={LayerTypes.BACKGROUND_IMAGE} btnText={"Upload Background"} />
      <Scrollable>
        <Block padding="0 1rem">
          <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>
            {backgrounds.map((image, index) => {
              return <ImageItem key={index} onClick={() => addCanvasBackground(image.src.large)} preview={image.src.small} />;
            })}
          </div>
        </Block>
      </Scrollable>
    </Block>
  );
};

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  return (
    <div onClick={onClick}>
      <img src={preview} style={{ width: "100%" }} />
    </div>
  );
};

export default Backgrounds;
