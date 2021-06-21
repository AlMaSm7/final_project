<template>
    <div class="video-container">
        <video :src="require(`../assets/VIDEOS/${video_src}`)" controls></video>
        <button @click="like()"></button>
        <button></button>
    </div>
</template>

<script>
import store from '../store'
export default {
    data() {
        return {
            video_src: ""
        }
    },
    created() {
        this.video_src = store.state.video
    },
}
</script>

<style>

</style>