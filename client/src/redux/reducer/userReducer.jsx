import {
  FETCH_USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "../action/userAction";

const INITIAL_STATE = {
  account: {
    jwt: "",
    refresh_token: "",
    username: "",
    role: "",
    email: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      console.log("check actions: ", action);
      return {
        ...state,
        account: {
          jwt: action?.payload?.jwt,
          refresh_token: action?.payload?.refresh_token,
          username: action?.payload?.username,
          role: action?.payload?.role,
          email: action?.payload?.email,
        },
        isAuthenticated: true,
        //Sửa lại nếu Hoàng Anh làm database có các biến DT, EM, EC như Hỏi Dân IT
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          jwt: "",
          refresh_token: "",
          username: "",
          role: "",
          email: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
