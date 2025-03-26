import CitiesUnderNetwork from "../components/charts/networkCharts/citiesUnderNetwork";
import ExampleChart2 from "../components/charts/exampleCharts/exampleChart2";
import ExampleChart3 from "..//components/charts/exampleCharts/exampleChart3";
import ExampleChart4 from "..//components/charts/exampleCharts/exampleChart4";
import ExampleChart5 from "..//components/charts/exampleCharts/exampleChart5";
import ExampleChart6 from "..//components/charts/exampleCharts/exampleChart6";
import ExampleChart7 from "..//components/charts/exampleCharts/exampleChart7";
import YearlyEnergyChart from "../components/charts/annualConsume/yearlyEnergyChart";
import EnergyUsagePercent from "../components/charts/annualConsume/energyUsagePercent";
import SpecificNetworkCity from "../components/charts/annualConsume/specificNetworkCity";
import Test4 from "../components/charts/exampleCharts/exampleChart9";
import Test3 from "../components/charts/exampleCharts/exampleChart8";
import AnnualEnergyData from "../components/charts/annualConsume/annualEnergyData";




import styles from "@/app/page.module.css";
import { BorderAll } from "@mui/icons-material";



export default function Dashboard() {
  return (
    <main className={styles.content}>
      <div>
        Annual Energy Consumption
        <div>
          <div>
          <AnnualEnergyData/>
          </div>
        <div>
        <EnergyUsagePercent/>
        </div>
        </div>
      </div>
      Test
      <div>
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
      <div>{/*Put filter here*/}</div>
      <div><SpecificNetworkCity/></div>
    </div>

      <div style={{ width: '40%' }}>
        {/* <CitiesUnderNetwork /> */}
      </div>
      <div>
        {/* <ExampleChart2 /> */}
      </div>
      <div>
        <Test4/>
      </div>
    </main>

  );
}
