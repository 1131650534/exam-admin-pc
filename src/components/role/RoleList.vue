<template>
  <div class="rolelist">
    <!-- 搜索框 -->
    <el-row class="rolelist-header" :gutter="20">
      <el-col :span="3">
        <el-input placeholder="用户名" clearable prefix-icon="el-icon-search" v-model="inputSearch"></el-input>
      </el-col>
      <el-col :span="20">
        <el-button @click="searchRole">查询</el-button>
        <el-button @click="addDiom" type="primary">新增</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="roleList" border style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="identity" label="角色名称"></el-table-column>
      <el-table-column prop="des" label="角色描述"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="rolelist">{{rolelist.row.date| convertTime('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="rolelist">
          <div>
            <el-button size="small" @click="editDiom(rolelist.row)">编辑</el-button>
            <el-button size="small" @click="delRole(rolelist.row._id)" type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="rolelist-length">共{{ roleList.length}} 项</div>
    <!-- 编辑角色 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editDio"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-row class="editrolex">
        <el-col :span="24">
          <h3>角色</h3>
        </el-col>
        <el-col :span="14">
          <el-input v-model="editroleData.identity"></el-input>
        </el-col>
        <el-col :span="24">
          <h3>角色描述</h3>
        </el-col>
        <el-col :span="14">
          <el-input v-model="editroleData.des"></el-input>
        </el-col>
        <el-col>
          <h3>权限</h3>
        </el-col>
      </el-row>
      <el-tree
        ref="tree"
        default-expand-all
        :data="treed"
        show-checkbox
        node-key="_id"
        @check-change="handleCheckChange"
        :default-checked-keys="roleArr"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button @click="editSetRole" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增角色 -->
    <el-dialog
      title="新增角色"
      :visible.sync="addDio"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form :model="editroleData" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="角色" prop="identity">
          <el-input v-model="editroleData.identity"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="des">
          <el-input v-model="editroleData.des"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 新增角色数据
      addDio: false,

      inputSearch: "", // 用户搜索
      roleList: [], // 表格数据
      editDio: false, // 编辑角色弹窗
      editroleData: {}, // 编辑角色数据
      defaultProps: {
        children: "itmes",
        label: "auth"
      },
      treed: [], // 默认所有权限
      roleArr: [], // 默认展开的
      setRole: [], // 修改后的权限
      rules: {
        identity: [{ required: true, message: "必须输入", trigger: "blur" }],
        des: [{ required: true, message: "必须输入", trigger: "blur" }]
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      // 初始化数据
      const res = await this.$http.get(`/identity`);
      this.roleList = res.data.data;
    },
    async editDiom(row) {
      // 编辑角色
      this.roleArr = [];
      this.editroleData = {};
      this.editDio = true;
      const res = await this.$http.get(`/identity/auth`);
      this.treed = res.data.data; // 默认展开
      this.editroleData = row;
      // 默认选中
      for (let i = 0; i < this.editroleData.aid.length; i++) {
        if (this.editroleData.aid[i]._id) {
          this.roleArr.push(this.editroleData.aid[i]._id);
        }
        if (this.editroleData.aid[i].itmes == undefined) {
          continue;
        }
        if (this.editroleData.aid[i].itmes.length > 0) {
          for (let j = 0; j < this.editroleData.aid[i].itmes.length; j++) {
            if (this.editroleData.aid[i].itmes[j]._id) {
              this.roleArr.push(this.editroleData.aid[i].itmes[j]._id);
            }
          }
        }
      }
    },
    coloseAddDio() {
      // 清空数据
      this.editDio = false;
      this.addDio = false;
    },
    handleCheckChange() {
      // 获取选中的树
      let res = this.$refs.tree.getCheckedNodes();
      this.setRole = res;
    },
    async editSetRole() {
      // 点击确定修改树
      const res = await this.$http.put(`/identity/${this.editroleData._id}`, {
        identity: this.editroleData.identity,
        des: this.editroleData.des,
        aid: this.setRole
      });
      if (res.data.meta.status == 200) {
        this.coloseAddDio();
        this.initData();

        this.$message({
          message: "编辑身份成功",
          type: "success"
        });
      } else {
        this.coloseAddDio();
        this.$message.error("编辑身份失败");
      }
    },
    async addDiom() {
      // 新增角色
      this.roleArr = [];
      this.editroleData = {};
      this.addDio = true;
    },
    submitForm(formName) {
      // 添加角色
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/identity/add`, this.editroleData);
          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "添加角色成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("添加角色失败");
          }
        }
      });
    },
    async delRole(id) {
      // 删除角色
      const res = await this.$http.delete(`/identity/${id}`);
      if (res.data.meta.status == 204) {
        this.initData();
        this.$message({
          message: "删除角色成功",
          type: "success"
        });
      } else {
        this.$message.error("删除角色失败");
      }
    },
    async searchRole(){ // 搜索角色
     const res = await this.$http.get(`/identity/search?name=${this.inputSearch}`)
     this.roleList = res.data.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.rolelist {
  .rolelist-header {
    margin-bottom: 10px;
  }
  .rolelist-length {
    font-size: 18px;
    margin-top: 10px;
    margin-left: 8px;
  }
  .editrolex {
    font-size: 16px;

    h3 {
      margin: 14px 2px;
    }
  }
}
</style>