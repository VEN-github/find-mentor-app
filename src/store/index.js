import { createStore } from "vuex";

import authModule from "./modules/auth/index.js";
import mentorsModule from "./modules/mentors/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    mentors: mentorsModule,
  },
});

export default store;
