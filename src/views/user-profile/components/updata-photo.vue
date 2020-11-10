<template>
  <div class="updata-photo">
    <img :src="img" ref="image" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="onConfirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { editUserPhoto } from '@/api/user'
export default {
  name: 'updataPhoto',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // console.log(blob)
        this.updataPhoto(blob)
      })
    },
    updataPhoto(blob) {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 2000
      })
      const formData = new FormData()
      formData.append('photo', blob)
      editUserPhoto(formData)
        .then(({ data: res }) => {
          console.log(res)
          // 关闭弹窗
          this.$emit('close')
          // 更新视图
          this.$emit('updataPhoto', res.data.photo)
          //   提示消息
          this.$toast('更新成功')
        })
        .catch(() => {
          this.$toast('操作失败,请稍后重试')
        })
    }
  },
  created() {},
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    // console.log(this.cropper)
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.updata-photo {
  background-color: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    color: #fff;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
    }
  }
  .img {
    width: 100%;
  }
}
</style>
