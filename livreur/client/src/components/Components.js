import Vue from "vue";
import Navigation from "../navigator/navigation.vue"
import Home from "./Home.vue"

const Components = {
    Navigation,
    Home
}

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])
})

export default Components;