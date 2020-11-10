<template>
  <div class="updata-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
import dayJs from 'dayjs'
export default {
  name: 'updataBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  methods: {
    onConfirm() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 2000
      })

      editUserProfile({
        birthday: dayJs(this.currentDate).format('YYYY-MM-DD')
      })
        .then(res => {
          // console.log(res)
          // 更新视图
          this.$emit('input', dayJs(this.currentDate).format('YYYY-MM-DD'))
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
