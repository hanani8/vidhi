<template>
    <div class="course-details">
        <h1>Name: {{ Course.name }} </h1>
        <h2>Acronym: {{ Course.acronym }}</h2>
        <p>Credits: {{ Course.credits }}</p>
        <p>Description: {{ Course.description }}
        <p>Prerequisites: {{ Course.prerequisites }}</p>
        <p>Corequisites: {{ Course.corequisites }}</p>
        <p>Level: {{ Course.level }}</p>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "CourseDetailsView",
    computed: {
        Course: function() {
            return this.$store.getters.getCourse;
        },
    },
    methods: {
        ...mapActions(['fetchCourse']),
    },
    created: function(){
        const course_id = this.$route.params.course_id
        this.fetchCourse(course_id);
    }
};
</script>

<style>
.course-id {
    color: red;
    animation: fade-in 1s ease-in-out;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
