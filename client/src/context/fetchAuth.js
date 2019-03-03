import axios from "../axios-users.js";

export const signin = async (email, password, authorized) => {
  try {
    const creds = { email: email, password: password };
    const response = await axios.post("/signin", creds);
    console.log(response.data);
    if (response.data.token !== undefined) {
      localStorage.setItem("token", response.data.token);
      authorized(true);
    } else {
      console.log("not authorized");
      authorized(false);
    }
  } catch (err) {
    console.log(err);
    authorized(false);
  }
};

export const tokenSignin = async cb => {
  try {
    const response = await axios.get("/");
    const email = response.data.user.email;

    cb("authorized", email);
  } catch (err) {
    cb("unauthorized", "");
  }
};
