import axios from "../config/axios";

export const startSetCategories = () => {
  return (dispatch) => {
    axios
      .get("/categories", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log("authTokcat", localStorage.getItem("authToken"));
        console.log(response.data);
        dispatch(setCategories(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setCategories = (category) => {
  return { type: "SET_CATEGORY", payload: category };
};

export const startAddCategory = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/categories", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addCategory(response.data));
        redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addCategory = (category) => {
  return {
    type: "ADD_CATEGORY",
    payload: category,
  };
};

export const startEditCategories = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/categories/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log("catehory" + response.data);
        dispatch(editCategories(response.data));
        redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editCategories = (categories) => {
  return {
    type: "UPDATE_CATEGORY",
    payload: categories,
  };
};

export const startRemoveCategories = (id) => {
  return (dispatch) => {
    axios
      .delete(`/notes/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log("cat id delete", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeCategories = (categories) => {
  return {
    type: "DELETE_CATEGORY",
    payload: categories,
  };
};
