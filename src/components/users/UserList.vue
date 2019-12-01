<template>
  <div class="userlist">
    <!-- 搜索框 -->
    <ul class="userlist-header">
      <li>
        <el-input placeholder="用户名" clearable prefix-icon="el-icon-search" v-model="inputSearch"></el-input>
      </li>
      <li>
        <span class="uh-text" style>年级：</span>
        <el-select v-model="classz">
          <el-option label="全部" value></el-option>
          <el-option label="大一" value="大一"></el-option>
          <el-option label="大二" value="大二"></el-option>
          <el-option label="大三" value="大三"></el-option>
        </el-select>
      </li>
      <li>
        <span class="uh-text" style>角色：</span>
        <el-select v-model="rolez">
          <el-option label="全部" value></el-option>
          <el-option
            v-for="item in identityList2"
            :key="item._id"
            :label="item.identity"
            :value="item._id"
          ></el-option>
        </el-select>
      </li>
      <li>
        <span class="uh-text" style>性别：</span>
        <el-select v-model="sexz">
          <el-option label="全部" value></el-option>
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="fmale"></el-option>
        </el-select>
      </li>
      <li>
        <span class="uh-text" style>状态：</span>
        <el-select v-model="stausz">
          <el-option label="全部" value></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </li>
      <li>
        <el-button @click="searchUser">查询</el-button>
        <el-button @click="addDio = true" type="primary">新增</el-button>
      </li>
    </ul>

    <!-- 表格 -->
    <el-table :data="userList" border height="68vh" style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
       <el-table-column  width="100" align="center" label="头像">
        <template slot-scope="userlist">
          <div>
            <img :src="userlist.row.avatar" alt="" srcset="" class="imgx">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="zname" label="真实姓名"></el-table-column>
      <el-table-column prop="mobile" width="180" label="手机号"></el-table-column>
      <el-table-column prop="classx" label="学级"></el-table-column>
      <el-table-column label="角色">
        <template slot-scope="userlist">{{userlist.row.arr[0].identity}}</template>
      </el-table-column>
      <el-table-column width="68" align="center" label="性别">
        <template slot-scope="userlist">
          <span
            :class="[userlist.row.gender=='male'?'sexnan':'sexnv']"
          >{{userlist.row.gender=='male'?'♂':"♀"}}</span>
        </template>
      </el-table-column>
      <el-table-column width="70" label="状态" align="center">
        <template slot-scope="userlist">
          <el-tag
            :type="userlist.row.state==='1'?'success':'danger'"
          >{{userlist.row.state==='1'?'启用':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="userlist">
          <div>
            <el-button
              size="small"
              @click="hasUser(userlist.row)"
            >{{userlist.row.state==='0'?'启用':'禁用'}}</el-button>
            <el-button size="small" @click="editDiom(userlist.row)">编辑</el-button>
            <el-button size="small" @click="fenDio(userlist.row)">分配</el-button>
            <el-button size="small" @click="delUser(userlist.row._id)" type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagenumber"
        :page-sizes="[10, 30, 60, 90]"
        :page-size.sync="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 新增用户 -->
    <el-dialog
      title="新增用户"
      :visible.sync="addDio"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form
        size="small"
        :model="addFrom"
        status-icon
        :rules="addRules"
        ref="addFrom"
        label-width="100px"
        class="demo-addFrom"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="addFrom.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="zname">
          <el-input type="text" v-model="addFrom.zname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addFrom.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="addFrom.gender" placeholder="请选择性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="fmale"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input type="text" v-model="addFrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="classx">
          <el-select v-model="addFrom.classx" placeholder="请选择年级">
            <el-option label="大一" value="大一"></el-option>
            <el-option label="大二" value="大二"></el-option>
            <el-option label="大三" value="大三"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button type="primary" @click="submitAddForm('addFrom')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDio"
      width="500px"
      top
      center
      destroy-on-close
      :before-close="coloseAddDio"
    >
      <el-form
        size="small"
        :model="addFrom"
        status-icon
        :rules="addRules"
        ref="addFrom"
        label-width="100px"
        class="demo-addFrom"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
         
        </el-form-item>
        <el-form-item label="用户名">
          <el-input type="text" v-model="addFrom.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input type="text" v-model="addFrom.zname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="addFrom.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addFrom.gender" placeholder="请选择性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="fmale"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input type="text" v-model="addFrom.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="addFrom.classx" placeholder="请选择年级">
            <el-option label="大一" value="大一"></el-option>
            <el-option label="大二" value="大二"></el-option>
            <el-option label="大三" value="大三"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('addFrom',addFrom._id)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="fDio"
      width="30%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form
        size="small"
        :model="fFrom"
        status-icon
        ref="fFrom"
        label-width="100px"
        class="demo-addFrom"
      >
        <el-form-item label="用户名">
          <el-input type="text" v-model="fFrom.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input type="text" v-model="fFrom.zname" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="fFrom.iid" placeholder="请选择角色">
            <el-option
              v-for="item in identityList"
              :key="item._id"
              :label="item.identity"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button type="primary" @click="submifForm('fFrom',fFrom._id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      uploadAction: "", // 文件上传
      searchFrom: {
        name: "",
        x: ""
      },
      // 分页数据
      total: 0, // 总页数
      pagenumber: 1, // 当前第几页
      pagesize: 10,
      identityList: [], // 角色列表
      identityList2: [], // 搜索处
      visible: false, // 删除用户提示框
      fFrom: {
        // 分配角色表单
      },
      // 添加用户数据
      addFrom: {
        username: "",
        password: "",
        zname: "",
        gender: "",
        mobile: "",
        classx: ""
      },
      addRules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        zname: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        classx: [{ required: true, message: "请选择年级", trigger: "blur" }]
      },
      userList: [], // 表格数据
      addDio: false, // 新增用户弹框
      fDio: false, // 分配用户弹框
      editDio: false, // 编辑用户弹窗

      // 头部数据
      inputSearch: "", // 搜索
      classz: "",
      rolez: "",
      sexz: "",
      stausz: ""
    };
  },
  async created() {
    this.initData();
    const res = await this.$http.get("/identity");
    this.identityList2 = res.data.data;
  },
  methods: {
    async initData() {
      // 初始化数据
      const res = await this.$http.get(
        `/users?pagesize=${this.pagesize}&pagenumber=${this.pagenumber}`
      );
      this.userList = res.data.data;
      this.total = res.data.count;
    },
    submitAddForm(formName) {
      // 提交新增用户表单
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.post("/users/register", this.addFrom);

          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "添加用户成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("添加用户失败");
          }
        }
      });
    },
    submitEditForm(formName, id) {
      // 提交编辑用户表单
      // this.addFrom.avatar = this.imageUrl
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.put(`/users/${id}`, this.addFrom);

          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "编辑用户成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("编辑用户失败");
          }
        }
      });
    },
    submifForm(formName, id) {
      // 提交分配角色表单
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.put(
            `users/${id}/identity/${this.fFrom.iid}`
          );

          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.searchUser();
            this.$message({
              message: "分配角色成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("分配角色失败");
          }
        }
      });
    },
    coloseAddDio() {
      // 关闭新增用户弹窗

      this.addFrom = {};
        // this.addFrom.avatar = this.imageUrl
      this.editDio = false;
      this.addDio = false;
      this.fDio = false;
    },
    async delUser(id) {
      // 删除用户
      const res = await this.$http.delete(`users/${id}`);
      if (res.data.meta.status == 204) {
        this.searchUser();
        this.$message({
          message: "删除用户成功",
          type: "success"
        });
      } else {
        this.$message.error("删除用户失败");
      }
    },
    async hasUser(row) {
      // 切换用户状态
      row.state = row.state == "1" ? "0" : "1";
      const res = await this.$http.put(`users/${row._id}`, {
        state: row.state
      });
      if (res.data.meta.status == 200) {
        this.searchUser();
        this.$message({
          message: "修改状态成功",
          type: "success"
        });
      } else {
        this.$message.error("删除用户失败");
      }
    },
    async searchUser() {
      // 搜索用户
      const res = await this.$http.get(
        `/users/search?username=${this.inputSearch}&classx=${this.classz}&iid=${this.rolez}&gender=${this.sexz}&state=${this.stausz}&pagesize=${this.pagesize}&pagenumber=${this.pagenumber}`
      );
      this.total = res.data.count;
      this.userList = res.data.data;
      if (res.data.data.length == 0) {
        setTimeout(() => {
          this.bugz();
        }, 300);
      }
    },
    async bugz() {
      // 解决一个跳页bug
      const res = await this.$http.get(
        `/users/search?username=${this.inputSearch}&classx=${this.classz}&iid=${this.rolez}&gender=${this.sexz}&state=${this.stausz}&pagesize=${this.pagesize}&pagenumber=${this.pagenumber}`
      );
      this.total = res.data.count;
      this.userList = res.data.data;
    },
    editDiom(row) {
      // 打开编辑用的弹窗
  this.imageUrl= '',
      // this.uploadAction = "http://localhost:4000/api/users/upload/" + row._id;
      this.uploadAction = "http://exam.zcmax.top/api/users/upload/" + row._id;
      this.editDio = true;
      this.addFrom = row;
    },
    async fenDio(row) {
      // 打开分配角色弹窗
      this.fDio = true;
      const res = await this.$http.get("/identity");
      this.identityList = res.data.data;
      this.fFrom = row;
    },
    handleSizeChange(val) {
      // 一页多少数据
      this.pagesize = val;
      this.searchUser();
    },
    handleCurrentChange(val) {
      // 页码跳转
      this.pagenumber = val;
      this.searchUser();
    },
     handleAvatarSuccess(res, file) { // 图片上传成功
        this.imageUrl = URL.createObjectURL(file.raw);
         this.addFrom.avatar = res.data.avatar
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片必须是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
  }
};
</script>

<style lang="scss" scoped>
.userlist {
  .userlist-header {
    margin-bottom: 10px;
    display: flex;
    > li {
      &:last-child {
        margin-left: 20px;
      }
      width: 12%;
      display: flex;
      .uh-text {
        white-space: nowrap;
        line-height: 40px;
        // margin-right: 2px;
        margin-left: 20px;
      }
    }
  }
}

.sexnan {
  color: blue;
  font-size: 18px;
  font-weight: 700;
}
.sexnv {
  color: red;
  font-size: 18px;
  font-weight: 700;
}
.fenye {
  margin-top: 16px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .imgx {
    width: 50px;
    height: 50px;
  }
</style>