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

export const tokenSignin = async cb => {
  try {
    const response = await axios.get("/");
    cb("authorized", response.data.user.username);
  } catch (err) {
    cb("unauthorized", "");
  }
};
