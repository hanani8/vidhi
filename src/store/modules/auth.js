import axios from "axios";

const state = {
    user: null,
    role: null,
};

const actions = {
    async initAuth({ commit }) {
        try {
            const response = await axios.get("isloggedin");
            const user = response.data;
            if (user.msg == "LOGGED_IN") {
                commit("setUser", user.data);
                return user.data;
            } else {
                commit("clearUser");
                return null;
            }
        } catch (error) {
            console.error("Authentication error:", error);
            commit("clearUser");
        }
    },
    // async register({ commit }, userData) {
    //     try {
    //         const response = await axios.post("register", userData);
    //         const user = response.data;
    //         commit("setUser", user);
    //     } catch (error) {
    //         console.error("Registration error:", error);
    //         throw error;
    //     }
    // },
    async login({ commit }, userData) {
        try {
            const response = await axios.post("login_user", userData);
            const user = response.data;
            commit("setUser", user.data);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },
    async logout({ commit }) {

        await axios.delete("logout_user");

        commit("clearUser");

    }

};

const mutations = {
    setUser(state, user) {
        state.user = user;
        state.role = user.role;
    },
    clearUser(state) {
        state.user = null;
        state.role = null;
    }
};


export default {
    state,
    getters: {
        user: (state) => state.user,
        isAuthenticated: (state) => state.user !== null,
        isUser: (state) => state.role == "student",
        isAdmin: (state) => state.role == "admin",
    },
    actions,
    mutations
};