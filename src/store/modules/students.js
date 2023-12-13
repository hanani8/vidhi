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
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};