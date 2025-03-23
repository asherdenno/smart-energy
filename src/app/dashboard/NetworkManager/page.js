import CitiesUnderNetwork from "../components/charts/networkCharts/citiesUnderNetwork";
import ExampleChart2 from "../components/charts/exampleCharts/exampleChart2";
import ExampleChart3 from "..//components/charts/exampleCharts/exampleChart3";
import ExampleChart4 from "..//components/charts/exampleCharts/exampleChart4";
import ExampleChart5 from "..//components/charts/exampleCharts/exampleChart5";
import ExampleChart6 from "..//components/charts/exampleCharts/exampleChart6";
import ExampleChart7 from "..//components/charts/exampleCharts/exampleChart7";
import styles from "@/app/page.module.css";



export default function Dashboard() {
  return (
    <main className={styles.content}>
      Test
      <div style={{ width: '40%' }}>
        <CitiesUnderNetwork />
      </div>
      <div>
        <ExampleChart2 />
      </div>
    </main>
  );
}
