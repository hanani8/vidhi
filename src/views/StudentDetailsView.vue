<template>
    <div>
        <h1>{{ student.name }}</h1>
        <p>Roll Number: {{ student.roll_no }}</p>

        <table>
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="course in student.courses" :key="course.id">
                    <td>{{ course.name }}</td>
                    <td>{{ course.grade }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            student: {
                name: "John Doe",
                roll_no: "12345",
                courses: [
                    { id: 1, name: "Math", grade: "A" },
                    { id: 2, name: "Science", grade: "B" },
                    { id: 3, name: "English", grade: "A+" },
                ],
            },
        };
    },
};
</script>
