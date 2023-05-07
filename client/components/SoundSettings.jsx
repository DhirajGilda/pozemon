import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import Slide from "@mui/material/Slide";

import { BeachSounds, RainyNightSounds, ForestSounds } from "./SoundComponents";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SoundSettings = (props) => {
  const [open, setOpen] = useState(false);
  const [sounds, setSounds] = useState({ one: "", two: "" });
  const [sound1, setSound1] = useState(false);
  const [sound2, setSound2] = useState(false);

  const audioRef1 = useRef();
  const audioRef2 = useRef();

  useEffect(() => {
    if (props.theme == "ocean") {
      setSounds({
        one: "/sounds/waves.mp3",
        two: "/sounds/seagulls.mp3",
      });
      audioRef1.current.pause();
      audioRef2.current.pause();
      audioRef1.current.load();
      audioRef2.current.load();
    } else if (props.theme == "rain") {
      setSounds({
        one: "/sounds/rain.mp3",
        two: "/sounds/thunder.mp3",
      });
      audioRef1.current.pause();
      audioRef2.current.pause();
      audioRef1.current.load();
      audioRef2.current.load();
    } else if (props.theme == "forest") {
      setSounds({
        one: "/sounds/birds.mp3",
        two: "",
      });
      audioRef1.current.pause();
      audioRef2.current.pause();
      audioRef1.current.load();
      audioRef2.current.load();
    }
  }, [props.theme]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSound = (e) => {
    const checked = e.target.checked;
    if (e.target.value == "sound1") {
      if (checked) {
        setSound1(true);
        audioRef1.current.play();
      } else {
        setSound1(false);
        audioRef1.current.pause();
      }
    } else if (e.target.value == "sound2") {
      if (checked) {
        setSound2(true);
        audioRef2.current.play();
      } else {
        setSound2(false);
        audioRef2.current.pause();
      }
    }
  };

  return (
    <div className="lg:mt-6 mt-4 ">
      <IconButton
        onClick={handleClickOpen}
        className="text-slate-600 hover:text-slate-400 "
      >
        <VolumeUpIcon
          className="text-slate-400 hover:text-white"
          sx={{
            width: { lg: 35, md: 30, sm: 30 },
            height: { lg: 35, md: 30, sm: 30 },
          }}
        />
      </IconButton>
      <audio src={sounds.one} ref={audioRef1} className="hidden" loop />
      <audio src={sounds.two} ref={audioRef2} className="hidden" loop />

      <div className="w-full">
        <Dialog
          sx={{ padding: 4 }}
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          PaperProps={{
            style: {
              background:
                "linear-gradient(to right bottom, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))",
              paddingVertical: 4,
              paddingHorizontal: 6,
              border: "1px solid gray",
              borderRadius: 20,
              minWidth: "300px",
            },
          }}
          fullWidth
        >
          <DialogTitle className="text-center text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text">
            <p className="font-kumbh font-bold tracking-widest">SETTINGS</p>
          </DialogTitle>
          <DialogContent>
            <div className="p-2">
              <div className="mb-6 sml:m-0 bg-gradient-to-r font-semibold from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent font-kumbh tracking-widest whitespace-nowrap">
                <p className="text-sm sml:text-lg">SET AMBIENCE :</p>
              </div>
              <div className=" flex justify-around items-center">
                {props.theme === "ocean" ? (
                  <BeachSounds
                    waves={sound1}
                    seagulls={sound2}
                    onClick={handleSound}
                  />
                ) : props.theme === "rain" ? (
                  <RainyNightSounds
                    rain={sound1}
                    thunder={sound2}
                    onClick={handleSound}
                  />
                ) : (
                  <ForestSounds forest={sound1} onClick={handleSound} />
                )}
              </div>
            </div>
          </DialogContent>
          <div className="flex justify-center items-center p-4">
            <Button
              className="text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text "
              onClick={handleClose}
            >
              <p className="font-kumbh tracking-widest font-semibold">Done</p>
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default SoundSettings;
