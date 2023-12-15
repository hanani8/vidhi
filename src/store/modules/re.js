import axios from 'axios';

const state = {
    Recommendations: [],
    future_courses: []
};

const getters = {
    getRecommendations: (state) => state.Recommendations,
    getFutureCourses: (state) => state.future_courses
}

const mutations = {
    setRecommendations: (state, Recommendations) => {
        state.Recommendations = Recommendations;
    },
    setFutureCourses: (state, future_courses) => {
        state.future_courses = future_courses;
    }
}

const actions = {
    fetchRecommendations: async({ commit }, data) => {
        try {
            const pref_no = data.pref_no;
            const roll_no = data.roll_no;
            const pref_co = data.pref_co;
            const response = await axios.get(`recommendations?roll_no=${roll_no}&pref_no=${pref_no}&pref_co=${pref_co}`);
            const Recommendations = response.data;

            commit('setRecommendations', Recommendations);
        } catch (error) {
            console.log("Error getting recommendation:", error);
        }
    },
    fetchFutureCourses: async({ commit }, data) => {
        try {
            const roll_no = data.roll_no;
            const response = await axios.get(`get_future_courses/${roll_no}`);
            const future_courses = response.data;

            commit('setFutureCourses', future_courses);
        } catch (error) {
            console.log("Error getting future courses:", error);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};