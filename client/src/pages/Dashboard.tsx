import useTab from "@/hooks/useTab";

/* Components */
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import Analytics from "@/components/Analytics";
import Post from "@/components/Post";
import Comments from "@/components/Comments";
import Users from "@/components/Users";

const Dashboard = () => {
  const tab = useTab();
  return (
    <div className="flex md:flex-row flex-col mt-2 gap-2">
      <div className="hidden w-full max-w-[5rem] mt-2 md:block">
        <Sidebar />
      </div>
      {tab == "profile" && <Profile />}
      {tab == "analytics" && <Analytics />}
      {tab == "post" && <Post />}
      {tab == "comments" && <Comments />}
      {tab == "users" && <Users />}
    </div>
  );
};

export default Dashboard;
