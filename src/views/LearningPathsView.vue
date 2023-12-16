<template>
    <div>
        <div class="divider divider-error font-bold text-xl">Learning Paths</div>
        <div v-if="isLoading" class="mx-auto flex flex-col gap-4 w-52">
            <div class="skeleton h-32 w-full"></div>
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
        </div>
        <LearningPath v-for="Path in learningPaths" :key="Path.id" :Path="Path"/>

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
        },
        isLoading: function() {
            return this.learningPaths.length == 0;
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
