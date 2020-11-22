(this["webpackJsonptravel-app"]=this["webpackJsonptravel-app"]||[]).push([[4],{43:function(e,t,a){"use strict";var n=a(1);a(0),a(49);t.a=function(e){return Object(n.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},46:function(e,t,a){"use strict";a.d(t,"c",(function(){return u})),a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return o})),a.d(t,"d",(function(){return d}));var n=a(18);var i="REQUIRE",r="MINLENGTH",s="MAXLENGTH",c="EMAIL",u=function(){return{type:i}},l=function(e){return{type:r,val:e}},o=function(){return{type:c}},d=function(e,t){var a,u=!0,l=function(e,t){var a;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=Object(n.a)(e))||t&&e&&"number"===typeof e.length){a&&(e=a);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,c=!0,u=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return c=e.done,e},e:function(e){u=!0,s=e},f:function(){try{c||null==a.return||a.return()}finally{if(u)throw s}}}}(t);try{for(l.s();!(a=l.n()).done;){var o=a.value;o.type===i&&(u=u&&e.trim().length>0),o.type===r&&(u=u&&e.trim().length>=o.val),o.type===s&&(u=u&&e.trim().length<=o.val),"MIN"===o.type&&(u=u&&+e>=o.val),"MAX"===o.type&&(u=u&&+e<=o.val),o.type===c&&(u=u&&/^\S+@\S+\.\S+$/.test(e))}}catch(d){l.e(d)}finally{l.f()}return u}},49:function(e,t,a){},52:function(e,t,a){"use strict";var n=a(11),i=a(44),r=a(1),s=a(0),c=a(46),u=(a(53),function(e,t){switch(t.type){case"CHANGE":return Object(i.a)(Object(i.a)({},e),{},{inputValue:t.value,isValid:Object(c.d)(t.value,t.validators)});case"FOCUS":return Object(i.a)(Object(i.a)({},e),{},{isFocused:!0});default:return e}});t.a=function(e){var t=Object(s.useReducer)(u,{inputValue:e.initialValue||"",isFocused:!1,isValid:e.isInitialValid||!1}),a=Object(n.a)(t,2),i=a[0],c=a[1],l=e.id,o=e.onInput,d=i.inputValue,p=i.isValid;Object(s.useEffect)((function(){o(l,d,p)}),[o,l,d,p]);var j=function(t){c({type:"CHANGE",value:t.target.value,validators:e.validators})},b=function(e){c({type:"FOCUS"})},f="input"===e.element?Object(r.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:j,onBlur:b,value:i.inputValue}):Object(r.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:j,onBlur:b,value:i.inputValue});return Object(r.jsxs)("div",{className:"form-control ".concat(!i.isValid&&i.isFocused&&"form-control__invalid"),children:[Object(r.jsx)("label",{htmlFor:e.id,children:e.label}),f,!i.isValid&&i.isFocused&&Object(r.jsx)("p",{children:e.errorText})]})}},53:function(e,t,a){},54:function(e,t,a){"use strict";var n=a(11),i=a(55),r=a(44),s=a(0),c=function(e,t){switch(t.type){case"INPUT_CHANGE":var a=!0;for(var n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return Object(r.a)(Object(r.a)({},e),{},{inputs:Object(r.a)(Object(r.a)({},e.inputs),{},Object(i.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:a});case"INIT_INPUTS":return{inputs:t.inputValues,isValid:t.formIsValid};default:return e}};t.a=function(e,t){var a=Object(s.useReducer)(c,{inputs:e,isValid:t}),i=Object(n.a)(a,2),r=i[0],u=i[1];return console.log(r),[r,Object(s.useCallback)((function(e,t,a){u({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})}),[]),Object(s.useCallback)((function(e,t){u({type:"INIT_INPUTS",inputValues:e,formIsValid:t})}),[])]}},56:function(e,t,a){"use strict";var n=a(1);a(0),a(57);t.a=function(e){return Object(n.jsx)("div",{className:"avatar ".concat(e.className),style:e.style,children:Object(n.jsx)("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}})})}},57:function(e,t,a){},59:function(e,t,a){"use strict";var n=a(11),i=a(1),r=a(0),s=a(45);a(60);t.a=function(e){var t=Object(r.useRef)(),a=Object(r.useState)(),c=Object(n.a)(a,2),u=c[0],l=c[1],o=Object(r.useState)(),d=Object(n.a)(o,2),p=d[0],j=d[1],b=Object(r.useState)(!1),f=Object(n.a)(b,2),v=(f[0],f[1]);Object(r.useEffect)((function(){if(u){var e=new FileReader;e.onload=function(){j(e.result)},e.readAsDataURL(u)}}),[u]);return Object(i.jsxs)("div",{className:"form-control",children:[Object(i.jsx)("input",{id:e.id,ref:t,style:{display:"none"},type:"file",accept:".jpg, .png, .jpeg",onChange:function(t){return function(t){var a,n;t.target.files&&1===t.target.files.length?(a=t.target.files[0],l(a),v(!0),n=!0):(v(!1),n=!1),e.onImageUpload(e.id,a,n)}(t)}}),Object(i.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[Object(i.jsx)("div",{className:"image-upload__preview ".concat(e.previewClass&&"image-upload__avatar"),children:p?Object(i.jsx)("img",{src:p,alt:"Preview"}):Object(i.jsx)("p",{children:"Pick an image"})}),Object(i.jsx)(s.a,{type:"button",className:e.buttonClass,onClick:function(){t.current.click()},children:"Select Image"})]})]})}},60:function(e,t,a){},70:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n=a(44),i=a(47),r=a.n(i),s=a(48),c=a(11),u=a(1),l=a(0),o=a(2),d=a.p+"static/media/5.fa5a2473.png",p=a(43),j=(a(70),a(45)),b=a(52),f=a(46),v=a(54),m=a(56),O=a(50),h=a(17),g=a(12),y=a(51),x=a(59);t.default=function(){var e=Object(l.useContext)(g.a),t=Object(l.useState)(!1),a=Object(c.a)(t,2),i=a[0],N=a[1],I=Object(y.a)(),V=I.loading,w=I.error,S=I.getRequest,C=I.clearError,E=Object(v.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),T=Object(c.a)(E,3),k=T[0],_=T[1],A=T[2],P=Object(o.g)(),U=function(){var t=Object(s.a)(r.a.mark((function t(a){var n,s,c;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),console.log(k.inputs),!i){t.next=21;break}return(n=new FormData).append("userName",k.inputs.userName.value),n.append("userImage",k.inputs.userImage.value),n.append("userEmail",k.inputs.email.value),n.append("userPassword",k.inputs.password.value),t.prev=8,t.next=11,S("https://travelling-dreamer.herokuapp.com/api/users/signup","POST",n);case 11:s=t.sent,e.userSignin(s.user.id,s.token),P.push("/"),t.next=19;break;case 16:t.prev=16,t.t0=t.catch(8),console.log(t.t0);case 19:t.next=32;break;case 21:return t.prev=21,t.next=24,S("https://travelling-dreamer.herokuapp.com/api/users/signin","POST",JSON.stringify({userEmail:k.inputs.email.value,userPassword:k.inputs.password.value}),{"Content-Type":"application/json"});case 24:c=t.sent,e.userSignin(c.user.id,c.token),P.push("/"),t.next=32;break;case 29:t.prev=29,t.t1=t.catch(21),console.log(t.t1);case 32:case"end":return t.stop()}}),t,null,[[8,16],[21,29]])})));return function(e){return t.apply(this,arguments)}}(),F="SIGN IN",R="SIGN UP",G=" Don't have an account?";return i&&(F="CREATE ACCOUNT",R="SIGN IN",G="Already a Member?"),Object(u.jsxs)(l.Fragment,{children:[Object(u.jsx)(O.a,{error:w,onClear:C}),Object(u.jsxs)(p.a,{className:"authentication",children:[V&&Object(u.jsx)(h.a,{asOverlay:!0}),i?Object(u.jsx)("h2",{children:"Welcome to Travel App"}):Object(u.jsx)("h2",{children:"Welcome Back!"}),Object(u.jsx)("hr",{}),!i&&Object(u.jsx)(m.a,{image:d,alt:"USER",className:"auth__avatar-image"}),Object(u.jsxs)("form",{className:"place-form",onSubmit:U,children:[i&&Object(u.jsx)("div",{className:"auth__user-image",children:Object(u.jsx)(x.a,{previewClass:!0,center:!0,id:"userImage",onImageUpload:_,buttonClass:"auth__signup-button"})}),i&&Object(u.jsx)(b.a,{id:"userName",type:"text",label:"Name",element:"input",placeholder:"Official Name",errorText:"Min Length of 5 characters",validators:[Object(f.c)(),Object(f.b)(5)],onInput:_}),Object(u.jsx)(b.a,{id:"email",type:"text",label:"Email",element:"input",placeholder:"Valid Email Address",errorText:"Please Enter a valid Email",validators:[Object(f.c)(),Object(f.a)()],onInput:_}),Object(u.jsx)(b.a,{id:"password",type:"text",label:"Password",element:"input",placeholder:"Min length of 8 characters",errorText:"Please Enter a valid Password",validators:[Object(f.c)(),Object(f.b)(8)],onInput:_}),Object(u.jsx)(j.a,{type:"submit",disabled:!k.isValid,children:F})]}),G,Object(u.jsx)(j.a,{className:"auth__signup-button",onClick:function(){i?A(Object(n.a)(Object(n.a)({},k.inputs),{},{userName:void 0,userImage:void 0}),k.inputs.email.isValid&&k.inputs.password.isValid):A(Object(n.a)(Object(n.a)({},k.inputs),{},{userName:{value:"",isValid:!1},userImage:{value:null,isValid:!1}}),!1),N((function(e){return!e}))},children:R})]})]})}}}]);
//# sourceMappingURL=4.6f7c4cea.chunk.js.map