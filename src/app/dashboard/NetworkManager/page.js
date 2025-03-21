import ExampleChart from "../dashboard/components/charts/exampleChart";
import ExampleChart2 from "../dashboard/components/charts/exampleChart2";
import ExampleChart3 from "../dashboard/components/charts/exampleChart3";
import ExampleChart4 from "../dashboard/components/charts/exampleChart4";
import ExampleChart5 from "../dashboard/components/charts/exampleChart5";
import ExampleChart6 from "../dashboard/components/charts/exampleChart6";
import ExampleChart7 from "../dashboard/components/charts/exampleChart7";


export default function Dashboard() {
  return (
    <div>

    <div style={{width:'40%'}}>
      <ExampleChart />
    </div>
    <div /*style={{width:'40%'}}*/>
      <ExampleChart2/>
    </div>
    <div>
      <ExampleChart3/>
    </div>
    <div>
      <ExampleChart4/>
    </div>
    <div style={{width:"90%"}}>
      <ExampleChart5/>
    </div>
    <div style={{height:"10%"}}>
      <ExampleChart6/>
    </div>
    <div>
      <ExampleChart7/>
    </div>
    </div>
  );
}
