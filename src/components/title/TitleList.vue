<template>
  <div class="titlelist">
    <!-- 搜索框 -->
    <ul class="titlelist-header">
      <li>
        <el-input placeholder="输入题干" clearable prefix-icon="el-icon-search" v-model="inputSearch"></el-input>
      </li>
      <li>
        <span class="uh-text">类别：</span>
        <el-select v-model="titleTypex">
          <el-option label="全部" value></el-option>
          <el-option
            v-for="(item,index) in titleType"
            :key="item._id"
            :label="item.titletype"
            :value="item._id"
          ></el-option>
        </el-select>
      </li>
     
      <li>
        <el-button @click="queryTitle">查询</el-button>
        <el-button type="primary" @click="addTiltDio">新增</el-button>
      </li>
    </ul>
    <!-- 表格 -->
    <el-table :data="titleList" border height="68vh" style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column label="类别">
        <template slot-scope="titlelist">
          <div>{{titlelist.row.items[0].titletype}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="title" width="560" label="题干"></el-table-column>
      <el-table-column prop="score" label="分值"></el-table-column>
      <el-table-column prop="difficulty" label="难度"></el-table-column>

      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="titlelist">
          <div>
            <el-button size="small"  @click="editDiom(titlelist.row)" >编辑</el-button>
            <el-button size="small"  @click="delTitle(titlelist.row._id)" type="danger">删除</el-button>
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
    <!-- 添加题目 -->
    <el-dialog
      title="添加题目"
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
        <el-form-item label="题目类别" prop="tyid">
          <el-select v-model="addFrom.tyid">
            <el-option
              v-for="item in tyids"
              :key="item._id"
              :label="item.titletype"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题干" prop="title">
          <el-input type="textarea" v-model="addFrom.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="A" prop="A">
          <el-input type="text" v-model="addFrom.A" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="B" prop="B">
          <el-input type="text" v-model="addFrom.B" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="C" prop="C">
          <el-input type="text" v-model="addFrom.C" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="D" prop="D">
          <el-input type="text" v-model="addFrom.D" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answea">
          <el-input type="text" v-model="addFrom.answea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分数" prop="score">
          <el-input type="text" v-model="addFrom.score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-rate v-model="addFrom.difficulty"></el-rate>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button type="primary" @click="submitAddForm('addFrom')">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 编辑题目 -->
    <el-dialog
      title="编辑题目"
      :visible.sync="editDio"
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
        ref="editFrom"
        label-width="100px"
        class="demo-addFrom"
      >
        <el-form-item label="题目类别" >
          <el-select v-model="addFrom.tyid">
            <el-option
              v-for="item in editTitleType"
              :key="item._id"
              :label="item.titletype"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题干" >
          <el-input type="textarea" v-model="addFrom.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="A" >
          <el-input type="text" v-model="addFrom.A" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="B" >
          <el-input type="text" v-model="addFrom.B" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="C" >
          <el-input type="text" v-model="addFrom.C" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="D" >
          <el-input type="text" v-model="addFrom.D" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案" >
          <el-input type="text" v-model="addFrom.answea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分数" >
          <el-input type="text" v-model="addFrom.score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="难度" >
          <el-rate v-model="addFrom.difficulty"></el-rate>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coloseAddDio">取 消</el-button>
        <el-button type="primary" @click="editTitleForm('editFrom',addFrom._id)">确 定</el-button>
       
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editTitleType:[], // 编辑时题目类别
      difficulty: "", // 难度
      titleTypex: "", // 选择类别
      titleType: [], // 题目类别
      inputSearch: "", // 搜索题目
      titleList: [], // 表单数据
      // 分页数据
      total: 50,
      pagenumber: 1,
      pagesize: 10,
      addDio: false, // 添加题目弹框
      editDio: false,
      addFrom: {
        // 添加表单数据
        tyid: "",
        title: "",
        A: "",
        B: "",
        C: "",
        D: "",
        answea: "",
        score: "3",
        difficulty: 1,
      },
      tyids: [], // 题目类别
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        tyid: [{ required: true, message: "请选择类别", trigger: "blur" }],
        title: [{ required: true, message: "请输入题干", trigger: "blur" }],
        A: [{ required: true, message: "请输入A选项", trigger: "blur" }],
        B: [{ required: true, message: "请输入B选项", trigger: "blur" }],
        C: [{ required: true, message: "请输入C选项", trigger: "blur" }],
        D: [{ required: true, message: "请输入D选项", trigger: "blur" }],
        answea: [{ required: true, message: "请输入正确答案", trigger: "blur" }],
        score: [{ required: true, message: "请输入分数", trigger: "blur" }]
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await this.$http.get(
        `/title?pagesize=${this.pagesize}&pagenumber=${this.pagenumber}`
      );
      const resx = await this.$http.get(`/title/titletype`);
      for(let zz=0;zz<res.data.data.length;zz++){
  res.data.data[zz].difficulty= Number(res.data.data[zz].difficulty)
      }
    
      this.titleList = res.data.data;
      this.total = res.data.count;
      this.titleType = resx.data.data;
    },
    async handleSizeChange(val) {
      // 一页多少
      this.pagesize = val;
      this.queryTitle();
    },
    async handleCurrentChange(val) {
      // 当前
      console.log("number" + val);
      this.pagenumber = val;
      // this.queryTitle();
      this.initData()
    },
    async queryTitle() {
      // 查询题目
        console.log(typeof this.difficulty)
      const res = await this.$http.get(
      
        `/title/search?pagesize=${this.pagesize}&pagenumber=${this.pagenumber}&title=${this.inputSearch}&tyid=${this.titleTypex}&difficulty=${this.difficulty}`
      );
      this.total = res.data.count;
      this.titleList = res.data.data;
    },
    // 新增题目弹窗
    async addTiltDio() {
      this.addDio = true;
      const res = await this.$http.get(`/title/titletype`);
      this.tyids = res.data.data;
      this.addFrom.tyid = this.tyids[0]._id;
    },
    // 关闭
    coloseAddDio() {
      this.addDio = false;
       this.editDio = false;
      this.addFrom = {};
    },
    submitAddForm(formName) {
      // 提交新题目表单
      this.$refs[formName].validate(async valid => {
        if (valid) {
    
          const res = await this.$http.post("/title", this.addFrom);
          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.queryTitle()
            this.$message({
              message: "添加题目成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("添加题目失败");
          }
        }
      });
    },
    editDiom(row) {
      // 打开编辑的弹窗
   
      this.editTitleType = this.titleType
      this.editDio = true;
      row.difficulty = Number(row.difficulty)
      this.addFrom = row;
     
    },
    editTitleForm(formName,id){
       // 提交编辑题目表单
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$http.put(`/title/${id}`, this.addFrom);
          console.log(this.addFrom)
          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.queryTitle()
           
            this.$message({
              message: "编辑题目成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("编辑题目失败");
          }
        }
      });
    },
      async delTitle(id) {
      // 删除用户
      const res = await this.$http.delete(`/title/${id}`);
      if (res.data.meta.status == 204) {
        this.queryTitle()
        this.$message({
          message: "删除题目成功",
          type: "success"
        });
      } else {
        this.$message.error("删除题目失败");
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.titlelist {
  .titlelist-header {
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
  .fenye {
    margin-top: 16px;
  }
}
</style>