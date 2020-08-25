import { STATUS_GET } from "../actions/types";

const DEFAULT_STATE = {
  resources: "",
  wallet: "",
  rate: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case STATUS_GET:
      return {
        ...action.payload.status,
      };
    default:
      return state;
  }
};
