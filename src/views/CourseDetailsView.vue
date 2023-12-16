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
            <p v-for="rating in ratings" :key="rating.id">
                {{ rating.rtype }} {{ rating.avg_rating }}
            </p>
        </div>

        <div v-if="isAuthenticated" class="border-2 border-black">
            <p>Rating Types: </p>
            
            <div v-for="ratingType in ratingTypes" :key="ratingType.id">
                {{ ratingType.rtype }} 
                <p v-if="getPreviousRating(ratingType.id) > 0">Previous Rating: {{ getPreviousRating(ratingType.id) }}</p>
                <input v-else type="number" v-model="rating_value" />
            </div>
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
            rating_value: ""
            // currentRatings: {},
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
        },
        rating: function() {
            return this.$store.getters.getRating;
        },
        ratingTypes: function() {
            return this.$store.getters.getRatingTypes;
        }
    },
    methods: {
        ...mapActions(['fetchCourse', 'fetchFeedbacks', 'fetchRatings', 'fetchRating', 'postFeedback', 'deleteFeedback', 'voteFeedback', 'fetchRatingTypes', 'giveRating']),
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
        },
        getPreviousRating(ratingTypeID) {
            const previousRating = this.rating.find(rating => rating.rating_id == ratingTypeID);
            return previousRating ? previousRating.value : 0;
        },
        rate(value, rating_id) {
            this.giveRating({
                course_id: this.$route.params.course_id,
                rating_type: rating_id,
                rating_value: value
            })
        }
    },
    created: function(){
        const course_id = this.$route.params.course_id
        this.fetchCourse(course_id);
        this.fetchFeedbacks(course_id);
        this.fetchRatings(course_id);
        this.fetchRatingTypes();
        this.fetchRating(course_id);

        // this.currentRatings = this.ratingTypes.map(ratingType => ({ id: ratingType.id, value: 0 }));
        // // Update the values based on the existing ratings
        // this.rating.forEach(rating => {
        //         this.currentRatings[rating.rating_id] = rating.value;
        // });
        // console.log(this.currentRatings);

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
