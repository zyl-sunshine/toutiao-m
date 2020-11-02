<template>
  <van-cell class="article-item">
    <template #title>
      <div class="title van-multi-ellipsis--l2">{{ item.title }}</div>
    </template>
    <template #label>
      <div class="cover-warp" v-if="item.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, idx) in item.cover.images"
          :key="idx"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label">
        <span>{{ item.aut_name }}</span>
        <span>{{ item.comm_count }}评论</span>
        <span>{{ item.pubdate | relativeTime }}</span>
      </div>
    </template>
    <van-image
      slot="default"
      class="right-cover"
      fit="cover"
      v-if="item.cover.type === 1"
      :src="item.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.article-item {
  .title {
    color: #3a3a3a;
    font-size: 32px;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label span {
    color: #b4b4b4;
    margin: 0 13px;
    font-size: 22px;
  }
  .cover-warp {
    display: flex;
    .cover-item {
      flex: 1;
      height: 146px;
      padding: 30px 0;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
