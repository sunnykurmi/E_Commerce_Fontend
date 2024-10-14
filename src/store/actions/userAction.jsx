import { toast } from "react-toastify";
import axios from "../../utils/axios";
import { setUser } from "../reducers/userSlice";



// Register a new user
export const registeruser = (userInfo) => async (dispatch) => {
  try {

    const {data} = await axios.post("/register", userInfo);
    // console.log(data)
    await dispatch(setUser(data.newUser));
    return data;
  } catch (error) {
      // console.log(error)
    return error;
  }
};

// Login user
export const loginuser = (userInfo) => async (dispatch) => {
  try {
    const { data } = await axios.post("/login", userInfo);
    // console.log(data)
    document.cookie = `token=${data.token}`;
    await dispatch(setUser(data.user));
    return data;
  } catch (error) {
    // console.log(error)
    return error;
  }
};


export const getuser = () => async (dispatch) => {
  try {
    const {data} = await axios.get("/user");
    // console.log(data.user)
   dispatch(setUser(data.user));
   return data;
  } catch (error) {
    // console.log(error)
    return error;
  }
}

// // Logout user
export const logoutuser = () => async (dispatch) => {
  try {
    await axios.get("/logout");
    await dispatch(setUser({}));
    toast.success('Logout Succesfully!')
  } catch (error) {
    return error;
  }
};

// // Send email for password reset
// export const emailverify = (EmailData) => async () => {
//   try {
//     const { data } = await axios.post("/auth/forgot-password", EmailData);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

// // Change password
// export const changepassword = (passwordData, id) => async () => {
//   try {
//     const { data } = await axios.post(`/auth/reset-password/${id}`, passwordData);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };