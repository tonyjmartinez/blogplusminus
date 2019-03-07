import axios from "../axios-users.js";

export const signin = async (email, password, authorized) => {
  try {
    const creds = { email: email, password: password };
    const response = await axios.post("/signin", creds);
    if (response.data.token !== undefined) {
      localStorage.setItem("token", response.data.token);
      authorized(true, response.data.user);
    } else {
      authorized(false, "");
    }
  } catch (err) {
    authorized(false, "");
  }
};

export const signup = async (email, password, success) => {
  const creds = { email: email, password: password };
  const response = await axios.post("/signup", creds);
  console.log(response.data);
};

export const tokenSignin = async cb => {
  try {
    const response = await axios.get("/tokenSignin");
    cb("authorized", response.data.user);
  } catch (err) {
    cb("unauthorized", "");
  }
};
