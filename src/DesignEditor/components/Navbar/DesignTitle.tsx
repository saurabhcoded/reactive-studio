import React from "react";
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import CloudCheck from "~/components/Icons/CloudCheck";
import { StatefulTooltip } from "baseui/tooltip";
import { debounce } from "lodash";
import useGraphicContext from "~/hooks/useGraphicContext";

interface State {
  name: string;
  width: number;
}

const DesignTitle = () => {
  const [state, setState] = React.useState<State>({ name: "My first design.", width: 100 });
  const { currentDesign, setCurrentDesign } = useGraphicContext();
  const inputTitleRef = React.useRef<Input>(null);

  const handleInputChange = React.useCallback(
    debounce((name: string) => {
      setState({ ...state, name });
      setCurrentDesign({ ...currentDesign, name });
    }),
    [state]
  );

  return (
    <Block
      style={{
        display: "flex",
        width: "400px",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        backgroundColor: "#0000001A",
        opacity: 1,
        border: "1px solid #ffffff99",
        borderRadius: "5px",
      }}>
      <Input
        onChange={(e: any) => handleInputChange(e.target.value)}
        overrides={{
          Root: {
            style: {
              backgroundColor: "transparent",
              borderTopStyle: "none",
              borderBottomStyle: "none",
              borderRightStyle: "none",
              borderLeftStyle: "none",
            },
          },
          InputContainer: {
            style: {
              backgroundColor: "transparent",
              paddingRight: 0,
            },
          },
          Input: {
            style: {
              fontWeight: 500,
              fontSize: "14px",
              backgroundColor: "transparent",
              color: "#ffffff",
              paddingRight: 0,
            },
          },
        }}
        value={state.name}
        ref={inputTitleRef}
      />
      <StatefulTooltip showArrow={true} content={() => <Block>All changes are saved</Block>}>
        <Block
          style={{
            cursor: "pointer",
            padding: "10px",
            display: "flex",
            color: "#ffffff",
          }}>
          <CloudCheck size={24} />
        </Block>
      </StatefulTooltip>
    </Block>
  );
};

export default DesignTitle;
