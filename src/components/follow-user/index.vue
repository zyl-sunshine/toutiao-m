<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="followLoading"
    @click="onFollow(autId)"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    @click="onFollow(autId)"
    >关注</van-button
  >
</template>

<script>
import { getFollowings, getUnFollowings } from '@/api/user'
export default {
  name: 'followUser',
  components: {},
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      followLoading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onFollow() {
      this.followLoading = true
      try {
        if (this.isFollowed) {
          // 已关注,取消关注
          await getUnFollowings(this.autId)
          // this.article.is_followed = false
        } else {
          // 未关注,添加关注
          await getFollowings(this.autId)
          // this.article.is_followed = true
        }
        this.$emit('updata-is_followed', !this.isFollowed)
        // this.article.is_followed = !this.article.is_followed
      } catch (err) {
        let message = '操作失败,请重试'
        if (err.response && err.response.status === 404) {
          message = '您不能关注您自己'
        }
        this.$toast(message)
      }
      this.followLoading = false
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
