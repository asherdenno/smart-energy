// "use client"
// // import ToddleEleGas from "./toddleEleGas";
// export default function EleGasButtons({ showElectric, setShowElectric, showGas, setShowGas }) {
//     return (
//       <div>
//         <button onClick={() => {
//           setShowElectric(true);
//           setShowGas(true);
//         }}>
// All
//         </button>
//         <button onClick={() => {
//           setShowElectric(true);
//           setShowGas(false);
//         }}>Electric</button>
//         <button onClick={() => {
//           setShowElectric(false);
//           setShowGas(true);
//         }}>Gas</button>
//       </div>
//     );
//   }
"use client";
import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function EleGasButtons({ showElectric, setShowElectric, showGas, setShowGas }) {
  const [selected, setSelected] = React.useState("all");

  const handleChange = (event, newSelection) => {
    if (newSelection !== null) {
      setSelected(newSelection);
      if (newSelection === "all") {
        setShowElectric(true);
        setShowGas(true);
      } else if (newSelection === "electric") {
        setShowElectric(true);
        setShowGas(false);
      } else {
        setShowElectric(false);
        setShowGas(true);
      }
    }
  };

  return (
    <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="energy type"
      sx={{
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="electric">Electric</ToggleButton>
      <ToggleButton value="gas">Gas</ToggleButton>
    </ToggleButtonGroup>
  );
}

  