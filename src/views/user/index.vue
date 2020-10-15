<template>
  <div class="user">
    <el-card class="box-card">
      <div v-if="!showUpload">
        <el-tooltip
          open-delay="800"
          class="item"
          effect="dark"
          content="点击更换头像"
          placement="right"
        >
          <el-image :alt="user.name" :src="avatar" @click="showUpload = true">
            <div slot="error" class="image-slot">
              <i class="el-icon-loading"></i>
            </div>
            <div slot="placeholder" class="image-slot"><i class="el-icon-loading"></i></div>
          </el-image>
        </el-tooltip>
        <span class="name">{{ name }}</span>
        <div
          class="input"
          ref="input"
          contenteditable
          @blur="handleBlur"
          @focus="$refs.input.textContent = status"
        >
          {{ status || randomStatus }}
        </div>
      </div>
      <div v-else>
        <el-upload
          drag
          class="avatar-uploader"
          action="diy"
          :show-file-list="false"
          :http-request="uploadAvatar"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-upload"></i>
        </el-upload>
        <div v-if="upSuccess">
          <el-button
            @click="updateUser({ avatar: imageUrl })"
            size="mini"
            type="primary"
            style="margin-top:1rem"
            >设为头像 <i class="el-icon-picture-outline-round"></i
          ></el-button>
        </div>
        <span class="tip" v-else>点击或者拖拽以上传头像,不大于5M</span>
      </div>
      <el-button @click="to('back')" class="to back" size="mini"
        ><i class="el-icon-back"></i
      ></el-button>
      <el-button @click="to('home')" class="to home" size="mini"
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
    name: "",
    showUpload: false,
    imageUrl: "",
    uploadHeader: { authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    upSuccess: false,
    randomStatus: ""
  }),
  created() {
    this.getUserData();
    this.$http
      .get("https://v1.jinrishici.com/tianqi/xingxing")
      .then(({ data }) => {
        this.randomStatus = data.content;
      })
      .catch(err => console.log(err));
  },
  computed: {
    user() {
      return this.$store.userInfo;
    },
    doms() {
      return this.$refs;
    }
  },
  directives: {
    placeholder: {
      bind: function(el, binding) {
        if (typeof binding.value !== "string") return;
        el.textContent = binding.value;
        el.style.display = "none";
      },
      update: function(el, binding) {
        if (typeof binding.value !== "string") return;
        // console.log(binding.value);
        if (binding.value?.trim().length) {
          el.textContent = binding.value;
        }
        el.style.display = "unset";
      }
    }
  },
  methods: {
    getUserData() {
      const uid = this.$route.params.uid;
      this.$api.user.get({ uid }).then(res => {
        Object.assign(this, res.data);
      });
    },
    random() {},
    updateUser({ status, avatar }) {
      const params = Object.assign(
        {},
        status !== undefined ? { status } : {},
        avatar ? { avatar } : {}
      );
      console.log(params);

      this.$api.user
        .update(params)
        .then(res => {
          Object.assign(this, params);
          if (avatar) {
            this.showUpload = false;
            this.avatar = avatar;
          }
        })
        .catch(err => console.log(err.response));
    },
    uploadAvatar(params) {
      console.log(params);
      this.beforeAvatarUpload(params.file);

      let form = new FormData();
      form.append("file", params.file);

      this.$api.user
        .uploadAvatar(form)
        .then(res => {
          this.handleAvatarSuccess(res);
        })
        .catch(err => console.log(err.response));
    },
    //预检图像信息
    beforeAvatarUpload(file) {
      const allowsType = ["jpeg", "png", "gif"];
      const isAllow = !!allowsType.find(type => file.type.endsWith(type));
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isAllow) {
        this.$message.error("上传头像只能是普通图片格式!(jpg,png,gif)");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isAllow && isLt5M;
    },
    //成功
    handleAvatarSuccess(res, file) {
      this.$message.success("头像上传成功!");
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.imageUrl = res.data.avatarURL;
      this.upSuccess = true;
    },
    to(dest = "back") {
      if (dest === "back") {
        if (this.showUpload) this.showUpload = false;
        else this.$router.go(-1);
      } else if (dest === "home") this.$router.push("/");
    },
    handleBlur() {
      const input = this.$refs.input;
      this.updateUser({ status: input.textContent });
      input.scrollTo(0, 0);
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
    top: 66%;
    font-size: 14px;
    color: #777;
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
      // transition: 0.5s;
      // text-indent: -50%;
    }
  }
  .to {
    position: absolute;
    border: unset;
    &:hover,
    &:focus {
      color: #6e6e6e;
      background-color: #e9e9e9;
      font-size: 15px;
      top: -1px !important;
    }
  }
  .back {
    top: 0;
    left: 0;
    &:hover {
      left: -1px;
    }
  }
  .home {
    top: 0;
    right: 0;
    &:hover {
      right: -1px;
    }
  }
}

.el-image {
  position: absolute;
  width: 100px;
  height: 100px;
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
  &:hover {
    border: 1px dashed #389fff;
    .el-icon-upload {
      color: #4aa1ff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #adadad;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.el-upload-dragger {
  width: 130px;
  height: 130px;
  border: none;
  &:focus {
    outline: none;
  }
  .el-icon-upload {
    transition: 0.3s;
    font-size: 2rem;
    color: #cccccc;
  }
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
.el-card,
.el-message {
  overflow: unset;
}
</style>
