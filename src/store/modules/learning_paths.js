import axios from 'axios';

const state = {
    learningPaths: [],
};

const getters = {
    getLearningPaths: (state) => state.learningPaths,
};

const mutations = {
    setLearningPaths: (state, learningPaths) => {
        state.learningPaths = learningPaths["data"];
    },
};

const actions = {
    fetchLearningPaths: async({ commit }) => {
        try {
            const response = await axios.get('learningpaths');
            const learningPaths = response.data;
            commit('setLearningPaths', learningPaths);
        } catch (error) {
            console.error('Error fetching learning paths:', error);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};