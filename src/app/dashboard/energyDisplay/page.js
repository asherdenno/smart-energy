import EnergyUsagePercent from "../components/charts/annualConsume/energyUsagePercent";
import AnnualEnergyData from "../components/charts/annualConsume/annualEnergyData";
import EleGasButtons from "../components/charts/annualConsume/eleGasButtons";
import ToddleEleGas from "../components/charts/annualConsume/toddleEleGas";




import styles from "@/app/page.module.css";
import { BorderAll } from "@mui/icons-material";
import AnnualEnergyOverview from "../components/charts/annualConsume/annualEnergyOverview";



export default function Dashboard() {
  return (
    <main className={styles.content}>
    <div /*Overview */>
    <AnnualEnergyOverview/>
      {/* <div>
        Annual Energy Consumption
        <ToddleEleGas/>
        <div style={{border:"#000 1px solid"/*, width:"30%", height:"30%"*}}>
          <div style={{display:"flex"}}>
          <div style={{width:"50%"}}>
          <AnnualEnergyData/>
          </div>
        <div style={{ width:"50%", height:"100%"}}>
        <EnergyUsagePercent/>
        </div>
        <div>
        <EleGasButtons/>
        </div>
          </div>
      </div>
      </div> */}
    </div>


      {/* </main><div>
        <Test3/>
      </div>
      <div style={{border:"#000 1px solid", display:"flex"}}>
    <div style={{height:'40%'}}>
     <YearlyEnergyChart/>
    </div>
    <div>
      <EnergyUsagePercent/>
    </div>
      </div>
    <div style={{border:"#000 1px solid", width:"30%", height:"30%"}}>
      <div>Test</div>
      <div>{/*Put filter here*}</div>
      <div><SpecificNetworkCity/></div>
    </div>
{/* 
      <div style={{ width: '40%' }}>
      {/* <CitiesUnderNetwork /> *}
      </div>
      <div>
      {/* <ExampleChart2 /> *}
      </div>
      <div>
      <Test4/>
      </div> *}*/}

      <div /*Electric*/>
      </div>
      
      <div /*Gas*/>
      </div>

    </main>

  );
}
