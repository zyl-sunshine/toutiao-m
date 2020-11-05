// 搜索历史
<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="articel"
      v-for="(articel, index) in searchHistories"
      :key="index"
      @click="deleteHistories(articel, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 删除历史记录
    deleteHistories(articel, index) {
      // 如果是删除状态 则删除
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 如果不是删除状态 则搜索
        // console.log(item)
        this.$emit('search', articel)
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
