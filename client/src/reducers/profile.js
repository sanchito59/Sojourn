import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_WEATHER } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  forecast: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        forecast: [],
      }
    case GET_WEATHER:
      return {
        ...state,
        forecast: payload,
        loading: false,
      }
    default:
      return state;
  }
}
