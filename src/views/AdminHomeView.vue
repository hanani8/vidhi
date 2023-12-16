<template>
    <div>
        <div class="divider"><strong>Add Student</strong></div>

        <form @submit.prevent="addStudent">
            <div class="label">
                <span class="label-text text-xs">Email</span>
            </div>
            <input type="email" class="input input-bordered w-full max-w-xs" v-model="newStudent.email" required>

            <div class="label">
                <span class="label-text text-xs">Name</span>
            </div>
            <input type="text" class="input input-bordered w-full max-w-xs" v-model="newStudent.name" required>

            <div class="label">
                <span class="label-text text-xs">Password</span>
            </div>
            <input type="password" class="input input-bordered w-full max-w-xs" v-model="newStudent.password" required>

            <div class="label">
                <span class="label-text text-xs">Phone</span>
            </div>
            <input type="number" class="input input-bordered w-full max-w-xs" v-model="newStudent.phone" required>

            <button class="btn btn-sm block mt-3 mx-auto" type="submit">Submit</button>
        </form>
        <div class="divider"><strong>Students</strong></div>
        <table class="table">
            <thead>
                <tr>
                    <th>Roll No.</th>
                    <th>Phone</th>
                    <th>CGPA</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <StudentComponent v-for="student in Students" :key="student.id" :student="student"/>
            </tbody>
        </table>
        
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
