(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var o=t(0),u=t(1),a=t(14),c=t.n(a),r=t(3),l=function(e){return Object(o.jsxs)("div",{children:["Search ",Object(o.jsx)("input",{onChange:e.onChange})]})},i=function(e){return Object(o.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:e.nameValue,onChange:e.onNameChange})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{value:e.numberValue,onChange:e.onNumberChange})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){var n=e.item,t=e.toggleDelete;return Object(o.jsxs)("li",{children:[n.name," ",n.number,Object(o.jsx)("button",{onClick:t,children:"delete"})]},n.name)},b=t(4),d=t.n(b),f="api/persons",m=function(){return d.a.get(f).then((function(e){return e.data}))},j=function(e){return console.log(e),d.a.post(f,e).then((function(e){return e.data}))},h=function(e){return d.a.delete(f+"/".concat(e)).then((function(e){return e.data}))},O=function(e){return d.a.put(f+"/".concat(e.id),{person:e}).then((function(e){return e.data}))},p=function(e){var n=e.message,t=e.className;return null===n?null:Object(o.jsx)("div",{className:t,children:n})},v=function(){var e=Object(u.useState)([]),n=Object(r.a)(e,2),t=n[0],a=n[1],c=Object(u.useState)(""),b=Object(r.a)(c,2),d=b[0],f=b[1],v=Object(u.useState)(""),g=Object(r.a)(v,2),x=g[0],w=g[1],C=Object(u.useState)(""),S=Object(r.a)(C,2),k=S[0],y=S[1],D=t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())})),L=Object(u.useState)(null),N=Object(r.a)(L,2),T=N[0],V=N[1],E=Object(u.useState)(null),I=Object(r.a)(E,2),J=I[0],B=I[1],P=Object(u.useCallback)((function(){m().then((function(e){a(e)}))}),[]);Object(u.useEffect)((function(){m().then((function(e){a(e)}))}),[]);return Object(o.jsxs)("div",{children:[Object(o.jsx)("h1",{children:"Phonebook v. 0.0.4"}),Object(o.jsx)(p,{message:T,className:J}),Object(o.jsx)(l,{onChange:function(e){e.preventDefault(),y(e.target.value.toLowerCase())}}),Object(o.jsx)("h2",{children:"add a new"}),Object(o.jsx)(i,{onSubmit:function(e){e.preventDefault();var n={name:d,number:x};console.log(n);var o=t.filter((function(e){return e.name.toLowerCase()===d.toLowerCase()})).length>0;if(console.log(o),n.number.length<=0)B("error"),V("Only a name was given, you need to specify a number as well"),setTimeout((function(){B(null),V(null)}),2e3);else if(o)if(window.confirm("".concat(d," is already added to phonebook, replace the old number with a new number?"))){var u=t.filter((function(e){return e.name.toLowerCase()===n.name.toLowerCase()}));u[0].number=n.number;u[0].id;O(u[0]).then((function(){P()})),B("update"),V("".concat(u[0].name,"'s number was updated")),setTimeout((function(){B(null),V(null)}),2e3)}else f(""),w(""),y("");else j(n).then((function(e){a(t.concat(e)),f(""),w(""),y("")})),B("update"),V("".concat(n.name," was added to the phonebook")),setTimeout((function(){B(null),V(null)}),2e3)},nameValue:d,onNameChange:function(e){e.preventDefault(),f(e.target.value)},numberValue:x,onNumberChange:function(e){e.preventDefault(),w(e.target.value)}}),Object(o.jsx)("h2",{children:"Contacts"}),Object(o.jsx)("ul",{children:D.map((function(e){return Object(o.jsx)(s,{item:e,toggleDelete:function(){return function(e){console.log("note no "+e+" needs to be deleted");var n=D.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&h(e).then((function(){P(),B("delete"),V("".concat(n.name," was removed from the phonebook")),setTimeout((function(){B(null),V(null)}),2e3)})).catch((function(e){P(),B("delete"),V("Information of ".concat(n.name," has already been removed from the server.")),setTimeout((function(){B(null),V(null)}),2e3)}))}(e.id)}},e.id)}))})]})};t(37);c.a.render(Object(o.jsx)(v,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.c07db1c6.chunk.js.map