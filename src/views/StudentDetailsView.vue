<template>
    <div>
        <!-- <h1>{{ student.name }}</h1> -->
        <p>Roll Number: {{ Student.rollno }}</p>

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
                    <td>{{ course.score }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>

// import { mapActions } from "vuex";

export default {
    name: "StudentDetailsView",
    computed: {
        Student: function() {
            return this.$store.getters.getStudent;
        }
    }
};
</script>
