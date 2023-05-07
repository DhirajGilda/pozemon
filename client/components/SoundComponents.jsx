import React, { Fragment } from "react";
import WaterIcon from "@mui/icons-material/Water";
import NoiseAwareIcon from "@mui/icons-material/NoiseAware";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";

const BeachSounds = (props) => {
  return (
    <Fragment>
      <input
        id="waves"
        className="hidden"
        onChange={props.onClick}
        type="checkbox"
        name="waves"
        value="sound1"
      />
      <label
        className={
          props.waves
            ? "bg-gray-800 rounded-full p-4 text-white mt-4 cursor-pointer border border-gray-300"
            : "bg-gray-600 rounded-full p-4 text-white mt-4 cursor-pointer opacity-30 hover:opacity-50"
        }
        htmlFor="waves"
      >
        <WaterIcon
          sx={{
            width: { lg: 35, md: 30, sm: 30 },
            height: { lg: 35, md: 30, sm: 30 },
          }}
        />
      </label>

      <input
        id="seagulls"
        className="hidden"
        onChange={props.onClick}
        type="checkbox"
        name="seagulls"
        value="sound2"
      />
      <label
        className={
          props.seagulls
            ? "bg-gray-800 rounded-full p-4 text-white mt-4 cursor-pointer border border-gray-300"
            : "bg-gray-600 rounded-full p-4 text-white mt-4 cursor-pointer opacity-30 hover:opacity-50"
        }
        htmlFor="seagulls"
      >
        <NoiseAwareIcon
          sx={{
            width: { lg: 35, md: 30, sm: 30 },
            height: { lg: 35, md: 30, sm: 30 },
          }}
        />
      </label>
    </Fragment>
  );
};

const RainyNightSounds = (props) => {
  return (
    <Fragment>
      <input
        id="rain"
        className="hidden"
        onChange={props.onClick}
        type="checkbox"
        name="rain"
        value="sound1"
      />
      <label
        className={
          props.rain
            ? "bg-gray-800 rounded-full p-4 text-white mt-4 cursor-pointer border border-gray-300"
            : "bg-gray-600 rounded-full p-4 text-white mt-4 cursor-pointer opacity-30 hover:opacity-50"
        }
        htmlFor="rain"
      >
        <UmbrellaIcon
          sx={{
            width: { lg: 35, md: 30, sm: 30 },
            height: { lg: 35, md: 30, sm: 30 },
          }}
        />
      </label>

      <input
        id="thunder"
        className="hidden"
        onChange={props.onClick}
        type="checkbox"
        name="thunder"
        value="sound2"
      />
      <label
        className={
          props.thunder
            ? "bg-gray-800 rounded-full p-4 text-white mt-4 cursor-pointer border border-gray-300"
            : "bg-gray-600 rounded-full p-4 text-white mt-4 cursor-pointer opacity-30 hover:opacity-50"
        }
        htmlFor="thunder"
      >
        <ThunderstormIcon
          sx={{
            width: { lg: 35, md: 30, sm: 30 },
            height: { lg: 35, md: 30, sm: 30 },
          }}
        />
      </label>
    </Fragment>
  );
};

const ForestSounds = (props) => {
  return (
    <Fragment>
      <input
        id="forest"
        className="hidden"
        onChange={props.onClick}
        type="checkbox"
        name="forest"
        value="sound1"
      />
      <label
        className={
          props.forest
            ? "bg-gray-800 rounded-full p-4 text-white mt-4 cursor-pointer border border-gray-300"
            : "bg-gray-600 rounded-full p-4 text-white mt-4 cursor-pointer opacity-30 hover:opacity-50"
        }
        htmlFor="forest"
      >
        <EmojiNatureIcon
          sx={{
            width: { lg: 35, md: 30, sm: 30 },
            height: { lg: 35, md: 30, sm: 30 },
          }}
        />
      </label>
    </Fragment>
  );
};

export { BeachSounds, RainyNightSounds, ForestSounds };
