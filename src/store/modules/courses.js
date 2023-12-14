import axios from 'axios';

const state = {
    Courses: [],
    Course: {},
};

const getters = {
    getCourses: (state) => state.Courses,
    getCourse: (state) => state.Course
};

const mutations = {
    setCourses: (state, Courses) => {
        state.Courses = Courses;
    },
    setCourse: (state, Course) => {
        state.Course = Course;
    },
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
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};