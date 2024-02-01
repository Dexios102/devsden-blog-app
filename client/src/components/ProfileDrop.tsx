import { Link } from "react-router-dom";
import { User } from "@/redux/user/user-slice";
/* Icons */
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { GoFileSubmodule } from "react-icons/go";
/* Ui Components */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileDropProps {
  userNow: User | null;
  handleLogout: () => void;
}
const ProfileDrop: React.FC<ProfileDropProps> = ({ userNow, handleLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={userNow?.profilePic} />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-gray-500">
          @{userNow?.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/profile">
            <DropdownMenuItem>
              <CiUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to="/dashboard">
            <DropdownMenuItem>
              <MdSpaceDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <RiPagesFill className="mr-2 h-4 w-4" />
              <span>Pages</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <Link to="/">
                  <DropdownMenuItem>
                    <GoFileSubmodule className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link to="/projects">
                  <DropdownMenuItem>
                    <FaHome className="mr-2 h-4 w-4" />
                    <span>Projects</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/about">
                  <DropdownMenuItem>
                    <CiCircleInfo className="mr-2 h-4 w-4" />
                    <span>About</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <IoIosLogOut className="mr-2 h-4 w-4 text-[var(--red-color)]" />
            <span className="text-[var(--red-color)]">Log out</span>
            <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDrop;
