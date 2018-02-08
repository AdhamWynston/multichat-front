let mutations = {
    routeChange(state, loader) {
        if (loader == "start") {
            state.preloader = true
        } else if (loader == "end") {
            state.preloader = false
        }
    }
}
export default mutations
