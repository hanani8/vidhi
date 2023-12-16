<template>
    <div>
        <div class="divider divider-error font-bold text-xl">Courses</div>
        <div class="join join-vertical gap-3">
            <CourseComponent class="join-item" v-for="Course in Courses" :key="Course.id" :Course="Course" />
        </div>
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
