// 历史记录
<template>
  <div class="search-result">
    搜索结果
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item, idx) in list" :key="idx" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onLoad() {
      // 1. 请求获取数据
      getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
        .then(({ data }) => {
          // console.log(data)
          // 2. 将数据添加到列表中
          this.list.push(...data.data.results)
          // 3. 设置加载状态结束
          this.loading = false
          // 4. 判断数据是否加载完毕
          if (data.data.results.length) {
            this.page++
          } else {
            this.finished = true
          }
        })
        .catch(() => {
          this.loading = false
          this.error = true
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
