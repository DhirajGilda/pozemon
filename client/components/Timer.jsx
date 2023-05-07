import { useEffect, useState, useRef } from "react";
import { v1 as uuidv1 } from "uuid";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Settings from "./Settings";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { connect } from "react-redux";
import SoundSettings from "./SoundSettings";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

const Timer = (props) => {
  const [isPaused, setIsPaused] = useState(true);
  const [isStopped, setIsStopped] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  var options = { year: "numeric", month: "long", day: "numeric" };
  var today = new Date();

  const isPausedRef = useRef(isPaused);
  const isStoppedRef = useRef(isStopped);
  const time = useRef(props.mode ? props.breakTime * 60 : props.currentTime);

  const totalSeconds = props.mode
    ? props.breakTime * 60
    : props.sessionTime * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  let minutes = Math.floor(secondsLeft / 60);
  if (minutes < 10) minutes = "0" + minutes;
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  let gradientTransform = `rotate(${props.rotation})`;

  useEffect(() => {
    modeSwitch();
  }, [props.mode]);

  useEffect(() => {
    initTimer();

    const clock = setInterval(async () => {
      if (isPausedRef.current) {
        return;
      }

      if (time.current === 0) {
        return handleEndSession();
      }

      tick();
    }, 1000);

    return () => clearInterval(clock);
  }, [props.sessionTime, props.breakTime]);

  const handlePause = (e) => {
    e.preventDefault();
    isPausedRef.current = !isPausedRef.current;
    setIsPaused(isPausedRef.current);
    props.setCurrent(time.current);
  };

  const handleStop = () => {
    isPausedRef.current = !isPausedRef.current;
    isStoppedRef.current = !isStoppedRef.current;
    setIsPaused(isPausedRef.current);
    props.running(isStoppedRef.current);
    setIsStopped(isStoppedRef.current);
  };

  const handleEndSession = async () => {
    handleStop();

    if (props.currentUser.isLoggedIn && !props.mode) {
      const sessionId = uuidv1();
      const sessionRef = doc(
        db,
        "userdata",
        props.currentUser.id,
        "sessions",
        sessionId
      );

      await setDoc(sessionRef, {
        sessionLength: props.sessionTime * 60,
        focusTime: props.sessionTime * 60 - time.current,
        tasks: props.tasks,
        sessionDate: today.toLocaleDateString("en-US", options),
      });
      sessionReset();
    } else {
      sessionReset();
    }
  };

  const sessionReset = () => {
    if (props.mode) {
      props.setMode(!props.mode);
      time.current = props.sessionTime * 60;
      setSecondsLeft(time.current);
      props.setCurrent(time.current);
      isPausedRef.current = true;
      setIsPaused(isPausedRef.current);
    } else {
      props.setMode(!props.mode);
      time.current = props.breakTime * 60;
      setSecondsLeft(time.current);
      props.setCurrent(time.current);
      isPausedRef.current = true;
      setIsPaused(isPausedRef.current);
    }
  };

  const tick = () => {
    time.current--;
    setSecondsLeft(time.current);
  };

  const initTimer = () => {
    setSecondsLeft(props.mode ? props.breakTime * 60 : props.currentTime);
    time.current = props.mode ? props.breakTime * 60 : props.currentTime;
  };

  const modeSwitch = () => {
    setSecondsLeft(props.mode ? props.breakTime * 60 : props.sessionTime * 60);
    time.current = props.mode ? props.breakTime * 60 : props.sessionTime * 60;
    props.setCurrent(time.current);
  };

  return (
    <div className="flex  flex-col justify-center items-center w-full h-full">
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient
            id={props.gradientId}
            gradientTransform={gradientTransform}
          >
            <stop offset="0%" stopColor={props.startColor} />
            <stop offset="40%" stopColor={props.midColor} />
            <stop offset="80%" stopColor={props.endColor} />
          </linearGradient>
        </defs>
      </svg>
      <div
        className={
          "flex flex-col justify-center items-center rounded-full shadow-lg w-full h-full relative " +
          (props.theme === "ocean"
            ? "shadow-cyan-600/50"
            : props.theme === "rain"
            ? "shadow-orange-700/40"
            : "shadow-green-700/60")
        }
      >
        <div className="rounded-full w-full h-full bg-gray-600  firefox:bg-opacity-60  bg-opacity-20 backdrop-filter backdrop-blur-sm">
          <CircularProgressbar
            value={percentage}
            strokeWidth={4}
            styles={{
              path: {
                stroke: `url(#${props.gradientId})`,
                transition: "stroke-dashoffset 1s ease 0s",
              },
              trail: { stroke: "#3A3C44" },
            }}
          />
        </div>

        <div className="absolute inset-x-auto  top-14">
          <SoundSettings theme={props.theme} />
        </div>

        <div
          className={
            "absolute inset-auto  bg-clip-text " +
            (props.theme === "ocean"
              ? "bg-gradient-to-r from-cyan-200 to-cyan-400"
              : props.theme === "rain"
              ? "bg-gradient-to-r from-yellow-600 to-red-600"
              : "bg-gradient-to-br from-lime-600 via-green-700 to-emerald-900")
          }
        >
          <p className="text-transparent font-bold xLar:text-8xl  text-7xl">
            {minutes + ":" + seconds}
          </p>
        </div>

        <div className="absolute  w-40 flex justify-center items-center inset-x-auto lar:bottom-14 bottom-14">
          {isStoppedRef.current ? (
            <button
              className={
                "w-min bg-clip-text text-transparent p-2 rounded-md font-bold lar:text-2xl text-2xl hover:opacity-60 " +
                (props.theme === "ocean"
                  ? "bg-gradient-to-r from-cyan-200 to-cyan-400"
                  : props.theme === "rain"
                  ? "bg-gradient-to-r from-yellow-600 to-red-600"
                  : "bg-gradient-to-br from-lime-600 via-green-700 to-emerald-900")
              }
              onClick={handleStop}
            >
              <p className="font-kumbh tracking-widest">START</p>
            </button>
          ) : (
            <div className="flex justify-around items-center w-full">
              <PauseIcon
                onClick={handlePause}
                className="text-slate-400 hover:text-white"
                sx={{
                  width: { lg: 40, md: 38, sm: 38 },
                  height: { lg: 40, md: 38, sm: 38 },
                }}
              />
              <SkipNextIcon
                onClick={handleEndSession}
                className="text-slate-400 hover:text-white"
                sx={{
                  width: { lg: 40, md: 38, sm: 38 },
                  height: { lg: 40, md: 38, sm: 38 },
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Settings
          sessionInput={props.setSession}
          currentInput={props.setCurrent}
          breakInput={props.setBreak}
          themeInput={props.setTheme}
          lastTime={props.sessionTime}
          lastBreak={props.breakTime}
          lastTheme={props.theme}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
    sessionTime: state.sessionTime,
    currentTime: state.currentTime,
    breakTime: state.breakTime,
    theme: state.theme,
    tasks: state.tasks,
    mode: state.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSession: (time) => dispatch({ type: "SET_SESSION_TIME", value: time }),
    setCurrent: (time) => dispatch({ type: "SET_CURRENT_TIME", value: time }),
    setBreak: (time) => dispatch({ type: "SET_BREAK_TIME", value: time }),
    setTheme: (theme) => dispatch({ type: "SET_THEME", value: theme }),
    setMode: () => dispatch({ type: "SET_MODE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
