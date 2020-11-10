<template>
  <div class="updata-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="file-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'updataName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    onClickRight() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 2000
      })
      if (!this.message.length) {
        this.$toast('请输入昵称')
      } else {
        editUserProfile({ name: this.message })
          .then(res => {
            // console.log(res)
            // 更新视图
            this.$emit('input', this.message)
            // 关闭弹层
            this.$emit('close')
            // 提示成功
            this.$toast('更新成功')
          })
          .catch(() => {
            this.$toast('操作失败,请稍后重试')
          })
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.updata-name {
  .file-wrap {
    padding: 20px;
  }
}
</style>
