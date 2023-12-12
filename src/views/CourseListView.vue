<template>
    <div>
        <h1>Courses</h1>
        <ul>
            <li v-for="course in courses" :key="course.id" @click="redirectToCourse(course.id)">
                <h3>{{ course.title }}</h3>
                <p>Rating: {{ course.rating }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            courses: [
                { id: 1, title: 'Course 1', rating: 4.5 },
                { id: 2, title: 'Course 2', rating: 3.8 },
                { id: 3, title: 'Course 3', rating: 4.2 },
                // Add more courses here
            ]
        };
    },
    methods: {
        redirectToCourse(courseId) {
            this.$router.push(`/course/${courseId}`);
        }
    }
};
</script>
