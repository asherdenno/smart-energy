import ExampleChart from "@/app/dashboard/components/ExampleChart";
import ExampleChart2 from "../dashboard/components/exampleChart2";

export default function Dashboard() {
  return (
    <div>

    <div style={{width:'40%'}}>
      <h1>Dashboard</h1>
      <ExampleChart />
    </div>
    <div>
      <ExampleChart2/>
    </div>
    </div>
  );
}

