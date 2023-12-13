<template>
    <div>
        <StudentComponent v-for="student in Students" :key="student.id" :student="student"/>
        <!-- {{ student }} -->
    </div>
</template>

<script>

import StudentComponent from "@/components/StudentComponent.vue";
import { mapActions } from "vuex";

export default {
    name: "AdminHomeView",
    components: {
        StudentComponent,
    },
    computed: {
        Students: function() {
            return this.$store.getters.getStudents;
        }
    },
    methods: {
          ...mapActions(["fetchStudents"]),
    },
    created: function() {
        this.fetchStudents();
    }
};
</script>
