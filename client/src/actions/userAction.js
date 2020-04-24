import axios from "../config/axios";
import Swal from "sweetalert2";

export const startRegister = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/users/register", formData)
      .then((response) => {
        console.log("register", response.data);

        if (response.data.hasOwnProperty("errors")) {
          // alert(response.data.message);
          const displayMessages = [];
          for (const key in response.data.errors) {
            displayMessages.push(response.data.errors[key].message);
          }
          Swal.fire({
            title: "Error!",
            text: `${displayMessages.join(", ")}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "You have successfully registered",
            icon: "success",
            confirmButtonText: "Ok",
          });
          redirect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startLogin = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/users/login", formData)
      .then((response) => {
        console.log("login", response.data.error);
        if (response.data.hasOwnProperty("error")) {
          alert(response.data.error);
        } else {
          console.log(response.headers["x-auth"]);
          localStorage.setItem("authToken", response.headers["x-auth"]);
          //redirect()
          console.log("authTokehn is" + response.headers["x-auth"]);
          axios
            .get("/users/account", {
              headers: {
                "x-auth": localStorage.getItem("authToken"),
              },
            })
            .then((response) => {
              console.log("account data" + JSON.stringify(response.data));
              const user = response.data;
              dispatch(setUser(user));
              redirect();
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const startSetUser = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log("acc", response.data);
        dispatch(setUser(response.data));
      });
  };
};

export const startRemoveUser = () => {
  return (dispatch) => {
    axios
      .delete("/users/logout", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log("remove" + response.data);
        // console.log("remove" + response);
        // console.log("remove1" + response.data.notice);
        // if (response.data.notice) {
        //   localStorage.removeItem("authToken");
        //   dispatch(removeUser());
        //   window.location.href = "/users/login";
        // }
        // window.location.href = "/users/login";
      });
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};
