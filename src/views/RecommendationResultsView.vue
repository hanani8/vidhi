<template>
    <div>
        <div class="divider divider-error font-bold text-xl">Recommendation Results</div>
        <table class="table table-zebra">
            <thead>
                <tr>
                <th>S. No</th>
                    <th>Course ID</th>
                    <th>Course</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(course, index) in Recommendations" :key="course.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ course }}</td>
                    <td>
                        <router-link :to="'/course/' + course">
                            <i class="fa fa-link"></i>
                        </router-link>
                    </td>
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
