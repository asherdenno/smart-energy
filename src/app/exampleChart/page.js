import ExampleChart from "@/app/dashboard/components/ExampleChart";
import ExampleChart2 from "../dashboard/components/exampleChart2";
import ExampleChart3 from "../dashboard/components/exampleChart3";
import ExampleChart4 from "../dashboard/components/exampleChart4";
import ExampleChart5 from "../dashboard/components/exampleChart5";

export default function Dashboard() {
  return (
    <div>

    <div style={{width:'40%'}}>
      <h1>Dashboard</h1>
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
    </div>
  );
}

