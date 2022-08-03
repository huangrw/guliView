<template>
  <div class="app-container">
    <h1>添加讲师</h1>
    <el-form :model="teacherInfo" label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacherInfo.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacherInfo.sort" controls-position="right" :min="1" :max="10">
        </el-input-number>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacherInfo.level" placeholder="讲师头衔">
          <el-option label="首席讲师" :value="2"></el-option>
          <el-option label="高级讲师" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacherInfo.career" placeholder="请输入资历"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacherInfo.intro" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacherInfo.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload"
                   @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '../../../api/teacher/teacher'
import ImageCropper from '../../../components/ImageCropper'
import PanThumb from '../../../components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacherInfo: {},
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0 // 上传组件id
    }
  },

  created() {
    if (this.$route.params.info) {
      this.teacherInfo = this.$route.params.info
    } else {
      this.teacherInfo = {}
    }
  },

  watch: {
    $route: {
      handler(route) {
        console.log(route)
        if (route.path === '/teacher/save') {
          this.teacherInfo = {}
        }
      },
      immediate: true // 此项须设置为true
    }
  },

  methods: {

    saveOrUpdate() {
      if (this.$route.params.info) {
        this.updateTeacher()
      } else {
        this.addTeacher()
      }
    },

    addTeacher() {
      teacher.addTeacher(this.teacherInfo)
        .then(res => {
          this.$message.success('添加成功')
          this.$router.push({ path: '/teacher/list' })
        })
    },

    updateTeacher() {
      teacher.updateTeacher(this.teacherInfo)
        .then(res => {
          this.$message.success('修改成功')
          this.$router.push({ path: '/teacher/list' })
        })
    },
    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      this.teacherInfo.avatar = data.url
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 关闭上传组件
    close() {
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    }

  }

}
</script>

<style>
</style>
