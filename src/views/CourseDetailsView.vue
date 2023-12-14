<template>
    <div class="course-details">
        <h1>Name: {{ Course.name }} </h1>
        <p>Credits: {{ Course.credits }}</p>
        <p>Description: {{ Course.description }}
        <p>Prerequisites: {{ Course.prerequisites }}</p>
        <p>Corequisites: {{ Course.corequisites }}</p>
        <p>Level: {{ Course.level }}</p>
    </div>
</template>

<script>
export default {
    name: "CourseDetailsView",
    computed: {
        Course: function() {
            return this.$store.getters.getCourse;
        }
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
