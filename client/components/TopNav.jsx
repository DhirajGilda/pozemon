import { useState } from "react";
import Link from "next/link";
import TimerIcon from "@mui/icons-material/Timer";
import BarChartIcon from "@mui/icons-material/BarChart";
import LoginIcon from "@mui/icons-material/Login";

import { connect } from "react-redux";
import DropDown from "./DropDown";

const TopNav = (props) => {
  const [drop, setDrop] = useState(false);

  return (
    <div className="text-white p-2 bg-gray-600 w-full firefox:bg-opacity-60 flex justify-center items-center  bg-opacity-20 backdrop-filter backdrop-blur-md">
      <ul className="flex justify-around items-center p-2">
        <li className="px-8 py-1 ">
          <Link href="/">
            <a>
              <TimerIcon sx={{ width: 30, height: 30 }} />
            </a>
          </Link>
        </li>
        <li className="px-8 py-1 ">
          <Link href="/history">
            <a>
              <BarChartIcon sx={{ width: 30, height: 30 }} />
            </a>
          </Link>
        </li>
        <li className="px-8 ">
          {props.currentUser.email == null ? (
            <Link href="/login">
              <a>
                <LoginIcon sx={{ width: 30, height: 30 }} />
              </a>
            </Link>
          ) : (
            <DropDown toggle={setDrop} open={drop} />
          )}
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
  };
};

export default connect(mapStateToProps)(TopNav);
