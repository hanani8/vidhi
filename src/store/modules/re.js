import axios from 'axios';

const state = {
    Recommendations: [],
};

const getters = {
    getRecommendations: (state) => state.Recommendations,
}

const mutations = {
    setRecommendations: (state, Recommendations) => {
        state.Recommendations = Recommendations;
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
            console.log(pref_no, pref_co, roll_no);

            commit('setRecommendations', Recommendations);
        } catch (error) {
            console.log("Error getting recommendation:", error);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};