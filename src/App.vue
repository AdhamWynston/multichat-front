<template>
<div id="app">
    <preloader v-show="this.$store.state.preloader"></preloader>
    <router-view></router-view>
</div>
</template>
<script>
import preloader from "./components/layout/preloader";

export default {
    name: 'app',
    components: {
        preloader
    }
}
</script>
