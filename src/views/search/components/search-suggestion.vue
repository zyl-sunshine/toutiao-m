// 联想建议
<template>
  <div class="search-suggestion">
    联想建议
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <template #title>
        <!-- v-html可以绑定渲染带有html标签的字符串 -->
        <div v-html="heightLight(text)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当searchText发生变化的时候会调用该函数
      // debounce函数
      // 参数1:一个函数
      // 参数2:延迟时间,单位是毫秒
      // 返回值:防抖之后的函数
      handler: debounce(function(val) {
        this.loadSearchSuggestion(val)
      }, 500),
      // 首次监视触发
      immediate: true
    }
  },
  methods: {
    loadSearchSuggestion(q) {
      getSuggestion(q)
        .then(({ data }) => {
          // console.log(data)
          this.suggestions = data.data.options
        })
        .catch(() => {
          this.$toast('获取数据失败')
        })
    },
    // 搜索关键字高亮
    heightLight(text) {
      const heightLightStr = `<span class="active">${this.searchText}</span>`
      // RegExp正则表达式构造函数
      // 参数1:匹配模式字符串,它会根据这个字符串创建正则对象
      // 参数2:匹配模式,要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, heightLightStr)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.search-suggestion {
  /deep/span.active {
    color: blue;
  }
}
</style>
