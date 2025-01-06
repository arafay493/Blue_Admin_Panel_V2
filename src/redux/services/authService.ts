import axiosInstance from "../axios";
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice";
import { AppDispatch } from "../store";
interface LoginResponse {
  statusCode: number;
  succeeded: boolean;
  data: {
    jwToken: string;
    refreshToken: string;
    userId: string;
    userName: string;
    userTypeId: number;
  };
  message: string;
  errors: string | null;
}

export const login = (
  credentials: { userID: string; password: string },
  callback?: () => void
) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());

  try {
    const response = await axiosInstance.post<LoginResponse>("/Auth/Login", {
      userID: credentials.userID,
      password: credentials.password,
    });

    const {
      jwToken,
      refreshToken,
      userId,
      userName,
      userTypeId,
    } = response.data.data;
    const { succeeded, message } = response.data;

    if (response.data.statusCode === 200) {
      dispatch(
        loginSuccess({
          jwToken,
          refreshToken,
          message,
          userId,
          userName,
          succeeded,
          userTypeId,
        })
      );
    } else {
      dispatch(loginFailure(response.data.message));
    }

    if (callback) {
      callback();
    }

    return response.data;
  } catch (error) {
    let errorMessage = "Failed to login";

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    dispatch(loginFailure(errorMessage));
  }
};
