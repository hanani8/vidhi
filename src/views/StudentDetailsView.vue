<template>
    <div>
        <!-- <h1>{{ student.name }}</h1> -->
        <p>Roll Number: {{ Student.rollno }}</p>
        <p>CGPA: {{ Student.cgpa }}</p>
        <p>Contact Number: {{ Student.phone }}</p>

        <table>
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="course in Student.completed_courses" :key="course.id">
                    <td>{{ course.course_id }}</td>
                    <td><input type="text" v-model="course.score"/></td>
                    <td><button @click="editScore(course)">Save changes</button></td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>


<script>

import { mapActions } from "vuex";

export default {
    name: "StudentDetailsView",
    computed: {
        Student: function() {
            return this.$store.getters.getStudent;
        }
    },
    methods: {
        ...mapActions(["fetchStudent"]),
        editScore(course) {
            const courseData = {
                student_id: this.Student.id,
                course_id: course.course_id,
                score: course.score,
                sequence: course.sequence
            };
            this.$store.dispatch("updateScore", courseData);
        }
    },
    created: function(){
        const student_id = this.$route.params.student_id
        this.fetchStudent(student_id);
    }
};
</script>
