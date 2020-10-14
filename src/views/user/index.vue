<template>
  <div class="user">
    <el-card class="box-card">
      <div v-if="!showUpload">
        <el-image :alt="user.name" :src="avatar" @click="showUpload = true">
          <div slot="error" class="image-slot">
            <i class="el-icon-loading"></i>
          </div>
          <!-- <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div> -->
        </el-image>
        <span class="name">{{ user.name }}</span>
        <div class="input" ref="input" contenteditable @blur="updateStatus">{{ status }}</div>
      </div>
      <div v-else>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-if="upSuccess">
          <el-button size="mini" type="primary" style="margin-top:1rem"
            >设为头像 <i class="el-icon-picture-outline-round"></i
          ></el-button>
        </div>
        <span class="tip" v-else>点击上传头像,不大于5M</span>
      </div>
      <el-button @click="to('back')" class="back" size="mini"
        ><i class="el-icon-back"></i
      ></el-button>
      <el-button @click="to('home')" class="home" size="mini"
        ><i class="el-icon-s-home"></i
      ></el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    avatar: "",
    status: "",
    showUpload: false,
    imageUrl: "",
    upSuccess: false
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
    },
    updateStatus() {
      const status = this.$refs.input.textContent;
      this.$api.user
        .update({ status })
        .then(res => {})
        .catch(err => console.log(err.response));
    },
    //预检图像信息
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt5M;
    },
    //成功
    handleAvatarSuccess(res, file) {
      this.$message.success("头像上传成功!");
      this.imageUrl = URL.createObjectURL(file.raw);
      this.upSuccess = true;
    },
    to(dest = "back") {
      if (dest === "back") {
        if (this.showUpload) this.showUpload = false;
        else this.$router.push("/");
      } else if (dest === "home") this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
}
.box-card {
  position: relative;
  width: 370px;
  height: 260px;
  transition: 0.5s;
  &:hover {
    box-shadow: 0 2px 20px 1px rgba(0, 0, 0, 0.16) !important;
  }
  span.name {
    font-weight: bold;
    position: absolute;
    text-shadow: 2px 2px 3px #b6b6b6e8;
    transform: translateX(-50%);
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
      background: #e1e1e154;
    }
    &:focus {
      outline: none;
      // border: 1px solid rgb(168, 168, 168);
      background: #c8c8c86b;
      transition: 0.5s;
      // text-indent: -50%;
    }
  }
  .back,
  .home {
    position: absolute;
    border: unset;
  }
  .back {
    top: 0;
    left: 0;
  }
  .home {
    top: 0;
    right: 0;
  }
  .el-button:focus,
  .el-button:hover {
    color: #6e6e6e;
    background-color: #e9e9e9;
    font-size: 15px;
  }
}

.el-image {
  position: absolute;
  width: 100px;
  border-radius: 50%;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  transition: 1s;
  &:hover {
    // box-shadow: 1px 2px 11px 1px #9595958f;
    transform: translateX(-50%) rotate(360deg);
  }
  .image-slot {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #c2c2c2;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #3c3c3c;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #adadad;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
.tip {
  color: #444;
  font-size: 13px;
  margin-top: 1rem;
  display: block;
}
</style>
