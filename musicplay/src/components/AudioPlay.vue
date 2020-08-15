<template>
  <div class="audio-con">
    <audio controls class="myaudio" :src="musicUrl" @pause="pause" autoplay></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicUrl: "",
    };
  },
  methods: {
    pause() {
      this.$bus.$emit("is-playing");
    },
  },
  created() {
    this.$bus.$on("music-url", (url) => {
      this.musicUrl = url;
    });
  },
};
</script>

<style>
.audio-con {
  height: 50px;
  background-color: #f1f3f4;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.myaudio {
  width: 100%;
  height: 40px;
  outline: none;
  margin-top: 5px;
  background-color: #f1f3f4;
}
</style>
