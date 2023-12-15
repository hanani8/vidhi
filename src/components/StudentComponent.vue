<template>
    <div >
        <div @click="redirectToStudentDetail">
            <p>Roll number: {{ student.rollno }} </p>
            <p>Phone number: {{ student.phone }}</p>
            <p>CGPA: {{ student.cgpa }}</p>
            <button @click="deleteStudent">DELETE</button>
        </div>
    </div>
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
