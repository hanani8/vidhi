<template>
    <div>
    <div class="divider divider-error font-bold text-xl">{{ Student.rollno }}</div>
    <button class="btn btn-sm float-right mr-2" @click="editStudentForm">Edit Student</button>

        <div class="stats shadow">
  
          <div class="stat">
            <div class="stat-title">CGPA</div>
            <div class="stat-value">{{Student.cgpa}}</div>
          </div>
          
        </div>
        <table class="table dashed">
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Grade</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="course in Student.completed_courses" :key="course.id">
                    <td>{{ course.course_id }}</td>
                    <td><input type="number" class="input input-bordered max-w-xs" v-model="course.score"/></td>
                    <td><button class="btn btn-sm" @click="editScore(course)">Save</button></td>
                </tr>
            </tbody>
        </table>
        <div class="divider">Add Course</div>
          <form @submit.prevent="addScore">
            <div class="label">
              <span class="label-text text-xs">Course ID</span>
            </div>
              <select class="select select-bordered w-full max-w-xs" v-model="newScore.course_id" required>
                  <option v-for="courseId in availableCourseIds" :key="courseId" :value="courseId">{{ courseId }}</option>
              </select>

              <div class="label">
                <span class="label-text text-xs">Score:</span>
              </div>
              <input class="input input-bordered max-w-xs w-full" type="number" v-model="newScore.score" required>

              <button class="btn btn-sm my-3 block mx-auto" type="submit">Add Score</button>
          </form>


        <!-- Form for editing student details -->
        <div v-if="isEditing" class="divider">Edit Student</div>

        <form v-if="isEditing" @submit.prevent="editStudent">
          <div class="label">
            <span class="label-text text-xs" for="editName">Roll No.</span>
          </div>
            <input class="input input-bordered max-w-xs w-full" type="text" v-model="editData.name" id="editName" required />

            <div class="label">
              <span class="label-text text-xs" for="editPhone">Phone</span>
            </div>
            <input class="input input-bordered max-w-xs w-full" type="text" v-model="editData.phone" id="editPhone" required />

            <button class="btn btn-sm my-3 block mx-auto" type="submit">Save Changes</button>
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
      isEditing: false,
      editData: {
        name: "",
        phone: "",
        rollno: ""
      },
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
        .filter((course) => !addedCourseIds?.includes(course.id))?.map((course) => course.id);
    },
  },
  methods: {
    ...mapActions(["fetchStudent", "fetchCourses","editStudent"]),
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
    editStudentForm() {
      // Set isEditing to true and populate the editData with current student details
      this.isEditing = true;
      this.editData = {
        name: this.Student.name,
        phone: this.Student.phone,
        email: this.Student.rollno + "@ds.study.iitm.ac.in"
      };
    },
    editStudent() {
      // Dispatch the action to edit the student
      const editedData = {
        id: this.Student.id,
        name: this.editData.name,
        phone: this.editData.phone,
        email: this.editData.email
      };
      this.$store.dispatch("editStudent", editedData);

      // Reset the form and fetch updated student details
      this.isEditing = false;
      this.editData = {
        name: "",
        phone: "",
      };
      this.fetchStudent(this.Student.id);
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
