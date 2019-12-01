<template>
  <div class="authlist">
    <!-- 添加规则 -->
    <div class="authlist-header">
      <el-button @click="addDiom" type="primary">添加规则</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="authList" style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="authlist">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="(item,index)  in authlist.row.itmes" :key="item._id">
              <el-tag
                closable
                @click="editzz(item)"
                @close="tagColose(index,item._id,authlist.row.itmes)"
                type="danger"
              >
                {{ item.auth}}
                <span style="margin-left:20px">{{item.path}}</span>
              </el-tag>
            </el-form-item>
          </el-form>
          <div @click="addDiomzA(authlist.row._id)" class="addsubauth">
            <el-tag type="success">{{" + "}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="auth" label="管理模块"></el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="authlist">{{authlist.row.date| convertTime('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="authlist">
          <div>
            <el-button @click="editDiom(authlist.row)" size="small">编辑</el-button>
            <el-button  @click="rmAuth(authlist.row)" size="small" type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="authlist-length">共{{ authList.length}} 项</div>

    <!-- 新增规则 -->
    <el-dialog
      title="新增规则"
      :visible.sync="addDio"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form :model="addAuthData" :rules="rules" ref="ruleFormAuth" label-width="100px">
        <el-form-item label="规则模块" prop="auth">
          <el-input v-model="addAuthData.auth"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="addAuthData.icon"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button @click="setAuth('ruleFormAuth')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增子规则 -->
    <el-dialog
      title="新增子规则"
      :visible.sync="addDiomz"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form :model="addAuthDataz" :rules="rules" ref="ruleFormAuth" label-width="100px">
        <el-form-item label="路由名" prop="auth">
          <el-input v-model="addAuthDataz.auth"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="addAuthDataz.path"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button @click="setAuthz('ruleFormAuth')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑规则 -->
    <el-dialog
      title="编辑规则"
      :visible.sync="editDio"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form :model="editAuthData" :rules="rules" ref="ruleFormAuthEdit" label-width="100px">
        <el-form-item label="规则模块" prop="auth">
          <el-input v-model="editAuthData.auth"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="editAuthData.icon"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button @click="editAuta('ruleFormAuthEdit')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑子规则 -->
    <el-dialog
      title="编辑子规则"
      :visible.sync="editDioz"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form :model="editAuthDataz" :rules="rules" ref="ruleFormAuthEditxz" label-width="100px">
        <el-form-item label="路由名" prop="auth">
          <el-input v-model="editAuthDataz.auth"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="editAuthDataz.path"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button @click="editAutazz('ruleFormAuthEditxz')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editDioz: false,
      editAuthDataz: {
        auth: "",
        path: ""
      },
      editAuthData: "", // 编辑数据
      editDio: false, // 编辑弹窗
      authId: "", // 父规则id
      addDiomz: false, // 新增子规则弹窗
      authList: [], // 表格数据
      addDio: false, // 新增弹窗
      addAuthData: {
        // 新增表单数据
        auth: "",
        icon: ""
      },
      rules: {
        // 新增表单验证
        icon: [{ required: true, message: "图标不能为空", trigger: "blur" }],
        auth: [
          { required: true, message: "规则模块不能为空", trigger: "blur" }
        ],
        path: [{ required: true, message: "路径不能为空", trigger: "blur" }]
      },
      addAuthDataz: {
        // 新增子表单数据
        auth: "",
        path: ""
      },
      editzId: ""
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async rmAuth(row){ // 删除权限

     if(row.itmes.length==0){
       const res = await this.$http.delete(`/identity/auth/${row._id}`)
       if (res.data.meta.status == 204) {
      
            this.initData();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
         
            this.$message.error("删除失败");
          }
   
     }else{
         this.$message.error("删除失败,必须删除下面子权限");
     }
    },
    editAutazz(formName) {
      // 编辑子规则
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.put(
            `/identity/subauth/${this.editzId}`,
            this.editAuthDataz
          );
          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "编辑成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("编辑失败");
          }
        }
      });
    },
    async editzz(item) {
      // 编辑子权限
      this.editDioz = true;
      this.editAuthDataz = { ...item };
      this.editzId = item._id;
    },
    async initData() {
      // 初始化数据
      const res = await this.$http.get(`/identity/auth`);

      this.authList = res.data.data;
    },
    coloseAddDio() {
      this.addDio = false;
      this.addAuthData = {};
      this.addDiomz = false;
      this.addAuthDataz = {};
      this.authId = "";
      this.editDio = false;
      this.editDioz = false;
    },
    addDiom() {
      // 新增规则弹窗
      this.addDio = true;
    },
    setAuth(formName) {
      // 新增规则
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.post(
            `/identity/auth/add`,
            this.addAuthData
          );
          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("添加失败");
          }
        }
      });
    },
    addDiomzA(id) {
      // 新增子规则弹窗
      this.addDiomz = true;
      this.authId = id;
    },
    setAuthz(formName) {
      // 新增子规则
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.post(`/identity/subauth/add`, {
            ...this.addAuthDataz,
            faids: this.authId
          });
          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("添加失败");
          }
        }
      });
    },
    async tagColose(index, id, item) {
      // 关闭tag
      item.splice(item.indexOf(index), 1);
      const res = await this.$http.delete(`/identity/subauth/${id}`);
      
    },
    editDiom(row) {
      // 编辑规则
      this.editDio = true;
      this.editAuthData = row;
    },
    async editAuta(formName) {
      // 提交编辑

      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.put(
            `/identity/auth/${this.editAuthData._id}`,
            this.editAuthData
          );
          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "编辑成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("编辑失败");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.authlist {
  .authlist-header {
    margin-bottom: 12px;
  }
  .authlist-length {
    font-size: 18px;
    margin-top: 10px;
    margin-left: 8px;
  }
}
.demo-table-expand {
  font-size: 0;
}
/deep/ .demo-table-expand label {
  font-size: 16px;
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 20%;
}
.addsubauth {
  margin-top: 10px;
  cursor: pointer;
}
</style>