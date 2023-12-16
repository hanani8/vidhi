<template>
        <tr>
            <td @click="redirectToStudentDetail">{{ student.rollno }} </td>
            <td @click="redirectToStudentDetail">{{ student.phone }}</td>
            <td @click="redirectToStudentDetail">{{ student.cgpa }}</td>
            <td><button class="btn btn-xs" @click="deleteStudent">DELETE</button></td>
        </tr>
</template>

<script>

export default {
    props: {
        student:{
            type: Object,
            required: true,
        },
    },
    methods: {
        redirectToStudentDetail() {
            const id = this.student.id;
            // this.$store.dispatch("fetchStudent", id);
            this.$router.push("/student/" + id);
        },
        deleteStudent() {
            const id = this.student.id;
            this.$store.dispatch("deleteStudent", id);
        }
    }
};

</script>
