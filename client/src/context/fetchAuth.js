import axios from "axios";

export const signin = async (email, password) => {
  try {
    const creds = { email: email, password: password };
    const response = await axios.post("http://localhost:3090/signin", creds);
    console.log(response.data);
    if (response.data.token !== undefined) {
      localStorage.setItem("token", response.data.token);
    }
  } catch (err) {
    console.log(err);
  }
};
