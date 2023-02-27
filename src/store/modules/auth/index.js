import router from "@/router";
import axios from "axios";
import { AES, enc } from "crypto-js";

const authModule = {
  state() {
    return {
      loggedUser: null,
    };
  },
  getters: {
    getLoggedUser({ loggedUser }) {
      return loggedUser;
    },
    isAuthenticated({ loggedUser }) {
      return !!loggedUser;
    },
  },
  mutations: {
    setLoggedUser(state, payload) {
      state.loggedUser = payload;
    },
  },
  actions: {
    async signup(_, credentials) {
      try {
        const { data } = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJbUM42MjJw5B7VbfE6qXcvyqlBzIob4A",
          { ...credentials, returnSecureToken: true }
        );
        await axios.post(
          "https://find-mentor-app-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
          { id: data.localId, ...credentials }
        );
      } catch (error) {
        if (
          (error.code === "ERR_NETWORK" && error.response == undefined) ||
          (error.code === "ERR_BAD_REQUEST" &&
            error.response.data.error.message !== "EMAIL_EXISTS")
        ) {
          throw new Error("Something went wrong. Please try again.");
        } else {
          throw new Error("Email address already exists");
        }
      }
    },
    async login({ commit, dispatch }, credentials) {
      try {
        const login = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJbUM42MjJw5B7VbfE6qXcvyqlBzIob4A",
          { ...credentials, returnSecureToken: true }
        );
        const { data } = await axios.get(
          "https://find-mentor-app-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
        );

        for (const key in data) {
          if (data[key].id === login.data.localId) {
            const user = {
              id: data[key].id,
              firstName: data[key].firstName,
              lastName: data[key].lastName,
              email: data[key].email,
              token: login.data.idToken,
              tokenExpiration: login.data.expiresIn,
            };
            commit("setLoggedUser", user);
            dispatch("storeLoggedUser", user);
          }
        }
      } catch ({ response: { data } }) {
        if (
          data != "not found" &&
          (data.error.message === "INVALID_PASSWORD" ||
            data.error.message === "EMAIL_NOT_FOUND")
        ) {
          throw new Error("Invalid email or password");
        } else {
          throw new Error("Something went wrong. Please try again.");
        }
      }
    },
    logout({ commit }) {
      commit("setLoggedUser", null);
      sessionStorage.removeItem("user");
      router.replace("/");
    },
    async loadLoggedUser({ state, commit }) {
      let user = await JSON.parse(sessionStorage.getItem("user"));

      if (user) {
        var bytes = AES.decrypt(user, "secret key 123");
        var decryptedData = JSON.parse(bytes.toString(enc.Utf8));
        commit("setLoggedUser", decryptedData);
        return;
      }
      sessionStorage.setItem("user", JSON.stringify(state.loggedUser));
    },
    storeLoggedUser(_, user) {
      var ciphertext = AES.encrypt(
        JSON.stringify(user),
        "secret key 123"
      ).toString();
      sessionStorage.setItem("user", JSON.stringify(ciphertext));
    },
  },
};

export default authModule;
