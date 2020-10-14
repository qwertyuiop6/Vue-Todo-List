<template>
  <div class="user">
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">

      </div> -->
      <!-- <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div> -->
      <el-image :alt="user.name" :src="avatar" :preview-src-list="[avatar]">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
        <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
      </el-image>
      <span>{{ user.name }}</span>
      <div class="input" contenteditable>{{ status }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    avatar: "",
    status: ""
  }),
  created() {
    this.getUserData();
  },
  computed: {
    user() {
      return this.$store.userInfo;
    }
  },
  methods: {
    getUserData() {
      const uid = this.$route.params.uid;
      this.$api.user.get({ uid }).then(res => {
        this.status = res.data.status;
        this.avatar = res.data.avatar;
      });
    }
  }
};
</script>

<style lang="scss">
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
.box-card {
  position: relative;
  width: 370px;
  height: 260px;
  transition: 0.5s;
  &:hover {
    box-shadow: 0 2px 20px 1px rgba(0, 0, 0, 0.16) !important;
  }
  span {
    font-weight: bold;
    position: absolute;
    text-shadow: 2px 2px 3px #b6b6b6e8;
    transform: translateX(-50%);
  }
  span:first-of-type {
    top: 53%;
    letter-spacing: 2px;
  }
  .input {
    transform: translateX(-50%);
    position: absolute;
    left: 50%;
    top: 65%;
    font-size: 14px;
    color: #474747;
    font-family: monospace;
    width: 65%;
    padding: 8px;
    transition: 0.5s 0.1s;
    border-radius: 5px;
    max-height: 55px;
    overflow-y: hidden;
    word-break: keep-all;
    letter-spacing: 1px;
    &:hover {
      outline: none;
      background: #e1e1e154;
      transition: 0.6s;
      text-align: center;
      // border: 1px solid #eee;
    }
    &:focus {
      outline: none;
      // border: 1px solid rgb(168, 168, 168);
      background: #b8b8b852;
      transition: 0.6s;
      text-align: left;
    }
  }
}

.el-image {
  position: absolute;
  width: 100px;
  border-radius: 50%;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  transition: 0.5s;
  &:hover {
    transform: rotate(60deg);
    box-shadow: 1px 2px 11px 1px #9595958f;
  }
}
</style>
