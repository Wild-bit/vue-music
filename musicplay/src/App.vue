<template>
  <div id="app">
    <div class="wrap">
      <div class="play-wrap" id="player">
        <!-- 搜索区域 -->
        <SearchBar :musicList="musicList"></SearchBar>
        <!-- 歌曲内容区域 -->
        <CenterContent :musicList="musicList"></CenterContent>
        <!-- 音乐播放区域 -->
        <AudioPlay></AudioPlay>
        <!-- 音乐mv播放区域 -->
        <MvPlay></MvPlay>
      </div>
    </div>
  </div>
</template>

<script>
import CenterContent from "./components/CenterContent";
import SearchBar from "./components/SearchBar";
import AudioPlay from "./components/AudioPlay";
import MvPlay from "./components/MvPlay";
export default {
  name: "App",
  components: {
    CenterContent,
    SearchBar,
    AudioPlay,
    MvPlay,
  },
  data() {
    return {
      musicList: [],
    };
  },
  async created() {
    const res = await this.$http.get(
      "http://localhost:3000/artist/top/song?id=6452"
    );
    this.$bus.$on("search-song", (SearchSongList) => {
      this.musicList = SearchSongList;
    });
    this.musicList = res.data.songs;
    console.log(this.musicList);
  },
};
</script>

<style>
body,
ul,
dl,
dd {
  margin: 0px;
  padding: 0px;
}
video,
audio {
  outline: none;
}
.wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("./assets/images/bg.jpg") no-repeat;
  background-size: 100% 100%;
}
.play-wrap {
  width: 800px;
  height: 544px;
  position: fixed;
  left: 50%;
  margin-left: -400px;
  top: 50%;
  margin-top: -272px;
}
</style>
