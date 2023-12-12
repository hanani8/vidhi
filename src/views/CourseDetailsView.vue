<template>
    <div class="course-details">
        <h1 class="course-id">{{ courseId }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            courseId: null
        };
    },
    created() {
        // Get the course_id from the URL
        this.courseId = this.$route.params.course_id;

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
