<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" class="title-text" :border="false">
      <van-button
        plain
        round
        type="danger"
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in myChannel"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          slot="icon"
          name="close"
          v-show="isEdit && !fiexdChannel.includes(channel.id)"
        />
        <span class="text" slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell title="频道推荐" class="title-text" :border="false"> </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel.js'
import { setItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  name: 'channelEdit',
  components: {},
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // 所有频道列表数据
      allChannels: [],
      //   叉号按钮的显示与隐藏
      isEdit: false,
      //   固定频道
      fiexdChannel: [0]
    }
  },
  methods: {
    // 获取全部频道列表数据
    loadAllChannels() {
      getAllChannels()
        .then(({ data: res }) => {
          //   console.log(res)
          this.allChannels = res.data.channels
        })
        .catch(() => {
          this.$toast('获取频道数据失败')
        })
    },
    // 添加频道
    onAddChannel(channel) {
      this.myChannel.push(channel)
      // 持久化处理
      if (this.user) {
        // 登录状态
        addUserChannel([
          {
            id: channel.id,
            seq: this.myChannel.length
          }
        ])
          .then(() => {})
          .catch(() => {
            this.$toast('添加失败.请稍后重试')
          })
      } else {
        // 未登录状态
        setItem('CHANNEL_TOKEN', this.myChannel)
      }
    },
    onMyChannelClick(channel, index) {
      // console.log(channel, index)
      if (this.isEdit) {
        // 如果是固定频道,不删除
        if (this.fiexdChannel.includes(channel.id)) {
          return
        }
        // 编辑状态,执行删除频道
        // 参数1:要删除元素的索引
        // 参数2:删除的个数
        this.myChannel.splice(index, 1)
        // 如果当前的索引号小于当前激活的那一项 删除的时候则让激活项-1
        if (index <= this.active) {
          this.$emit('updata-active', this.active - 1, true)
        }
      } else {
        // 非编辑状态,执行切换频道
        // 子组件不能直接修改父组件传过来的值
        // 发送通知让父组件修改
        this.$emit('updata-active', index, false)
      }

      this.deleteChannel(channel)
    },
    // 删除频道
    deleteChannel(channel) {
      if (this.user) {
        //已登录,则将数据更新到线上
        deleteUserChannel(channel.id)
          .then(() => {})
          .catch(() => {
            this.$toast('删除失败,请稍后再试')
          })
      } else {
        //未登录,将数据更新到本地
        setItem('CHANNEL_TOKEN', this.myChannel)
      }
    }
    // async deleteChannel(channel) {
    //   try {
    //     if (this.user) {
    //       await deleteUserChannel(channel.id)
    //     } else {
    //       setItem('CHANNEL_TOKEN', this.myChannel)
    //     }
    //   } catch (err) {
    //     this.$toast('操作失败,请稍后再试')
    //   }
    // }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      // 数组的filter方法:遍历数组,把符合条件的元素存储到新的数组中
      return this.allChannels.filter(channel => {
        //   const channels=[]
        // 数组的find方法:遍历数组,把符合条件的第一个元素返回
        // 这里返回的是不符合条件的元素 存储到filter方法的新数组中
        return !this.myChannel.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // recommendChannels() {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     const ret = this.myChannel.find(myChannel => {
    //       // find遍历数组,找到满足条件的元素项
    //       return myChannel.id === channel.id
    //     })
    //     // 如果我的频道中不包括该频道项,则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   //   把计算结果返回
    //   return channels
    // }
  },
  watch: {},

  created() {
    this.loadAllChannels()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding-top: 85px;
  .title-text {
    font-size: 32px;
    color: #333;
    .edit-btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
    }
  }
  .channel-item {
    width: 160px;
    height: 86px;
    /deep/.van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
    }
    /deep/.van-grid-item__text,
    .text {
      color: #222;
      font-size: 28px;
    }
    /deep/.van-icon-close {
      font-size: 36px;
      position: absolute;
      top: -12px;
      right: -20px;
      z-index: 2;
    }
    .active {
      color: red;
    }
    /deep/.van-grid-item__icon-wrapper {
      position: unset;
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon {
        font-size: 24px;
      }

      .van-grid-item__text {
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
}
</style>
