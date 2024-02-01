import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/* Components */
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex md:flex-row flex-col mt-2 gap-2">
      <div className="hidden w-full max-w-[5rem] mt-2 md:block">
        <Sidebar />
      </div>
      {tab == "profile" && <Profile />}
    </div>
  );
};

export default Dashboard;
