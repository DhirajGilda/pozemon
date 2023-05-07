import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

import { connect } from "react-redux";

const TodoList = (props) => {
  const [task, setTask] = useState("");

  const handleTask = (e) => {
    setTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (task !== "") {
      props.setTask(task);
    }
    setTask("");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full mid:p-4 py-4 px-2">
        <div className="mr-3 flex-grow">
          <input
            type="text"
            className={
              "flex-grow block w-full px-3 py-1.5 text-base font-normal bg-clip-text border border-dashed  rounded-lg transition ease-in-out focus:text-transparent  focus:border-none focus:ring-1 focus:outline-none " +
              (props.theme === "ocean"
                ? "bg-white focus:ring-[#19f0f0]  border-white "
                : props.theme === "rain"
                ? "bg-white focus:ring-[#7c2d12] border-[#7c2d12] "
                : "bg-white focus:ring-green-500 border-green-500")
            }
            id="exampleFormControlInput1"
            placeholder="Tasks . . ."
            onChange={handleTask}
            onKeyDown={(e) => {
              if(e.key == 'Enter'){
                addTask(e);
              }
            }}
            value={task}
            autoComplete="off"
            required
          />
        </div>

        <div>
          <IconButton
            onClick={addTask}
            sx={{
              color: "white",
              border: 2,
              borderColor:
                props.theme === "ocean"
                  ? "cyan"
                  : props.theme === "rain"
                  ? "#7c2d12"
                  : "green",
            }}
            aria-label="upload picture"
            component="span"
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <div
        className={
          "mid:px-4 pb-2 px-2 divide-y divide-dashed  " +
          (props.theme === "ocean"
            ? "divide-white"
            : props.theme === "rain"
            ? "divide-orange-800"
            : "divide-green-400")
        }
      >
        {props.tasks?.map((task, index) => {
          return (
            <div key={index} className="py-3 flex justify-between items-center">
              <div className="flex-1 mr-4 overflow-hidden">
                <p
                  className={
                    "break-words text-sm whitespace-normal " +
                    (task?.status === true ? "line-through text-gray-300" : "")
                  }
                >
                  {task?.content}
                </p>
              </div>
              <div className="flex justify-around items-center">
                <IconButton
                  className="opacity-50 hover:opacity-100"
                  size="small"
                  onClick={() => props.setStatus(task?.id)}
                  sx={{
                    height:30,
                    width:30,
                    color: "white",
                    border: 2,
                    borderColor:
                      props.theme === "ocean"
                        ? "cyan"
                        : props.theme === "rain"
                        ? "#9a3412"
                        : "green",
                    marginRight: 1.5,
                  }}
                  aria-label="upload picture"
                  component="span"
                >
                  <DoneIcon sx={{heigth:20, width:20}}  />
                </IconButton>
                <IconButton
                  className="opacity-50 hover:opacity-100"
                  onClick={() => props.deleteTask(task?.id)}
                  sx={{
                    height:30,
                    width:30,
                    color: "white",
                    border: 2,
                    borderColor:
                      props.theme === "ocean"
                        ? "cyan"
                        : props.theme === "rain"
                        ? "#9a3412"
                        : "green",
                  }}
                  aria-label="upload picture"
                  component="span"
                >
                  <DeleteIcon sx={{heigth:20, width:20}} />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTask: (task) => dispatch({ type: "SET_TASK", value: task }),
    deleteTask: (id) => dispatch({ type: "DELETE_TASK", value: id }),
    setStatus: (id) => dispatch({ type: "SET_STATUS", value: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
