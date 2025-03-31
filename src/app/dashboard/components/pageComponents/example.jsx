import React, { useState } from "react";
import ButtonBar from "./ButtonBar";

const Example = () => {
  const [selected, setSelected] = useState("Electricity");

  return (
    <div>
      <h3>Select Energy Type</h3>
      <ButtonBar
        buttons={["Electricity", "Gas", "Both"]}
        onSelect={(val) => setSelected(val)}
      />

      <h4>Selected: {selected}</h4>
    </div>
  );
};

export default Example;
