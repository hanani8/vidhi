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
        <form @submit.prevent="addScore">
            <label for="course_id">Course ID:</label>
            <select v-model="newScore.course_id" required>
                <option v-for="courseId in availableCourseIds" :key="courseId" :value="courseId">{{ courseId }}</option>
            </select>

            <label for="score">Score:</label>
            <input type="text" v-model="newScore.score" required>

            <button type="submit">Add Score</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "StudentDetailsView",
  data() {
    return {
      newScore: {
        course_id: "",
        score: "",
      },
      allCourses: [],
    };
  },
  computed: {
    Student: function () {
      return this.$store.getters.getStudent;
    },
    availableCourseIds() {
      // Filter out course IDs already added to the student's details
      const addedCourseIds = this.Student.completed_courses?.map(
        (course) => course.course_id
      );
      return this.allCourses
        .filter((course) => !addedCourseIds.includes(course.id))?.map((course) => course.id);
    },
  },
  methods: {
    ...mapActions(["fetchStudent", "fetchCourses"]),
    editScore(course) {
      const courseData = {
        student_id: this.Student.id,
        course_id: course.course_id,
        score: course.score,
        sequence: course.sequence,
      };
      this.$store.dispatch("updateScore", courseData);
    },
    addScore() {
      const courseData = {
        student_id: this.Student.id,
        course_id: this.newScore.course_id,
        score: this.newScore.score,
        sequence: this.newScore.sequence,
      };

      // Dispatch the action to add the score
      this.$store.dispatch("addScore", courseData);

      // Optionally, clear the form after adding the score
      this.newScore = {
        course_id: "",
        score: "",
      };
    },
  },
  created: function () {
    const student_id = this.$route.params.student_id;
    this.fetchStudent(student_id);

    // Fetch courses in the created hook and set allCourses
    this.fetchCourses().then(() => {
      this.allCourses = this.$store.getters.getCourses;
    });
  },
};
</script>
