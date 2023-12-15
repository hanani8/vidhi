import axios from 'axios';

const state = {
    Courses: [],
    Course: {},
    Ratings: [],
    Feedbacks: []
};

const getters = {
    getCourses: (state) => state.Courses,
    getCourse: (state) => state.Course,
    getRatings: (state) => state.Ratings,
    getFeedbacks: (state) => state.Feedbacks
};

const mutations = {
    setCourses: (state, Courses) => {
        state.Courses = Courses;
    },
    setCourse: (state, Course) => {
        state.Course = Course;
    },
    setRatings: (state, Ratings) => {
        state.Ratings = Ratings;
    },
    setFeedbacks: (state, Feedbacks) => {
        state.Feedbacks = Feedbacks;
    }
};

const actions = {
    fetchCourses: async({ commit }) => {
        try {
            const response = await axios.get('courses');
            const Courses = response.data;
            commit('setCourses', Courses);
        } catch (error) {
            console.log("Error while fetching all courses:", error);
        }
    },
    fetchCourse: async({ commit }, id) => {
        try {
            const response = await axios.get(`course/${id}`);
            const Course = response.data;
            commit('setCourse', Course)
        } catch (error) {
            console.log("Error while fetching course:", error);
        }
    },
    fetchRatings: async({ commit }, id) => {
        try {
            const response = await axios.get(`course/${id}/rating`);
            const ratings = response.data;
            commit('setRatings', ratings)
        } catch (error) {
            console.log("Error while fetching rating:", error);
        }
    },
    fetchFeedbacks: async({ commit }, id) => {
        try {
            const response = await axios.get(`course/${id}/feedback`);
            const feedback = response.data;
            commit('setFeedbacks', feedback)
        } catch (error) {
            console.log("Error while fetching feedback:", error);
        }
    },
    postFeedback: async({ dispatch }, { id, feedback }) => {
        try {
            const data = {
                "feedback": feedback
            }
            const response = await axios.post(`course/${id}/feedback`, data);
            // eslint-disable-next-line no-unused-vars
            const feedbacks = response.data;
            dispatch('fetchFeedbacks', id);
        } catch (error) {
            console.log("Error while posting feedback:", error);
        }
    },
    deleteFeedback: async({ dispatch }, id) => {
        try {
            const response = await axios.delete(`course/${id}/feedback`);
            // eslint-disable-next-line no-unused-vars
            const feedbacks = response.data;
            dispatch('fetchFeedbacks', id);
        } catch (error) {
            console.log("Error while deleting feedback:", error);
        }
    },
    voteFeedback: async({ dispatch }, { id, vote }) => {
        try {
            const data = {
                "vote": vote
            }
            const response = await axios.put(`course/${id}/feedback/vote`, data);
            // eslint-disable-next-line no-unused-vars
            const feedbacks = response.data;
            dispatch('fetchFeedbacks', id);
        } catch (error) {
            console.log("Error while voting feedback:", error);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};