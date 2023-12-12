import axios from 'axios';

const state = {
    learningPaths: [],
};

const getters = {
    getLearningPaths: (state) => state.learningPaths,
};

const mutations = {
    setLearningPaths: (state, learningPaths) => {
        state.learningPaths = learningPaths;
    },
};

const actions = {
    fetchLearningPaths: async ({ commit }) => {
        try {
            const response = await axios.get('learning_paths');
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
