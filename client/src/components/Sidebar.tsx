/* Icons */
import { FaChartSimple } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { FaPeopleLine } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
/* Ui Components */
import { Button } from "./ui/button";
const Sidebar = () => {
  return (
    <div
      className="max-h-full
     py-4 flex flex-col px-2 border-r-2 border-muted"
    >
      <div
        className="text-center bg-blue-200 text-blue-900
      rounded-md text-sm font-medium"
      >
        Admin
      </div>
      <div className="border-b border-gray-700 mt-4"></div>
      <div className="mt-6 flex flex-col items-center gap-6">
        <Button variant="ghost">
          <FaChartSimple className="w-6 h-6" />
        </Button>
        <Button variant="ghost">
          <FaUser className="w-6 h-6" />
        </Button>
        <Button variant="ghost">
          <IoNewspaper className="w-6 h-6" />
        </Button>
        <Button variant="ghost">
          <AiFillMessage className="w-6 h-6" />
        </Button>
        <Button variant="ghost">
          <FaPeopleLine className="w-6 h-6" />
        </Button>
      </div>
      <div className="mt-[28rem] flex flex-col items-center gap-6 mb-6">
        <Button variant="ghost">
          <IoMdLogOut className="w-6 h-6 text-[var(--red-color)]" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
