import axios from "axios";
import router from "@/router";

const mentorsModule = {
  namespaced: true,
  state() {
    return {
      mentors: [],
      mentor: null,
      changesSaved: false,
    };
  },
  getters: {
    getAllMentors({ mentors }) {
      return mentors;
    },
    getMentor({ mentor }) {
      return mentor;
    },
    changesSaved({ changesSaved }) {
      return changesSaved;
    },
  },
  mutations: {
    setMentors(state, payload) {
      state.mentors = payload;
    },
    setMentor(state, payload) {
      state.mentor = payload;
    },
    changesSaved(state, payload) {
      state.changesSaved = payload;
    },
  },
  actions: {
    async registerMentor({ commit }, data) {
      try {
        const { status } = await axios.post(
          "https://find-mentor-app-default-rtdb.asia-southeast1.firebasedatabase.app/mentors.json",
          data
        );
        if (status === 200) {
          commit("changesSaved", true);
          router.replace("/mentors");
        }
      } catch (error) {
        throw new Error("Something went wrong. Please try again.");
      }
    },
    async loadMentors({ commit }) {
      try {
        const { data, status } = await axios.get(
          "https://find-mentor-app-default-rtdb.asia-southeast1.firebasedatabase.app/mentors.json"
        );

        if (status === 200) {
          const mentors = [];

          for (const key in data) {
            const mentor = {
              id: data[key].id,
              slug: data[key].slug,
              firstName: data[key].firstName,
              lastName: data[key].lastName,
              email: data[key].email,
              about: data[key].about,
              rate: data[key].rate,
              expertise: data[key].expertise,
            };
            mentors.push(mentor);
          }
          commit("setMentors", mentors);
        }
      } catch (error) {
        throw new Error("Something went wrong. Please try again.");
      }
    },
    async loadMentor({ getters, commit, dispatch }, slug) {
      await dispatch("loadMentors");
      const data = getters.getAllMentors.find((mentor) => mentor.slug === slug);

      if (data == undefined) {
        router.push("/404");
        return;
      }
      commit("setMentor", data);
    },
  },
};

export default mentorsModule;
