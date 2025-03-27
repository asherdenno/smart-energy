"use client"
// import ToddleEleGas from "./toddleEleGas";
export default function EleGasButtons({ showElectric, setShowElectric, showGas, setShowGas }) {
    return (
      <div>
        <button onClick={() => setShowElectric(!showElectric)}>
          {showElectric ? "Hide Electric" : "Show Electric"}
        </button>
        <button onClick={() => setShowGas(!showGas)}>
          {showGas ? "Hide Gas" : "Show Gas"}
        </button>
      </div>
    );
  }
  