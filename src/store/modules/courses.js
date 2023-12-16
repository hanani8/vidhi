import axios from 'axios';

const state = {
    Courses: [],
    Course: {},
    Ratings: [],
    Rating: [],
    Feedbacks: [],
    RatingTypes: []
};

const getters = {
    getCourses: (state) => state.Courses,
    getCourse: (state) => state.Course,
    getRatings: (state) => state.Ratings,
    getRating: (state) => state.Rating,
    getFeedbacks: (state) => state.Feedbacks,
    getRatingTypes: (state) => state.RatingTypes
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
    },
    setRatingTypes: (state, RatingTypes) => {
        state.RatingTypes = RatingTypes;
    },
    setRating: (state, Rating) => {
        state.Rating = Rating;
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
            const response = await axios.get(`course/${id}/aggregate_ratings`);
            const ratings = response.data;
            commit('setRatings', ratings)
        } catch (error) {
            console.log("Error while fetching rating:", error);
        }
    },
    fetchRating: async({ commit }, id) => {
        try {
            const response = await axios.get(`course/${id}/rating`);
            const rating = response.data;
            commit('setRating', rating)
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
    voteFeedback: async({ dispatch }, { feedback, vote }) => {
        try {
            const data = {
                "feedback_id": feedback.id,
                "vote": vote
            }
            const response = await axios.put(`course/feedback/vote`, data);
            // eslint-disable-next-line no-unused-vars
            const feedbacks = response.data;
            dispatch('fetchFeedbacks', feedback.course_id);
        } catch (error) {
            console.log("Error while voting feedback:", error);
        }
    },
    fetchRatingTypes: async({ commit }) => {
        try {
            const response = await axios.get('course/rating_types');
            const ratingTypes = response.data;
            commit('setRatingTypes', ratingTypes);
        } catch (error) {
            console.log("Error while fetching rating types:", error);
        }
    },
    giveRating: async({ dispatch }, { course_id, rating_type, rating_value }) => {
        try {
            const data = {
                "rating_type": rating_type,
                "rating_value": rating_value
            }
            const current_rating = state.Rating.find(rating => rating.rating_id == rating_type);
            let current_rating_value = 0;
            if (current_rating) {
                current_rating_value = current_rating.value;
            }
            if (current_rating_value == 0) {
                const response = await axios.post(`course/${course_id}/rating`, data);
                // eslint-disable-next-line no-unused-vars
                const ratings = response.data;
                dispatch('fetchRatings', course_id);
                dispatch('fetchRating', course_id);
                return;
            } else {
                const response = await axios.put(`course/${course_id}/rating`, data);
                // eslint-disable-next-line no-unused-vars
                const ratings = response.data;
                dispatch('fetchRatings', course_id);
                dispatch('fetchRating', course_id);
                return;
            }
        } catch (error) {
            console.log("Error while giving rating:", error);
        }
    }

};

export default {
    state,
    getters,
    mutations,
    actions,
};