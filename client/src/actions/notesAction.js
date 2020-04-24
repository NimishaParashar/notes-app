import axios from "../config/axios";

export const startSetNotes = () => {
  return (dispatch) => {
    axios
      .get("/notes", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log("authTok", localStorage.getItem("authToken"));
        console.log(response.data);
        dispatch(setNotes(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setNotes = (notes) => {
  return { type: "SET_NOTES", payload: notes };
};

export const startAddNote = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/notes", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        //   console.log(response.data);
        console.log("dataNote", response.data);
        dispatch(addNotes(response.data));
        redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addNotes = (notes) => {
  return { type: "ADD_NOTE", payload: notes };
};

export const startUpdateNote = (id, formData, redirect) => {
  return (dispatch) => {
    axios
      .put(`/notes/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log("update", response.data);
        dispatch(updateNote(response.data));
        redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateNote = (notes) => {
  return {
    type: "UPDATE_NOTE",
    payload: notes,
  };
};

export const startDeleteNote = (id) => {
  return (dispatch) => {
    axios
      .delete(`/notes/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log("after deleting" + response.data._id);
        dispatch(deleteNote(response.data._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteNote = (notes) => {
  return {
    type: "DELETE_NOTE",
    payload: notes,
  };
};
