import React, { useMemo, useState } from "react";
import { AnyTodo } from "sardine-dashboard-typescript-definitions";

const LayerContext: AnyTodo = React.createContext({});

const LayerContextProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [point, setPoint] = useState([0, 0]);

  const defaultValue = useMemo(
    () => ({
      point,
      setPoint,
    }),
    [point, setPoint]
  );

  return <LayerContext.Provider value={defaultValue}>{children}</LayerContext.Provider>;
};

export { LayerContext, LayerContextProvider };
