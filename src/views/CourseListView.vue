<template>
    <div>
        <h1>Courses</h1>
        <ul>
            <!-- <li v-for="Course in Courses" :key="Course.id" @click="redirectToCourse(Course.id)"> -->
                <CourseComponent v-for="Course in Courses" :key="Course.id" :Course="Course" />
            <!-- </li> -->
        </ul>
    </div>
</template>

<script>

import CourseComponent from "@/components/CourseComponent.vue";
import { mapActions } from "vuex";

export default {
    name: "CourseListView",
    components: {
        CourseComponent,
    },
    computed: {
        Courses: function() {
            return this.$store.getters.getCourses;
        }
    },
    methods: {
          ...mapActions(["fetchCourses"]),
    },
    created: function() {
        this.fetchCourses();
    }
};
</script>
