import Vue from 'vue'
import Vuex from 'vuex'

import auth from "@/store/modules/auth.js"
import learning_paths from "@/store/modules/learning_paths.js"
import courses from "@/store/modules/courses.js"
import students from "@/store/modules/students.js"
import re from "@/store/modules/re.js"



Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        learning_paths,
        courses,
        students,
        re
    }
})