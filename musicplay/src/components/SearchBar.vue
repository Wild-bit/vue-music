<template>
  <div class="search-bar">
    <input type="text" autocomplete="off" v-model="val" @keyup="getSearchSong" />
    <button @click="prev">上一首</button>
    <button @click="next">下一首</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      val: "",
    };
  },
  created() {
    this.$bus.$on("getIndex", (index) => {
      this.currentIndex = index;
    });
  },
  methods: {
    next() {
      this.currentIndex++;
      if (this.currentIndex > this.$props.musicList.length - 1) {
        this.currentIndex = 0;
      }
      // console.log(this.$props.musicList.length);
      // console.log(this.currentIndex);
      // console.log(this.$props.musicList[this.currentIndex].id);
      //获取下一首歌曲的id
      //当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问。
      let id = this.$props.musicList[this.currentIndex].id;
      //触发自定义事件,并把下一首歌曲的id,index作为 参数传给监听器($on('自定义事件',回调函数))回调
      this.$bus.$emit("getNextId", [id, this.currentIndex]);
    },
    prev() {
      this.currentIndex--;
      if (this.currentIndex == -1) {
        this.currentIndex = this.$props.musicList.length - 1;
      }
      let id = this.$props.musicList[this.currentIndex].id;
      this.$bus.$emit("getPrevId", [id, this.currentIndex]);
    },
    async getSearchSong(e) {
      if (e.keyCode === 13) {
        // console.log(this.val);
        const res = await this.$http.get(
          `http://localhost:3000/search?keywords=${this.val}`
        );
        // console.log(res);
        const SearchSongList = res.data.result.songs;
        this.$bus.$emit("search-song", SearchSongList);
        this.val = "";
      }
    },
  },
  props: {
    musicList: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style>
.search-bar {
  height: 60px;
  background-color: #1eacda;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 12;
}
.search-bar input {
  margin-left: 200px;
  width: 296px;
  height: 34px;
  outline: none;
  border: 0;
  border-radius: 17px;
  background: url("../assets/images/zoom.png") 265px center no-repeat
    rgba(255, 255, 255, 0.45);
  text-indent: 15px; /*缩进15像素 */
}
.search-bar button {
  border: 0;
  border-radius: 17px;
  background-color: rgba(255, 255, 255, 0.5);
  outline: none;
  cursor: pointer;
}
.search-bar button:hover {
  color: red;
}
</style>
