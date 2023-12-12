<template>
    <div>
        <h1>Learning Paths</h1>
        <ul>
            <li v-for="path in learningPaths" :key="path.id">
                {{ path.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            learningPaths: [
                { id: 1, name: 'Path 1' },
                { id: 2, name: 'Path 2' },
                { id: 3, name: 'Path 3' },
            ],
        };
    },
};
</script>

<style scoped>
h1 {
    color: blue;
}
</style>
