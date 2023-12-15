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
            const id = courseData.student_id;
            // eslint-disable-next-line no-unused-vars
            const response = await axios.patch(`admin/student/${id}`, courseData);
            await dispatch('fetchStudent', id);
        } catch (error) {
            console.log("Error while updating score:", error);
        }
    },
    addScore: async({ dispatch }, scoreData) => {
        try {
            const id = scoreData.student_id;
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(`student/${id}/scores`, scoreData);
            await dispatch('fetchStudent', id);
        } catch (error) {
            console.log("Error while adding score:", error);
        }
    },
    addStudent: async({ dispatch }, studentData) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(`admin/student`, studentData);
            await dispatch('fetchStudents');
        } catch (error) {
            console.log("Error while adding score:", error);
        }
    },
    deleteStudent: async({ dispatch }, id) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.delete(`admin/student/${id}`);
            await dispatch('fetchStudents');
        } catch (error) {
            console.log("Error while deleting the student:", error);
        }
    },
    editStudent: async({ dispatch }, editedData) => {
        try {
            const id = editedData.id;
            // eslint-disable-next-line no-unused-vars
            const response = await axios.put(`admin/student/${id}`, editedData);
            await dispatch('fetchStudent', id);
        } catch (error) {
            console.log("Error while editing the student:", error);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};