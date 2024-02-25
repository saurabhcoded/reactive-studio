import { useEditor } from "@layerhub-io/react";
import React from "react";
import { AppContext } from "~/contexts/AppContext";
import { DesignEditorContext } from "~/contexts/DesignEditor";


const useGraphicContext = () => {
  const DesignContext = React.useContext(DesignEditorContext);
  const AppDesignContext = React.useContext(AppContext);

  /* ---- End */
  return {
    /* Contexts */
    ...DesignContext,
    ...AppDesignContext
  };
};

export default useGraphicContext;
