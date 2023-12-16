<template>
    <div @click="redirectToCourseDetail" class="card w-96 bg-base-100 shadow-xl">
        <div class="badge bg-primary badge-xs px-2 py-2">{{ Course.level }}</div>
        <div class="card-body">
          <h2 class="card-title">{{ Course.name }}</h2>
          <div class="card-actions justify-end">
            <div class="badge badge-outline bg-secondary">{{ Course.credits }}</div> 
            <div class="badge badge-outline">{{ Course.prerequisites }}</div> 
            <div class="badge badge-outline">{{ Course.corequisites }}</div>
          </div>
        </div>
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