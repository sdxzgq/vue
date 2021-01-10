<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="50%"
    :lock-scroll="true"
    center
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="title == '修改用户'" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.telephone" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-col style="width:300px">
          <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="角色">
        <el-checkbox-group v-model="form.roleIds">
          <el-checkbox label="1" name="type">admin</el-checkbox>
          <el-checkbox label="2" name="type">editor</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="visible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { addUser } from '@/api/user'
export default {
  name: 'UserEdit',
  props: {
  },
  data() {
    return {
      title: '',
      visible: false,
      form: {
        name: '',
        nickname: '',
        password: '',
        phone: '',
        roleIds: [],
        sex: '0',
        telephone: '',
        username: '',
        email: '',
        birthday: ''
      }
    }
  },
  methods: {
    open(row) {
      const _this = this
      if (row == null) {
        _this.title = '新增用户'
        for (const key in _this.form) {
          _this.form[key] = ''
        }
      } else {
        _this.title = '修改用户'
        _this.form = row
        _this.form.roleIds = _this.form.roleIdstr.split(',')
      }
      _this.visible = true
    },
    onSubmit() {
      addUser(this.form).then(res => {
        debugger
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#userEdit{
    margin: 10px 10px;
}
</style>
