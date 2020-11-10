<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="inputFile" @change="onInputFile" />
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image round width="30px" height="30px" :src="profileList.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="profileList.name"
      @click="isUpdataNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="profileList.gender === 1 ? '女' : '男'"
      @click="isUpdataGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="profileList.birthday"
      @click="isUpdataBirthdayShow = true"
    />
    <!-- 编辑昵称的弹出层 -->
    <van-popup
      v-model="isUpdataNameShow"
      position="bottom"
      round
      :style="{ height: '80%' }"
    >
      <updata-name
        v-if="isUpdataNameShow"
        @close="isUpdataNameShow = false"
        v-model="profileList.name"
      ></updata-name
    ></van-popup>
    <!-- 修改性别的弹出层 -->
    <van-popup v-model="isUpdataGenderShow" position="bottom" round>
      <updata-gender
        v-if="isUpdataGenderShow"
        v-model="profileList.gender"
        @close="isUpdataGenderShow = false"
      ></updata-gender
    ></van-popup>
    <!-- 修改生日的弹出层 -->
    <van-popup v-model="isUpdataBirthdayShow" position="bottom" round>
      <updata-birthday
        v-if="isUpdataBirthdayShow"
        v-model="profileList.birthday"
        @close="isUpdataBirthdayShow = false"
      ></updata-birthday>
    </van-popup>
    <!-- 修改头像的弹出层 -->
    <van-popup
      v-model="isUpdataPhotoShow"
      position="bottom"
      :style="{ height: '80%' }"
      round
    >
      <updata-photo
        v-if="isUpdataPhotoShow"
        :img="img"
        @close="isUpdataPhotoShow = false"
        @updataPhoto="profileList.photo = $event"
      ></updata-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updataName from './components/updata-name'
import updataGender from './components/updata-gender'
import updataBirthday from './components/updata-birthday'
import updataPhoto from './components/updata-photo'
export default {
  name: 'userProfile',
  components: {
    updataName,
    updataGender,
    updataBirthday,
    updataPhoto
  },
  props: {},
  data() {
    return {
      profileList: {},
      //   编辑昵称弹出层的显示与隐藏
      isUpdataNameShow: false,
      //   控制性别弹出层的显示与隐藏
      isUpdataGenderShow: false,
      //   控制生日弹出层的显示与隐藏
      isUpdataBirthdayShow: false,
      // 控制头像弹出层的显示与隐藏
      isUpdataPhotoShow: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadUserProfile() {
      getUserProfile().then(({ data: res }) => {
        // console.log(res)
        this.profileList = res.data
      })
    },
    onInputFile() {
      const file = this.$refs.inputFile.files[0]
      this.img = window.URL.createObjectURL(file)
      // console.log(img)
      this.isUpdataPhotoShow = true
      this.$refs.inputFile.value = ''
    }
  },
  created() {
    this.loadUserProfile()
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.user-profile {
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
