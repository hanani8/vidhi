<template>
    <div>
        <h1>Recommendation Results</h1>
        <table>
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Recommendation Score</th>
                </tr>
            </thead>
            <tbody>
                <!-- Render each course row dynamically -->
                <tr v-for="course in recommendedCourses" :key="course.id">
                    <td>{{ course.name }}</td>
                    <td>{{ course.recommendationScore }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recommendedCourses: [
                // Add your recommended courses data here
                { id: 1, name: 'Course A', recommendationScore: 0.9 },
                { id: 2, name: 'Course B', recommendationScore: 0.8 },
                { id: 3, name: 'Course C', recommendationScore: 0.7 },
                // ...
            ]
        };
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
