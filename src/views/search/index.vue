<!--  -->
<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @clear="flag = '0'"
      />
    </form>
    <!-- 历史记录 -->
    <search-history
      v-if="flag === '0'"
      :searchHistories="searchHistories"
      @clear-search="searchHistories = []"
      @search="onSearch"
    ></search-history>
    <!-- 搜索结果 -->
    <search-result v-if="flag === '2'" :searchText="searchText"></search-result>
    <!-- 联想建议 -->
    <search-suggestion
      v-if="flag === '1'"
      :searchText="searchText"
      @search="onSearch"
    ></search-suggestion>
  </div>
</template>

<script>
import searchResult from './components/search-result'
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'searchIndex',
  components: {
    searchResult,
    searchSuggestion,
    searchHistory
  },
  props: {},
  data() {
    return {
      searchText: '',
      // 0:历史记录
      // 1:联想建议
      // 2:搜索结果
      flag: '0',
      searchHistories: getItem('SEARCH_HISTORIES') || []
    }
  },
  computed: {},
  methods: {
    onSearch(val) {
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.flag = '2'
    },
    onCancel() {
      this.$router.back()
    }
  },
  watch: {
    // 监听输入框里值的变化 控制联想建议的显示与隐藏
    searchText(val) {
      if (val.length > 0 && this.flag !== '1') {
        this.flag = '1'
      }
      if (val.length === 0) {
        this.flag = '0'
      }
    },
    searchHistories(val) {
      setItem('SEARCH_HISTORIES', val)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
