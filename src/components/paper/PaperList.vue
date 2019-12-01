<template>
  <div class="paperlist">
    <!-- 搜索框 -->
    <el-row class="paperlist-header" :gutter="20">
      <el-col :span="3">
        <el-input placeholder="试卷名" clearable prefix-icon="el-icon-search" v-model="inputSearch"></el-input>
      </el-col>
      <el-col :span="20">
        <el-button @click="searchPaper">查询</el-button>
        <el-button @click="addDiom" type="primary">新增</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="paperList" border style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column label="类别">
        <template slot-scope="paperlist">
         {{paperlist.row.arr[0].papertype}}
        </template>
      </el-table-column>
      <el-table-column prop="papername" label="试卷名"></el-table-column>
      <el-table-column prop="datax" label="建议时长"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="rolelist">{{rolelist.row.date| convertTime('YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column width="70" label="状态" align="center">
        <template slot-scope="paperlist">
          <el-tag
            :type="paperlist.row.status=='1'?'success':'danger'"
          >{{paperlist.row.status=='1'?'启用':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="360" align="center">
        <template slot-scope="paperlist">
          <div>
            <el-button
              size="small"
              @click="hasUser(paperlist.row)"
            >{{paperlist.row.status=='0'?'启用':'禁用'}}</el-button>
            <el-button size="small" @click="delPaper(paperlist.row._id)" type="danger">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增试卷 -->
    <el-dialog
      title="新增试卷"
      :visible.sync="addDio"
      width="50%"
      destroy-on-close
      :before-close="coloseAddDio"
      center
    >
      <el-form :model="addPaperData" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="题目类别" prop="pid">
          <el-select v-model=" addPaperData.pid">
            <el-option
              v-for="item in paperType"
              :key="item._id"
              :label="item.papertype"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷名" prop="papername">
          <el-input v-model="addPaperData.papername"></el-input>
        </el-form-item>
        <el-form-item label="建议时长" prop="datax">
          <el-input v-model="addPaperData.datax" placeholder="分钟"></el-input>
        </el-form-item>
        <el-form-item label="随机题目">
          <el-row>
            <el-col :span="4">
              <el-input placeholder="道数" v-model="sum"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button class="title-btn" @click="setTitle" type="primary">生成题目</el-button>
            </el-col>
            <el-col :span="4">{{addPaperData.title.length}}</el-col>
          </el-row>
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
      sum: 10,
      paperType: [], // 试卷类型
      inputSearch: "", // 搜索
      paperList: [], // 试卷
      addDio: false, // 添加弹窗
      addPaperData: {
        // 添加表单
        papername: "",
        pid: "5d9701a6c9ab7c0ca01ee3c5",
        title: []
      },
      rules: {
        papername: [
          { required: true, message: "必须输入试卷名", trigger: "blur" }
        ],
        datax: [
          { required: true, message: "必须输入建议时长", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.initData();
    console.log(11)
  },
  methods: {
    async initData() {
      const res = await this.$http.get(`/paper`);
      this.paperList = res.data.data;
      // console.log(this.paperList)
    },
    // 搜索试卷
    searchPaper() {},
    async addDiom() {
      this.getPaperType();
      // 新增试卷
      this.addDio = true;
    },
    async getPaperType() {
      const res = await this.$http.get(`/paper/papertype`);
      this.paperType = res.data.data;
    },
    coloseAddDio() {
      // 清空数据
      this.addDio = false;
       this.addPaperData = {
        papername: "",
        pid: "5d9701a6c9ab7c0ca01ee3c5",
        title: []
      }
    },
    async setTitle() {
      // 获取题目
      const res = await this.$http.get(`/title/sum`);
      var tiltex = res.data.data;
      for (let i = 0; i < this.sum; i++) {
        this.addPaperData.title.push(
          tiltex[Math.floor(Math.random() * tiltex.length)]
        );
      }
      var btn = document.querySelector(".title-btn");
      btn.disabled = true;
    },
    submitForm(formName) {
      // 添加试卷
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log(this.addPaperData)
          const res = await this.$http.post(`/paper`, this.addPaperData);
          console.log(res);
          if (res.data.meta.status == 200) {
            this.coloseAddDio();
            this.initData();
            this.$message({
              message: "添加试卷成功",
              type: "success"
            });
          } else {
            this.coloseAddDio();
            this.$message.error("添加试卷失败");
          }
        }
      });
    },
    async hasUser(row) {
      // 切换试卷状态
      row.status = row.status == "1" ? "0" : "1";
      console.log(row.status);
      const res = await this.$http.put(`/paper/${row._id}`, {
        status: row.status
      });
      if (res.data.meta.status == 200) {
        this.initData();
        this.$message({
          message: "修改试卷状态成功",
          type: "success"
        });
      } else {
        this.$message.error("修改试卷状态失败");
      }
    },
    async delPaper(id) {
      const res = await this.$http.delete(`/paper/${id}`);
      if (res.data.meta.status == 204) {
        this.initData();
        this.$message({
          message: "删除试卷成功",
          type: "success"
        });
      } else {
        this.$message.error("删除试卷失败");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title-btn {
  margin-left: 30px;
}
</style>