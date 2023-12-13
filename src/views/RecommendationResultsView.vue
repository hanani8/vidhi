<template>
    <div>
        <h1>Recommendation Results</h1>
        <table>
            <thead>
                <tr>
                    <th>Course Name</th>
                </tr>
            </thead>
            <tbody>
                <!-- Render each course row dynamically -->
                <tr v-for="course in Recommendations" :key="course.id">
                    <td>{{ course }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>


export default {
    name: "RecommendationsResultsView",
    computed: {
        Recommendations: function() {
            return this.$store.getters.getRecommendations;
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
