(this.webpackJsonpblogilista_frontend=this.webpackJsonpblogilista_frontend||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(16),o=n.n(c),i=n(4),s=n.n(i),u=n(5),l=n(2),d=n(0),j=function(e){return Object(d.jsxs)("div",{children:["Search ",Object(d.jsx)("input",{onChange:e.onChange})]})},b=function(e){var t=e.createBlog,n=Object(r.useState)(""),a=Object(l.a)(n,2),c=a[0],o=a[1],i=Object(r.useState)(""),s=Object(l.a)(i,2),u=s[0],j=s[1],b=Object(r.useState)(""),f=Object(l.a)(b,2),h=f[0],p=f[1];return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Add a new blog to the list"}),Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t({title:c,author:u,url:h}),o(""),j(""),p("")},children:[Object(d.jsxs)("div",{children:["Title: ",Object(d.jsx)("input",{value:c,onChange:function(e){e.preventDefault(),o(e.target.value)}})]}),Object(d.jsxs)("div",{children:["Author: ",Object(d.jsx)("input",{value:u,onChange:function(e){e.preventDefault(),j(e.target.value)}})]}),Object(d.jsxs)("div",{children:["Url: ",Object(d.jsx)("input",{value:h,onChange:function(e){e.preventDefault(),p(e.target.value)}})]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",children:"Add"})})]})]})},f=function(e){var t=e.blog,n=e.toggleDelete,r=e.toggleLike;return Object(d.jsxs)("li",{className:"blog",children:[t.title," by ",t.author," with ",t.likes," likes",Object(d.jsx)("button",{onClick:r,children:"like"}),Object(d.jsx)("button",{onClick:n,children:"delete"})]},t.title)},h=function(e){var t=e.message,n=e.className;return null===t?null:Object(d.jsx)("div",{className:n,children:t})},p=function(e){var t=e.username,n=e.password,r=e.onUsernameChange,a=e.onPasswordChange,c=e.handleSubmit;return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Login"}),Object(d.jsxs)("form",{onSubmit:c,children:[Object(d.jsxs)("div",{children:["username",Object(d.jsx)("input",{value:t,onChange:r})]}),Object(d.jsxs)("div",{children:["password",Object(d.jsx)("input",{type:"password",value:n,onChange:a})]}),Object(d.jsx)("button",{type:"submit",children:"login"})]})]})},g=a.a.forwardRef((function(e,t){var n=Object(r.useState)(!1),a=Object(l.a)(n,2),c=a[0],o=a[1],i={display:c?"none":""},s={display:c?"":"none"},u=function(){o(!c)};return Object(r.useImperativeHandle)(t,(function(){return{toggleVisibility:u}})),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{style:i,children:Object(d.jsx)("button",{onClick:u,children:e.buttonLabel})}),Object(d.jsxs)("div",{style:s,children:[e.children,Object(d.jsx)("button",{onClick:u,children:"Cancel"})]})]})})),O=n(6),v=n.n(O),x={login:function(){var e=Object(u.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},m="api/blogs",w=null,y={getAll:function(){return v.a.get(m).then((function(e){return e.data}))},create:function(){var e=Object(u.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:w}},e.next=3,v.a.post(m,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),remove:function(){var e=Object(u.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("tassa",t),n={headers:{Authorization:w}},e.next=4,v.a.delete(m+"/".concat(t),n);case 4:return r=e.sent,e.abrupt("return",r.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),put:function(e,t){return v.a.put(m+"/".concat(e),t).then((function(e){return e.data}))},setToken:function(e){w="bearer ".concat(e)}},k=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(null),o=Object(l.a)(c,2),i=o[0],O=o[1],v=Object(r.useState)(""),m=Object(l.a)(v,2),w=m[0],k=m[1],C=n.filter((function(e){return e.title.toLowerCase().includes(w.toLowerCase())})),S=Object(r.useState)(null),L=Object(l.a)(S,2),A=L[0],B=L[1],D=Object(r.useState)(""),N=Object(l.a)(D,2),T=N[0],U=N[1],E=Object(r.useState)(""),I=Object(l.a)(E,2),J=I[0],z=I[1],P=Object(r.useState)(null),R=Object(l.a)(P,2),V=R[0],_=R[1],H=Object(r.useRef)();Object(r.useEffect)((function(){y.getAll().then((function(e){a(e)}))}),[]),Object(r.useEffect)((function(){var e=window.localStorage.getItem("loggedBlogAppUser");if(e){var t=JSON.parse(e);_(t),y.setToken(t.token)}}),[]);var Y=function(e){var t=e.message,n=e.type;B(n),O("".concat(t)),setTimeout((function(){B(null),O(null)}),3e3)},q=function(e){var t=n.filter((function(t){return t.title.toLowerCase()===e.title.toLowerCase()}));t[0]?Y({message:"A blog by the name ".concat(t[0].title," is already on Blogister."),type:"error"}):(H.current.toggleVisibility(),y.create(e).then((function(t){a(n.concat(t)),Y({message:"".concat(e.title," was added to the Blogister-list"),type:"update"})})).catch((function(e){Y({message:e.response.data,type:"error"})})))},F=function(){var e=Object(u.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,x.login({username:T,password:J});case 4:n=e.sent,window.localStorage.setItem("loggedBlogAppUser",JSON.stringify(n)),y.setToken(n.token),_(n),U(""),z(""),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),Y({message:"wrong username or password",type:"delete"});case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),localStorage.clear(),window.location.reload(),Y({message:"Succesfully logged out",type:"update"});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:"Blogister v. 0.0.4"}),null===V?Object(d.jsx)(g,{buttonLabel:"log in",children:Object(d.jsx)(p,{username:T,password:J,onUsernameChange:function(e){var t=e.target;return U(t.value)},onPasswordChange:function(e){var t=e.target;return z(t.value)},handleSubmit:F})}):Object(d.jsxs)("div",{children:[Object(d.jsxs)("p",{children:["Logged in as: ",V.name," ",Object(d.jsx)("button",{onClick:G,children:"logout"})]}),Object(d.jsx)(j,{onChange:function(e){e.preventDefault(),k(e.target.value.toLowerCase())}}),Object(d.jsx)(g,{buttonLabel:"Add a new blog",ref:H,children:Object(d.jsx)(b,{createBlog:q})}),Object(d.jsx)("h2",{children:"Blogs"}),Object(d.jsx)("ul",{children:C.map((function(e){return Object(d.jsx)(f,{blog:e,toggleLike:function(){return function(e){var t=n.filter((function(t){return t.id===e}))[0],r={title:t.title,author:t.author,url:t.url,likes:t.likes+1};y.put(e,r).then((function(t){a(n.map((function(n){return n.id!==e?n:t}))),Y({message:"You liked ".concat(r.title,"!"),type:"update"})})).catch((function(e){console.log(e)}))}(e.id)},toggleDelete:function(){return function(e){var t=C.find((function(t){return t.id===e}));window.confirm("Delete ".concat(t.title," ?"))&&y.remove(e).then((function(){var r=n.filter((function(t){return t.id!==e}));a(r),Y({message:"".concat(t.title," was removed from the Blogister-list"),type:"delete"})})).catch((function(e){Y({message:"Error has occurred. Could not delete ".concat(t.title,"."),type:"delete"})}))}(e.id)}},e.id)}))})]}),Object(d.jsx)(h,{message:i,className:A})]})};n(41);o.a.render(Object(d.jsx)(k,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.81ee017a.chunk.js.map