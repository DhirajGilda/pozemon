import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { connect } from "react-redux";
import Router from "next/router";
import Loader from "../components/Loader";

function login(props) {
  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  useEffect(async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setProcessing(true);
        const { email, photoURL, uid, displayName } = user;
        const data = { email: email, img: photoURL, id: uid, name: displayName, isLoggedIn: true };
        props.setUser(data);
        setProcessing(false);
        Router.push("/");
      } else {
        console.log('not loggedin');
      }
    });
  }, [])

    

  const register = async () => {
    try {
      setLoading(true);
      setInputEmail("");
      setPassword("");
      const resp = await createUserWithEmailAndPassword(
        auth,
        inputEmail,
        password
      );
      setLoading(false);
      const { email, photoURL, uid, displayName } = resp?.user;
      const data = {
        email: email,
        img: photoURL,
        id: uid,
        name: displayName,
        isLoggedIn: true,
      };
      props.setUser(data);
      Router.push("/");
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log(error);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      setInputEmail("");
      setPassword("");
      const resp = await signInWithEmailAndPassword(auth, inputEmail, password);
      setLoading(false);
      const { email, photoURL, uid, displayName } = resp?.user;
      const data = {
        email: email,
        img: photoURL,
        id: uid,
        name: displayName,
        isLoggedIn: true,
      };
      props.setUser(data);
      Router.push("/");
    } catch (error) {
      setLoading(false);
      alert(error);
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    console.log('a', auth);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { email, photoURL, uid, displayName } = result?.user;
      const data = {
        email: email,
        img: photoURL,
        id: uid,
        name: displayName,
        isLoggedIn: true,
      };
      props.setUser(data);
      Router.push("/");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const loginWithGitHub = async () => {
    try {
      await signInWithRedirect(auth, gitHubProvider);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-zen-back bg-cover bg-fixed h-screen w-full">
      {processing ? <div><Loader/></div> : 
            <div className="grid grid-cols-1 sml:grid-cols-6 h-5/6 w-11/12 lar:w-3/6 mid:w-4/6">
            <div className="rounded-l-lg bg-white hidden sml:flex justify-start items-center flex-col w-full firefox:bg-opacity-60  bg-opacity-20 backdrop-filter backdrop-blur-sm col-span-2">
              <img className="sml:w-60 w-40" src="/clock.png"></img>
              <p className="font-semibold text-white">PomoZen</p>
            </div>
            <div className="p-4 sml:rounded-r-lg sml:rounded-l-none rounded-lg col-span-1  sml:col-span-4 grid grid-rows-8  bg-white">
              <div className="rows-span-2 flex sml:justify-start justify-center items-center sml:px-10 px-5">
                {newUser ? (
                  <p className="text-4xl font-semibold">Sign up</p>
                ) : (
                  <p className="text-4xl font-semibold">Sign in</p>
                )}
              </div>
              <div className="sml:px-10 px-5 flex flex-col justify-center items-center rows-span-4">
                <TextField
                  id="outlined-email"
                  label="Email"
                  value={inputEmail}
                  size="small"
                  onChange={(e) => setInputEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                />
    
                <TextField
                  id="outlined-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  fullWidth
                  size="small"
                  sx={{ marginTop: 2 }}
                />
                {newUser ? (
                  <Button
                    variant="contained"
                    onClick={register}
                    sx={{ marginTop: 2 }}
                    fullWidth
                  >
                    {loading ? (
                      <CircularProgress size={25} sx={{ color: "white" }} />
                    ) : (
                      "Register"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={login}
                    sx={{ marginTop: 2 }}
                    fullWidth
                  >
                    {loading ? (
                      <CircularProgress size={25} sx={{ color: "white" }} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                )}
              </div>
              <div className="flex justify-center items-center rows-span-1">
                <div
                  onClick={loginWithGoogle}
                  className="border max-w-fit border-gray-200 rounded-md p-3 cursor-pointer hover:scale-105 mx-2"
                >
                  <img className="w-6" src="/google.png"></img>
                </div>
                <div
                  onClick={loginWithGitHub}
                  className="border max-w-fit border-gray-200 rounded-md p-3 cursor-pointer hover:scale-105 mx-2"
                >
                  <img className="w-6" src="/github.png"></img>
                </div>
              </div>
              <div className="flex justify-center items-center row-span-1">
                <p className="text-sm text-gray-400">
                  {newUser ? "Already have an account ?" : "Dont have an account ?"}{" "}
                  <a
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setNewUser(!newUser)}
                  >
                    {newUser ? "Sign in" : "Sign up"}
                  </a>
                </p>
              </div>
            </div>
          </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: "SET_USER", value: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
