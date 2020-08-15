<template>
  <div class="center_content">
    <!-- 歌曲列表容器 -->
    <div class="song_container">
      <ul v-if="musicList && musicList.length > 0" class="song_list">
        <li
          v-for="(item, index) in musicList"
          :key="item.id"
          @click="playMusic(item.id, index)"
          :class="{ active: index === currentIndex }"
        >
          <!-- 歌曲图标 -->
          <a href="javascript:;"></a>
          <!-- 歌曲名称 -->
          <b>{{ item.name }}</b>
          <span v-if="item.mv!=0" @click.stop="playMv(item,index)">
            <i></i>
          </span>
        </li>
      </ul>
    </div>
    <!-- 歌曲信息容器 -->
    <div class="player_con" :class="{playing:isPlaying}">
      <img src="../assets/images/player_bar.png" class="play_bar" />
      <!-- 黑胶碟片 -->
      <img src="../assets/images/disc.png" class="disc autoRotate" />
      <img :src="musicPic" class="cover autoRotate" />
    </div>
    <!-- 评论容器 -->
    <div class="comment_wrapper">
      <h5 class="title">热门留言</h5>
      <div class="comment_list" v-if="musciComments && musciComments.length >0">
        <dl v-for="comment in musciComments" :key="comment.commentId">
          <!-- 评论人头像 -->
          <dt>
            <img :src="comment.user.avatarUrl" alt />
          </dt>
          <!-- 评论人的名字 -->
          <dd class="name">{{comment.user.nickname}}</dd>
          <!-- 评论人内容 -->
          <dd class="detail">{{comment.content}}</dd>
        </dl>
      </div>
      <img src="../assets/images/line.png" class="right_line" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      musicPic: "",
      isPlaying: false,
      SearchList: [],
      musciComments: [],
      musicurl: "",
      // next: [],
    };
  },
  created() {
    this.$bus.$on("is-playing", () => {
      this.isPlaying = false;
    });
    this.$bus.$on("getNextId", (next) => {
      console.log(next);
      //接收兄弟组件传回来的数据next['歌曲id','歌曲所在index']
      this.playMusic(next[0], next[1]);
    });
    this.$bus.$on("getPrevId", (prev) => {
      console.log(prev);
      this.playMusic(prev[0], prev[1]);
    });
  },
  methods: {
    playMusic(id, index) {
      this.currentIndex = index;
      this.isPlaying = true;
      this.getSongById(id);
      this.getSongDetail(id);
      this.getComment(id);
      this.$bus.$emit("getIndex", this.currentIndex);
    },
    async getSongById(id) {
      const res = await this.$http.get(
        `http://localhost:3000/song/url?id=${id}`
      );
      console.log(res.data.data[0].url);
      this.musicurl = res.data.data[0].url;
      //$emit触发自定义事件,在另一个组件中用$on('自定义事件',回调函数)接收,实现平行组件的通信
      this.$bus.$emit("music-url", this.musicurl);
    },
    async getSongDetail(id) {
      const res = await this.$http.get(
        `http://localhost:3000/song/detail?ids=${id}`
      );
      //   console.log(res.data.songs[0].al.picUrl);
      this.musicPic = res.data.songs[0].al.picUrl;
    },
    async getComment(id) {
      const res = await this.$http.get(
        `http://localhost:3000/comment/hot?type=0&id=${id}`
      );
      this.musciComments = res.data.hotComments;
      // console.log(res.data.hotComments);
    },
    async playMv(item, index) {
      this.isPlaying = false;
      const mvId = item.mv;
      console.log(mvId);
      const res = await this.$http.get(
        `http://localhost:3000/mv/url?id=${mvId}`
      );
      // console.log(res.data.data.url);
      if (this.currentIndex == index) {
        this.musicurl = "";
        this.$bus.$emit("music-url", this.musicurl);
      } else {
        this.currentIndex = index;
      }
      const mvUrl = res.data.data.url;
      this.$bus.$emit("mv-url", mvUrl);
      this.$bus.$emit("mvIsShow");
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

<style scoped>
.center_content {
  height: 435px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  position: relative;
}
.song_container {
  width: 200px;
  height: 435px;
  box-sizing: border-box; /*让内边距向内挤出padding空闲*/
  padding: 10px;
  list-style: none;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
}
.song_list {
  overflow-y: auto;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.song_list::-webkit-scrollbar {
  display: none;
}
.song_list li {
  font-size: 12px;
  color: #333;
  display: flex;
  height: 40px;
  align-items: center;
  width: 580px;
  flex-wrap: wrap;
  padding-left: 10px;
}
.song_list li.active {
  background-color: rgba(240, 240, 240, 0.3);
}
.song_list li a {
  display: block;
  width: 17px;
  height: 17px;
  background-image: url("../assets/images/play.png");
  background-size: 100%;
  margin-right: 5px;
  box-sizing: border-box;
}
.song_list li b {
  font-weight: normal;
  width: 122px;
  /*文字超出是否已省略号的形式显示*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.song_list li span {
  width: 23px;
  height: 17px;
  margin-right: 50px;
}
.song_list li span i {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: url("../assets/images/table.png") left -48px no-repeat;
}
.player_con {
  width: 400px;
  height: 435px;
  position: absolute;
  left: 200px;
  top: 0px;
}

.player_con2 {
  width: 400px;
  height: 435px;
  position: absolute;
  left: 200px;
  top: 0px;
}

.player_con2 video {
  position: absolute;
  left: 20px;
  top: 30px;
  width: 355px;
  height: 265px;
}

.disc {
  position: absolute;
  left: 73px;
  top: 60px;
  z-index: 9;
}

.cover {
  position: absolute;
  left: 125px;
  top: 112px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 8;
}
/*旋转的动画*/
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}

/* 旋转的类名 */
.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
}

/* 是否正在播放 */
.player_con.playing .disc,
.player_con.playing .cover {
  animation-play-state: running;
}
.play_bar {
  position: absolute;
  left: 200px;
  top: -10px;
  z-index: 10;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}

/* 播放杆 转回去 */
.player_con.playing .play_bar {
  transform: rotate(0);
}
.comment_wrapper {
  width: 180px;
  height: 435px;
  list-style: none;
  position: absolute;
  left: 600px;
  top: 0px;
  padding: 25px 10px;
}

.comment_wrapper .title {
  position: absolute;
  top: 0;
  margin-top: 10px;
}

.comment_wrapper .comment_list {
  overflow: auto;
  height: 410px;
}

.comment_wrapper .comment_list::-webkit-scrollbar {
  display: none;
}

.comment_wrapper dl {
  padding-top: 10px;
  padding-left: 55px;
  position: relative;
  margin-bottom: 20px;
}

.comment_wrapper dt {
  position: absolute;
  left: 4px;
  top: 10px;
}

.comment_wrapper dt img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.comment_wrapper dd {
  font-size: 12px;
}

.comment_wrapper .name {
  font-weight: bold;
  color: #333;
  padding-top: 5px;
}

.comment_wrapper .detail {
  color: #666;
  margin-top: 5px;
  line-height: 18px;
}
</style>
