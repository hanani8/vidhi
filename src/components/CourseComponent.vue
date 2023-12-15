<template>
    <div @click="redirectToCourseDetail" class="border-2 border-black">
        <p>Name: {{ Course.name }} </p>
        <p>Credits: {{ Course.credits }}</p>
        <p>Prerequisites: {{ Course.prerequisites }}</p>
        <p>Corequisites: {{ Course.corequisites }}</p>
    </div>
</template>

<script>

export default {
    props: {
        Course:{
            type: Object,
            required: true,
        },
    },
    methods: {
        redirectToCourseDetail() {
            const id = this.Course.id;
            // this.$store.dispatch("fetchCourse", id);
            this.$router.push("/course/" + id);
        }
    }
};

</script>