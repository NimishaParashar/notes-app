const notesIntitalState = [];
const notesReducer = (state = notesIntitalState, action) => {
  switch (action.type) {
    case "SET_NOTES": {
      return [...action.payload];
    }

    case "ADD_NOTE": {
      return [...state, action.payload];
    }
    case "UPDATE_NOTE": {
      return state.map(note => {
        if (note._id == action.payload._id) {
          return { ...state, ...action.payload };
        } else {
          return { ...state };
        }
      });
    }

    case "DELETE_NOTE": {
      return state.filter(note => note._id != action.payload._id);
    }
    default: {
      return [...state];
    }
  }
};

export default notesReducer;
