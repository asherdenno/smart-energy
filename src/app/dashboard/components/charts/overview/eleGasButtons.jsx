"use client"
// import ToddleEleGas from "./toddleEleGas";
export default function EleGasButtons({ showElectric, setShowElectric, showGas, setShowGas }) {
    return (
      <div>
        <button onClick={() => {
          setShowElectric(true);
          setShowGas(true);
        }}>
All
        </button>
        <button onClick={() => {
          setShowElectric(true);
          setShowGas(false);
        }}>Electric</button>
        <button onClick={() => {
          setShowElectric(false);
          setShowGas(true);
        }}>Gas</button>
      </div>
    );
  }
  