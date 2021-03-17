import axios from "axios";

/* Constants */
let initialData = {
  fetching: false,
};

let URL = "http://localhost:4000/api/upload";

let GET_IMAGES = "GET_IMAGES";
let GET_IMAGES_SUCCESS = "GET_IMAGES_SUCCESS";
let GET_IMAGES_ERROR = "GET_IMAGES_ERROR";

/* Reducer */
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_IMAGES_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_IMAGES_SUCCESS:
      return { ...state, fetching: false };
    case GET_IMAGES:
      return { ...state, fetching: true };
    default:
      return state;
  }
}

export let getImagesAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_IMAGES,
  });

  return axios
    .get(URL)
    .then((res) => {
      dispatch({
        type: GET_IMAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_IMAGES_ERROR,
        payload: err.response.message,
      });
    });
};
