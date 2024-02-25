import Navbar from "./components/Navbar";
import Panels from "./components/Panels";
import Canvas from "./components/Canvas";
import Footer from "./components/Footer";
import Toolbox from "./components/Toolbox";
import { Block } from "baseui/block";
import Preview from "./components/Preview/Preview";
import useGraphicContext from "~/hooks/useGraphicContext";

const DesignEditor = () => {
  const { displayPreview, setDisplayPreview } = useGraphicContext();
  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}
      <Block
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF",
          fontFamily: "Uber Move Text",
        }}>
        <Navbar />
        <div style={{ display: "flex", flex: 1 }}>
          <Panels />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
            <Toolbox />
            <Canvas />
            <Footer />
          </div>
        </div>
      </Block>
    </>
  );
};

export default DesignEditor;
