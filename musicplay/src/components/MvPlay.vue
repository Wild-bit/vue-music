<template>
  <div v-show="isShow" class="video_con">
    <video :src="MvUrl" controls="controls"></video>
    <div class="mask">
      <div class="shutoff" @click="offMv"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      MvUrl: "",
      //   isPauseing: true,
    };
  },
  created() {
    this.$bus.$on("mv-url", (url) => {
      this.MvUrl = url;
      console.log(url);
    });
    this.$bus.$on("mvIsShow", () => {
      this.isShow = true;
    });
  },
  methods: {
    offMv() {
      this.isShow = false;
      this.MvUrl = "";
    },
  },
};
</script>

<style scoped>
.video_con video {
  position: fixed;
  width: 800px;
  height: 546px;
  left: 50%;
  top: 50%;
  margin-top: -273px;
  transform: translateX(-50%);
  z-index: 990;
}
.video_con .mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 980;
  background-color: rgba(0, 0, 0, 0.8);
}
.video_con .shutoff {
  position: fixed;
  width: 40px;
  height: 40px;
  background: url("../assets/images/shutoff.png") no-repeat;
  left: 50%;
  margin-left: 400px;
  margin-top: -273px;
  top: 50%;
  z-index: 995;
  cursor: pointer;
}

/* .btnb {
  width: 100px;
  height: 30px;
  border-radius: 30px;
} */
</style>