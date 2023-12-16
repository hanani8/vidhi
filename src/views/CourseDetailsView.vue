<template>
    <div class="course-details mb-3">
        <div class="divider divider-error font-bold text-xl">{{Course.name}}</div>
        <p>{{Course.description}}</p>
        <div class="stats shadow mt-6">
  
            <div class="stat place-items-center">
              <div class="stat-title">Acronym</div>
              <div class="stat-value">{{Course.acronym}}</div>
            </div>
            
            <div class="stat place-items-center">
              <div class="stat-title">Credits</div>
              <div class="stat-value text-secondary">{{Course.credits}}</div>
              <div class="stat-desc text-secondary-content">{{Course.level}}</div>
            </div>
            
            <div class="stat place-items-center overflow-auto">
              <div class="stat-title">Pre/Co</div>
              <div class="stat-value">{{Course.prerequisites}}</div>
              <div class="stat-desc">↘︎ {{Course.corequisites}}</div>
            </div>
        </div>
        <div class="divider">Ratings</div>
        <div class="stats shadow mt-3 overflow-auto">

            <div v-for="rating in ratings" :key="rating.id" class="stat place-items-center overflow-auto">
                <div class="stat-title">{{ rating.rtype }}</div>
                <div class="stat-value">{{rating.avg_rating}}</div>
            </div>

        </div>

        <div class="label" v-if="isAuthenticated">
            <span class="label-text">Rate</span>
        </div>

        <table class="table" v-if="isAuthenticated">
            <thead>
                <tr>
                    <td>
                        Rating Type
                    </td>
                    <td>
                        Rating Value
                    </td>
                    <td>
                        Action
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ratingType in ratingTypes" :key="ratingType.id">
                    <td>
                        {{ ratingType.rtype }}
                    </td>
                    <td>
                        <p v-if="getPreviousRating(ratingType.id) > 0">
                            {{ getPreviousRating(ratingType.id) }}
                        </p>
                        <input v-else type="number" class="input input-bordered w-full max-w-xs" v-model="ratingValues[ratingType.id]" />
                    </td>
                    <td>
                        <button class="btn btn-xs" v-if="getPreviousRating(ratingType.id) === 0" @click="rate(ratingValues[ratingType.id], ratingType.id)">
                            Rate
                        </button>
                    </td>
                </tr>
            </tbody>

        </table>
        
        <div class="label">
            <span class="label-text">Feedbacks</span>
        </div>
        
        <div v-if="isAuthenticated" class="flex flex-row justify-around">
            <input type="text" class="input input-bordered w-full max-w-xs" v-model="newFeedback" placeholder="Enter your feedback">
            <button class="btn btn-xs my-auto" @click="addFeedback">Post Feedback</button>
        </div>

        <div class="mt-3 px-3 flex flex-row gap-3 justify-between" v-for="feedback in feedbacks" :key="feedback.id">
            <div class="join my-auto">
                <button class="btn btn-xs join-item" @click="_voteFeedback(feedback, 'upvote')">+<span> {{ feedback.upvote }}</span></button>
                <button class="btn btn-xs join-item" @click="_voteFeedback(feedback, 'downvote')">-<span> {{ feedback.downvote }}</span></button> 
            </div>
            <div class="ml-3">{{ feedback.feedback }}</div>
            <div v-if="isAuthenticated" class="my-auto">
                <button class="badge badge-outline" v-if="feedback.student_id == user.user.id" @click="removeFeedback(feedback)">x</button>
            </div>
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
            rating_value: "",
            ratingValues: {},
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
                feedback: feedback,
                vote: vote
            });
        },
        getPreviousRating(ratingTypeID) {
            const previousRating = this.rating.find(rating => rating.rating_id == ratingTypeID);
            return previousRating ? previousRating.value : 0;
        },
        rate(value, rating_id) {
            this.$set(this.ratingValues, rating_id, value);

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
        if(this.$store.getters.isAuthenticated) {
            this.fetchRating(course_id);
        }

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
