'use client';
import Navbar from "./components/navbar";
import styles from "@/app/page.module.css";
import { CityProvider } from "./context/CityContext";
import { useEffect } from "react";

const accountTypeId = 3;
const cityFilterId = null;
const networkFilterId = 2;
const fetchFilterInfo = async ( accountTypeId, cityFilterId, networkFilterId) => {

    try {
      const res = await fetch('/api/fetch-account-filters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountTypeId, cityFilterId, networkFilterId }),
      });
      if (!res.ok) throw new Error('Error fetching usage data');
      const data = await res.json();
      console.log("fetchFilterInfo preformed");
      return data;
    } catch (error) {
      console.error('Error fetching usage data:', error);
      return [];
    }
};

const Overview = () => {
  useEffect(() => {
    console.log("useeffect preformed");
 fetchFilterInfo();
  }, [])

  return (
    <CityProvider>
      <main className={styles.content}>
        <Navbar title={"Hi, User!"} hasNotify={true} />
        <div className={styles.greyContainer}>
          <p>is the Overview page...</p>
        </div>
      </main>
    </CityProvider>
  );
}
export default Overview;