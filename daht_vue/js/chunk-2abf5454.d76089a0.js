(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2abf5454"],{"3e4f":function(e,t,r){"use strict";var s=r("bc4c"),n=r.n(s);n.a},a55b:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login-content"},[r("el-form",{ref:"loginFrom",staticClass:"login-form",attrs:{model:e.loginFrom,rules:e.rules,size:" small"}},[r("h1",{staticClass:"login-title"},[e._v("考试后台管理")]),r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{model:{value:e.loginFrom.username,callback:function(t){e.$set(e.loginFrom,"username",t)},expression:"loginFrom.username"}},[r("i",{staticClass:"el-icon-user-solid",attrs:{slot:"prefix"},slot:"prefix"})])],1),r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{model:{value:e.loginFrom.password,callback:function(t){e.$set(e.loginFrom,"password",t)},expression:"loginFrom.password"}},[r("i",{staticClass:"el-icon-unlock",attrs:{slot:"prefix"},slot:"prefix"})])],1),r("el-form-item",[r("el-button",{staticClass:"login-button",attrs:{type:"primary"},on:{click:function(t){return e.submitForm("loginFrom")}}},[e._v("登陆")])],1)],1)],1)},n=[],o=(r("96cf"),r("3b8d")),a={data:function(){return{loginFrom:{username:"admin",password:"123456"},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(r){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=5;break}return e.next=3,t.$http.post("/users/login",t.loginFrom);case 3:s=e.sent,200==s.data.meta.status?(localStorage.setItem("token",s.data.token),localStorage.setItem("username",s.data.data.username),t.$router.push("/home/userlist"),t.$message({message:"登陆成功",type:"success"})):t.$message.error("登陆失败");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}},i=a,l=(r("3e4f"),r("2877")),u=Object(l["a"])(i,s,n,!1,null,"3cc1eac0",null);t["default"]=u.exports},bc4c:function(e,t,r){}}]);
//# sourceMappingURL=chunk-2abf5454.d76089a0.js.map