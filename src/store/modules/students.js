import axios from 'axios';

const state = {
    Students: [],
    Student: [],
};

const getters = {
    getStudents: (state) => state.Students,
    getStudent: (state) => state.Student
};

const mutations = {
    setStudents: (state, Students) => {
        state.Students = Students['data'];
    },
    setStudent: (state, Student) => {
        state.Student = Student['data'];
    },
};

const actions = {
    fetchStudents: async({ commit }) => {
        try {
            const response = await axios.get('admin/student');
            const Students = response.data;
            commit('setStudents', Students);
        } catch (error) {
            console.log("Error while fetching all students:", error);
        }
    },
    fetchStudent: async({ commit }, id) => {
        try {
            const response = await axios.get(`student/${id}`);
            const Student = response.data;
            commit('setStudent', Student)
        } catch (error) {
            console.log("Error while fetching student:", error);
        }
    },
    updateScore: async({ dispatch }, courseData) => {
        try {
            console.log(courseData);
            const id = courseData.student_id;
            // eslint-disable-next-line no-unused-vars
            const response = await axios.patch(`admin/student/${id}`, courseData);
            await dispatch('fetchStudent', id);
        } catch (error) {
            console.log("Error while updating score:", error);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};