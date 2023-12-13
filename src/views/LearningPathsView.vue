<template>
    <div>
        <h1>Learning Paths</h1>
        <ul>
            <LearningPath v-for="Path in learningPaths" :key="Path.id" :Path="Path"/>
        </ul>
    </div>
</template>

<script>

import LearningPath from "@/components/LearningPath.vue";
import { mapActions } from "vuex";

export default {
    name: "LearningPathView",
    components: {
        LearningPath,
    },
    computed: {
        learningPaths: function() {
            return this.$store.getters.getLearningPaths;
        }
    },
    methods: {
          ...mapActions(["fetchLearningPaths"]),
    },
    created: function() {
        this.fetchLearningPaths();
    }
};
</script>

<style scoped>
h1 {
    color: blue;
}
</style>
