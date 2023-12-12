<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Grade</th>
                    <th>Roll Number</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in students" :key="student.id">
                    <td>{{ student.name }}</td>
                    <td>{{ student.grade }}</td>
                    <td>{{ student.rollNumber }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            students: [
                { id: 1, name: 'John Doe', grade: 'A', rollNumber: '123' },
                { id: 2, name: 'Jane Smith', grade: 'B', rollNumber: '456' },
                { id: 3, name: 'Bob Johnson', grade: 'C', rollNumber: '789' },
            ],
        };
    },
};
</script>
