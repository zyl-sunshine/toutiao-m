<template>
  <div class="updata-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'updataGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    onChange(picker, value, index) {
      //   console.log(`当前值：${value}, 当前索引：${index}`)
      this.gender = index
    },
    onConfirm() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 2000
      })

      editUserProfile({ gender: this.gender })
        .then(res => {
          // console.log(res)
          // 更新视图
          this.$emit('input', this.gender)
          // 关闭弹层
          this.$emit('close')
          // 提示成功
          this.$toast('更新成功')
        })
        .catch(() => {
          this.$toast('操作失败,请稍后重试')
        })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
