(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bd14d9c"],{"8dd9":function(e,t,a){"use strict";var s=a("d241"),r=a.n(s);r.a},a6bd:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"userlist"},[a("ul",{staticClass:"userlist-header"},[a("li",[a("el-input",{attrs:{placeholder:"用户名",clearable:"","prefix-icon":"el-icon-search"},model:{value:e.inputSearch,callback:function(t){e.inputSearch=t},expression:"inputSearch"}})],1),a("li",[a("span",{staticClass:"uh-text"},[e._v("年级：")]),a("el-select",{model:{value:e.classz,callback:function(t){e.classz=t},expression:"classz"}},[a("el-option",{attrs:{label:"全部",value:""}}),a("el-option",{attrs:{label:"大一",value:"大一"}}),a("el-option",{attrs:{label:"大二",value:"大二"}}),a("el-option",{attrs:{label:"大三",value:"大三"}})],1)],1),a("li",[a("span",{staticClass:"uh-text"},[e._v("角色：")]),a("el-select",{model:{value:e.rolez,callback:function(t){e.rolez=t},expression:"rolez"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._l(e.identityList2,(function(e){return a("el-option",{key:e._id,attrs:{label:e.identity,value:e._id}})}))],2)],1),a("li",[a("span",{staticClass:"uh-text"},[e._v("性别：")]),a("el-select",{model:{value:e.sexz,callback:function(t){e.sexz=t},expression:"sexz"}},[a("el-option",{attrs:{label:"全部",value:""}}),a("el-option",{attrs:{label:"男",value:"male"}}),a("el-option",{attrs:{label:"女",value:"fmale"}})],1)],1),a("li",[a("span",{staticClass:"uh-text"},[e._v("状态：")]),a("el-select",{model:{value:e.stausz,callback:function(t){e.stausz=t},expression:"stausz"}},[a("el-option",{attrs:{label:"全部",value:""}}),a("el-option",{attrs:{label:"启用",value:"1"}}),a("el-option",{attrs:{label:"禁用",value:"0"}})],1)],1),a("li",[a("el-button",{on:{click:e.searchUser}},[e._v("查询")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addDio=!0}}},[e._v("新增")])],1)]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userList,border:"",height:"68vh"}},[a("el-table-column",{attrs:{type:"index",width:"60"}}),a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{width:"100",align:"center",label:"头像"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("div",[a("img",{staticClass:"imgx",attrs:{src:e.row.avatar,alt:"",srcset:""}})])]}}])}),a("el-table-column",{attrs:{prop:"zname",label:"真实姓名"}}),a("el-table-column",{attrs:{prop:"mobile",width:"180",label:"手机号"}}),a("el-table-column",{attrs:{prop:"classx",label:"学级"}}),a("el-table-column",{attrs:{label:"角色"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.arr[0].identity))]}}])}),a("el-table-column",{attrs:{width:"68",align:"center",label:"性别"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{class:["male"==t.row.gender?"sexnan":"sexnv"]},[e._v(e._s("male"==t.row.gender?"♂":"♀"))])]}}])}),a("el-table-column",{attrs:{width:"70",label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"1"===t.row.state?"success":"danger"}},[e._v(e._s("1"===t.row.state?"启用":"禁用"))])]}}])}),a("el-table-column",{attrs:{label:"操作",width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("el-button",{attrs:{size:"small"},on:{click:function(a){return e.hasUser(t.row)}}},[e._v(e._s("0"===t.row.state?"启用":"禁用"))]),a("el-button",{attrs:{size:"small"},on:{click:function(a){return e.editDiom(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"small"},on:{click:function(a){return e.fenDio(t.row)}}},[e._v("分配")]),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){return e.delUser(t.row._id)}}},[e._v("删除")])],1)]}}])})],1),a("div",{staticClass:"fenye"},[a("el-pagination",{attrs:{"current-page":e.pagenumber,"page-sizes":[10,30,60,90],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.pagenumber=t},"update:current-page":function(t){e.pagenumber=t},"update:pageSize":function(t){e.pagesize=t},"update:page-size":function(t){e.pagesize=t}}})],1),a("el-dialog",{attrs:{title:"新增用户",visible:e.addDio,width:"30%","destroy-on-close":"","before-close":e.coloseAddDio,center:""},on:{"update:visible":function(t){e.addDio=t}}},[a("el-form",{ref:"addFrom",staticClass:"demo-addFrom",attrs:{size:"small",model:e.addFrom,"status-icon":"",rules:e.addRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.addFrom.username,callback:function(t){e.$set(e.addFrom,"username",t)},expression:"addFrom.username"}})],1),a("el-form-item",{attrs:{label:"真实姓名",prop:"zname"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.addFrom.zname,callback:function(t){e.$set(e.addFrom,"zname",t)},expression:"addFrom.zname"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.addFrom.password,callback:function(t){e.$set(e.addFrom,"password",t)},expression:"addFrom.password"}})],1),a("el-form-item",{attrs:{label:"性别",prop:"gender"}},[a("el-select",{attrs:{placeholder:"请选择性别"},model:{value:e.addFrom.gender,callback:function(t){e.$set(e.addFrom,"gender",t)},expression:"addFrom.gender"}},[a("el-option",{attrs:{label:"男",value:"male"}}),a("el-option",{attrs:{label:"女",value:"fmale"}})],1)],1),a("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.addFrom.mobile,callback:function(t){e.$set(e.addFrom,"mobile",t)},expression:"addFrom.mobile"}})],1),a("el-form-item",{attrs:{label:"年级",prop:"classx"}},[a("el-select",{attrs:{placeholder:"请选择年级"},model:{value:e.addFrom.classx,callback:function(t){e.$set(e.addFrom,"classx",t)},expression:"addFrom.classx"}},[a("el-option",{attrs:{label:"大一",value:"大一"}}),a("el-option",{attrs:{label:"大二",value:"大二"}}),a("el-option",{attrs:{label:"大三",value:"大三"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.coloseAddDio}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitAddForm("addFrom")}}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"编辑用户",visible:e.editDio,width:"500px",top:"",center:"","destroy-on-close":"","before-close":e.coloseAddDio},on:{"update:visible":function(t){e.editDio=t}}},[a("el-form",{ref:"addFrom",staticClass:"demo-addFrom",attrs:{size:"small",model:e.addFrom,"status-icon":"",rules:e.addRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"头像"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadAction,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.addFrom.username,callback:function(t){e.$set(e.addFrom,"username",t)},expression:"addFrom.username"}})],1),a("el-form-item",{attrs:{label:"真实姓名"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.addFrom.zname,callback:function(t){e.$set(e.addFrom,"zname",t)},expression:"addFrom.zname"}})],1),a("el-form-item",{attrs:{label:"密码"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.addFrom.password,callback:function(t){e.$set(e.addFrom,"password",t)},expression:"addFrom.password"}})],1),a("el-form-item",{attrs:{label:"性别"}},[a("el-select",{attrs:{placeholder:"请选择性别"},model:{value:e.addFrom.gender,callback:function(t){e.$set(e.addFrom,"gender",t)},expression:"addFrom.gender"}},[a("el-option",{attrs:{label:"男",value:"male"}}),a("el-option",{attrs:{label:"女",value:"fmale"}})],1)],1),a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.addFrom.mobile,callback:function(t){e.$set(e.addFrom,"mobile",t)},expression:"addFrom.mobile"}})],1),a("el-form-item",{attrs:{label:"年级"}},[a("el-select",{attrs:{placeholder:"请选择年级"},model:{value:e.addFrom.classx,callback:function(t){e.$set(e.addFrom,"classx",t)},expression:"addFrom.classx"}},[a("el-option",{attrs:{label:"大一",value:"大一"}}),a("el-option",{attrs:{label:"大二",value:"大二"}}),a("el-option",{attrs:{label:"大三",value:"大三"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.coloseAddDio}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitEditForm("addFrom",e.addFrom._id)}}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"分配角色",visible:e.fDio,width:"30%","destroy-on-close":"","before-close":e.coloseAddDio,center:""},on:{"update:visible":function(t){e.fDio=t}}},[a("el-form",{ref:"fFrom",staticClass:"demo-addFrom",attrs:{size:"small",model:e.fFrom,"status-icon":"","label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{attrs:{type:"text",disabled:"",autocomplete:"off"},model:{value:e.fFrom.username,callback:function(t){e.$set(e.fFrom,"username",t)},expression:"fFrom.username"}})],1),a("el-form-item",{attrs:{label:"真实姓名"}},[a("el-input",{attrs:{type:"text",disabled:"",autocomplete:"off"},model:{value:e.fFrom.zname,callback:function(t){e.$set(e.fFrom,"zname",t)},expression:"fFrom.zname"}})],1),a("el-form-item",{attrs:{label:"角色"}},[a("el-select",{attrs:{placeholder:"请选择角色"},model:{value:e.fFrom.iid,callback:function(t){e.$set(e.fFrom,"iid",t)},expression:"fFrom.iid"}},e._l(e.identityList,(function(e){return a("el-option",{key:e._id,attrs:{label:e.identity,value:e._id}})})),1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.coloseAddDio}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submifForm("fFrom",e.fFrom._id)}}},[e._v("确 定")])],1)],1)],1)},r=[],o=(a("96cf"),a("3b8d")),n={data:function(){return{imageUrl:"",uploadAction:"",searchFrom:{name:"",x:""},total:0,pagenumber:1,pagesize:10,identityList:[],identityList2:[],visible:!1,fFrom:{},addFrom:{username:"",password:"",zname:"",gender:"",mobile:"",classx:""},addRules:{password:[{required:!0,message:"请输入密码",trigger:"blur"}],username:[{required:!0,message:"请输入用户名",trigger:"blur"}],zname:[{required:!0,message:"请输入真实姓名",trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号",trigger:"blur"}],gender:[{required:!0,message:"请选择性别",trigger:"blur"}],classx:[{required:!0,message:"请选择年级",trigger:"blur"}]},userList:[],addDio:!1,fDio:!1,editDio:!1,inputSearch:"",classz:"",rolez:"",sexz:"",stausz:""}},created:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.initData(),e.next=3,this.$http.get("/identity");case 3:t=e.sent,this.identityList2=t.data.data;case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),methods:{initData:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$http.get("/users?pagesize=".concat(this.pagesize,"&pagenumber=").concat(this.pagenumber));case 2:t=e.sent,this.userList=t.data.data,this.total=t.data.count;case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),submitAddForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(a){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=5;break}return e.next=3,t.$http.post("/users/register",t.addFrom);case 3:s=e.sent,200==s.data.meta.status?(t.coloseAddDio(),t.initData(),t.$message({message:"添加用户成功",type:"success"})):(t.coloseAddDio(),t.$message.error("添加用户失败"));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},submitEditForm:function(e,t){var a=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(s){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!s){e.next=5;break}return e.next=3,a.$http.put("/users/".concat(t),a.addFrom);case 3:r=e.sent,200==r.data.meta.status?(a.coloseAddDio(),a.initData(),a.$message({message:"编辑用户成功",type:"success"})):(a.coloseAddDio(),a.$message.error("编辑用户失败"));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},submifForm:function(e,t){var a=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(s){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!s){e.next=5;break}return e.next=3,a.$http.put("users/".concat(t,"/identity/").concat(a.fFrom.iid));case 3:r=e.sent,200==r.data.meta.status?(a.coloseAddDio(),a.searchUser(),a.$message({message:"分配角色成功",type:"success"})):(a.coloseAddDio(),a.$message.error("分配角色失败"));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},coloseAddDio:function(){this.addFrom={},this.editDio=!1,this.addDio=!1,this.fDio=!1},delUser:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$http.delete("users/".concat(t));case 2:a=e.sent,204==a.data.meta.status?(this.searchUser(),this.$message({message:"删除用户成功",type:"success"})):this.$message.error("删除用户失败");case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),hasUser:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.state="1"==t.state?"0":"1",e.next=3,this.$http.put("users/".concat(t._id),{state:t.state});case 3:a=e.sent,200==a.data.meta.status?(this.searchUser(),this.$message({message:"修改状态成功",type:"success"})):this.$message.error("删除用户失败");case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),searchUser:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,a=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$http.get("/users/search?username=".concat(this.inputSearch,"&classx=").concat(this.classz,"&iid=").concat(this.rolez,"&gender=").concat(this.sexz,"&state=").concat(this.stausz,"&pagesize=").concat(this.pagesize,"&pagenumber=").concat(this.pagenumber));case 2:t=e.sent,this.total=t.data.count,this.userList=t.data.data,0==t.data.data.length&&setTimeout((function(){a.bugz()}),300);case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),bugz:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$http.get("/users/search?username=".concat(this.inputSearch,"&classx=").concat(this.classz,"&iid=").concat(this.rolez,"&gender=").concat(this.sexz,"&state=").concat(this.stausz,"&pagesize=").concat(this.pagesize,"&pagenumber=").concat(this.pagenumber));case 2:t=e.sent,this.total=t.data.count,this.userList=t.data.data;case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),editDiom:function(e){this.imageUrl="",this.uploadAction="http://exam.zcmax.top/api/users/upload/"+e._id,this.editDio=!0,this.addFrom=e},fenDio:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.fDio=!0,e.next=3,this.$http.get("/identity");case 3:a=e.sent,this.identityList=a.data.data,this.fFrom=t;case 6:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),handleSizeChange:function(e){this.pagesize=e,this.searchUser()},handleCurrentChange:function(e){this.pagenumber=e,this.searchUser()},handleAvatarSuccess:function(e,t){this.imageUrl=URL.createObjectURL(t.raw),this.addFrom.avatar=e.data.avatar},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type,a=e.size/1024/1024<2;return t||this.$message.error("上传头像图片必须是 JPG/PNG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&a}}},l=n,i=(a("8dd9"),a("2877")),c=Object(i["a"])(l,s,r,!1,null,"58ec1117",null);t["default"]=c.exports},d241:function(e,t,a){}}]);
//# sourceMappingURL=chunk-3bd14d9c.3578fd62.js.map