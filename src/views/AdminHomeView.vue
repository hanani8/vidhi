<template>
    <div>
        <form @submit.prevent="addStudent">
            <label for="email">Email:</label>
            <input type="email" v-model="newStudent.email" required>

            <label for="name">Name:</label>
            <input type="text" v-model="newStudent.name" required>

            <label for="password">Password:</label>
            <input type="password" v-model="newStudent.password" required>

            <label for="phone">Phone Number:</label>
            <input type="number" v-model="newStudent.phone" required>

            <button type="submit">Add Student</button>
        </form>
        <StudentComponent v-for="student in Students" :key="student.id" :student="student"/>
        
    </div>
</template>

<script>

import StudentComponent from "@/components/StudentComponent.vue";
import { mapActions } from "vuex";

export default {
    name: "AdminHomeView",
    components: {
        StudentComponent,
    },
    data() {
        return {
            newStudent: {
                email: "",
                name: "",
                password: "",
                phone: "",
            },
        };
    },
    computed: {
        Students: function() {
            return this.$store.getters.getStudents;
        }
    },
    methods: {
          ...mapActions(["fetchStudents","addStudent"]),
          addStudent() {
            // Dispatch the action to add the student
            this.$store.dispatch("addStudent", this.newStudent);

            // Optionally, clear the form after adding the student
            this.newStudent = {
                email: "",
                name: "",
                password: "",
                phone: "",
            };
        },
    },
    created: function() {
        this.fetchStudents();
    }
};
</script>
