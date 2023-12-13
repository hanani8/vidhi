<template>
    <div>
        <h1>Learning Path</h1>
        <div>
            upvotes : {{ Path.upvote }}
            <div v-for="(courses, i) in Path.path" :key="i">
                {{ i }}
                <div v-for="(course,j) in  courses" :key="j">
                    {{ course }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import { mapActions } from "vuex";

export default {
  props: {
    Path: {
      type: Object,
      required: true,
        },
  }
};
</script>