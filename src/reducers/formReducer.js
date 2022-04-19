import { FORM_DATA_SAVE } from "../const";

export const formReducer = (state = {}, action) => {
  switch (action.type) {
    case FORM_DATA_SAVE:
      return {
        formData: action.payload,
      };

    default:
      return state;
  }
};

