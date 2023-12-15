<template>
    <div class="course-details">
        <h1>Name: {{ Course.name }} </h1>
        <h2>Acronym: {{ Course.acronym }}</h2>
        <p>Credits: {{ Course.credits }}</p>
        <p>Description: {{ Course.description }}</p>
        <p>Prerequisites: {{ Course.prerequisites }}</p>
        <p>Corequisites: {{ Course.corequisites }}</p>
        <p>Level: {{ Course.level }}</p>
        <hr>
        <div class="border-2 border-black">
            <p>Ratings: </p>
            <p v-for="rating in ratings" :key="rating.id">{{ rating.rtype }} {{ rating.avg_rating }}</p>
        </div>
        
        <p>Feedbacks: </p>
        <div v-for="feedback in feedbacks" :key="feedback.id">
            <button class="border-2 border-black" @click="_voteFeedback(feedback, 'upvote')">Upvote<span> {{ feedback.upvote }}</span></button>
            <button class="border-2 border-red-600" @click="_voteFeedback(feedback, 'downvote')">Downvote<span> {{ feedback.downvote }}</span></button> 
            {{ feedback.feedback }} 
            By {{ feedback.student_id }}
            
            <div v-if="isAuthenticated">
                <button v-if="feedback.student_id == user.user.id" @click="removeFeedback(feedback)">Delete</button>
            </div>
        </div>

        <div v-if="isAuthenticated">
            <input type="text" v-model="newFeedback" placeholder="Enter your feedback">
            <button @click="addFeedback">Post Feedback</button>
        </div>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "CourseDetailsView",
    data() {
        return {
            newFeedback: "",
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'user']),

        Course: function() {
            return this.$store.getters.getCourse;
        },
        feedbacks: function() {
            return this.$store.getters.getFeedbacks;
        },
        ratings: function() {
            return this.$store.getters.getRatings;
        }
    },
    methods: {
        ...mapActions(['fetchCourse', 'fetchFeedbacks', 'fetchRatings', 'postFeedback', 'deleteFeedback', 'voteFeedback']),
        addFeedback() {
            this.postFeedback({
                id: this.$route.params.course_id,
                feedback: this.newFeedback
            });
            this.newFeedback = "";
        },
        removeFeedback(feedback) {
            this.deleteFeedback(feedback.course_id);
        },
        _voteFeedback(feedback, vote) {
            this.voteFeedback({
                id: this.$route.params.course_id,
                vote: vote
            });
        }
        
    },
    created: function(){
        const course_id = this.$route.params.course_id
        this.fetchCourse(course_id);
        this.fetchFeedbacks(course_id);
        this.fetchRatings(course_id)
    }
};
</script>

<style>
.course-id {
    color: red;
    animation: fade-in 1s ease-in-out;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
