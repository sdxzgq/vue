<template>
  <div id="userInfo">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.user" placeholder="用户名" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formInline.nickname" placeholder="昵称" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="状态">
          <el-option label="全部" value="3" />
          <el-option label="无效" value="0" />
          <el-option label="正常" value="1" />
          <el-option label="锁定" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
      />
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180"
      />
      <el-table-column
        prop="phone"
        label="手机号"
      />
      <el-table-column
        prop="email"
        label="邮箱"
      />
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">

          <span style="margin-left: 10px">{{ scope.row.status == '0' ? '无效':scope.row.status == '1' ? '正常':'锁定' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="isPage"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.totalCount"
      background
      style="float:right;margin:10px 20px 0 0;"
      @current-change="handleCurrentChange"
    />

    <user-edit ref="userEdit" />
  </div>
</template>
<script>
import userEdit from './components/userEdit'
import { userList, addUser } from '@/api/user'
export default {
  name: 'UserInfo',
  components: {
    userEdit
  },
  data() {
    return {
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条目个数
        totalCount: 19 // 总条目数
      },
      isPage: true,
      formInline: {
        user: '',
        nickname: '',
        status: '3'
      },
      total: 10,
      tableData: [{
        username: '王小虎',
        nickname: 'xiaohu',
        email: '1234@163.com',
        status: '1',
        sdfdf: 111,
        sdfsadfsaf: '12323'
      }]
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    handleEdit(index, row) {
      this.$refs.userEdit.open(row)
    },
    handleDelete(index, row) {
      console.log(row)
    },
    handleCurrentChange(val) {
      this.getTableData(val)
    },

    addUser() {
      this.$refs.userEdit.open()
    },
    onSubmit() {
      this.getTableData(null, this.formInline)
    },
    getTableData(val, searchParam) {
      const self = this
      var param = {
        pageNum: val || 1,
        pageSize: self.page.pageSize,
        params: searchParam
      }
      userList(param).then(res => {
        if (res.data.records.length > 0) {
          self.isPage = true
        }
        self.tableData = res.data.records
        self.$set(self.page, 'totalCount', res.data.total)
        self.$set(self.page, 'pageSize', res.data.pageSize)
        self.$set(self.page, 'currentPage', res.data.pageNum)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#userInfo{
    margin: 10px 10px;
}
</style>
