(this["webpackJsonptravel-app"]=this["webpackJsonptravel-app"]||[]).push([[6],{43:function(e,t,n){"use strict";var a=n(1);n(0),n(49);t.a=function(e){return Object(a.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},46:function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return o})),n.d(t,"d",(function(){return p}));var a=n(18);var i="REQUIRE",r="MINLENGTH",c="MAXLENGTH",l="EMAIL",u=function(){return{type:i}},s=function(e){return{type:r,val:e}},o=function(){return{type:l}},p=function(e,t){var n,u=!0,s=function(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(a.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,l=!0,u=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){u=!0,c=e},f:function(){try{l||null==n.return||n.return()}finally{if(u)throw c}}}}(t);try{for(s.s();!(n=s.n()).done;){var o=n.value;o.type===i&&(u=u&&e.trim().length>0),o.type===r&&(u=u&&e.trim().length>=o.val),o.type===c&&(u=u&&e.trim().length<=o.val),"MIN"===o.type&&(u=u&&+e>=o.val),"MAX"===o.type&&(u=u&&+e<=o.val),o.type===l&&(u=u&&/^\S+@\S+\.\S+$/.test(e))}}catch(p){s.e(p)}finally{s.f()}return u}},49:function(e,t,n){},52:function(e,t,n){"use strict";var a=n(11),i=n(44),r=n(1),c=n(0),l=n(46),u=(n(53),function(e,t){switch(t.type){case"CHANGE":return Object(i.a)(Object(i.a)({},e),{},{inputValue:t.value,isValid:Object(l.d)(t.value,t.validators)});case"FOCUS":return Object(i.a)(Object(i.a)({},e),{},{isFocused:!0});default:return e}});t.a=function(e){var t=Object(c.useReducer)(u,{inputValue:e.initialValue||"",isFocused:!1,isValid:e.isInitialValid||!1}),n=Object(a.a)(t,2),i=n[0],l=n[1],s=e.id,o=e.onInput,p=i.inputValue,d=i.isValid;Object(c.useEffect)((function(){o(s,p,d)}),[o,s,p,d]);var f=function(t){l({type:"CHANGE",value:t.target.value,validators:e.validators})},b=function(e){l({type:"FOCUS"})},v="input"===e.element?Object(r.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:f,onBlur:b,value:i.inputValue}):Object(r.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:f,onBlur:b,value:i.inputValue});return Object(r.jsxs)("div",{className:"form-control ".concat(!i.isValid&&i.isFocused&&"form-control__invalid"),children:[Object(r.jsx)("label",{htmlFor:e.id,children:e.label}),v,!i.isValid&&i.isFocused&&Object(r.jsx)("p",{children:e.errorText})]})}},53:function(e,t,n){},54:function(e,t,n){"use strict";var a=n(11),i=n(55),r=n(44),c=n(0),l=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var a in e.inputs)e.inputs[a]&&(n=a===t.inputId?n&&t.isValid:n&&e.inputs[a].isValid);return Object(r.a)(Object(r.a)({},e),{},{inputs:Object(r.a)(Object(r.a)({},e.inputs),{},Object(i.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"INIT_INPUTS":return{inputs:t.inputValues,isValid:t.formIsValid};default:return e}};t.a=function(e,t){var n=Object(c.useReducer)(l,{inputs:e,isValid:t}),i=Object(a.a)(n,2),r=i[0],u=i[1];return console.log(r),[r,Object(c.useCallback)((function(e,t,n){u({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),Object(c.useCallback)((function(e,t){u({type:"INIT_INPUTS",inputValues:e,formIsValid:t})}),[])]}},58:function(e,t,n){},72:function(e,t,n){"use strict";n.r(t);var a=n(47),i=n.n(a),r=n(48),c=n(11),l=n(1),u=n(0),s=n(2),o=n(45),p=n(52),d=n(46),f=n(54),b=(n(58),n(43)),v=n(51),j=n(17),O=n(50),h=n(12);t.default=function(){var e=Object(s.h)().placeId,t=Object(u.useState)(),n=Object(c.a)(t,2),a=n[0],y=n[1],m=Object(v.a)(),V=m.loading,x=m.error,I=m.getRequest,N=m.clearError,g=Object(f.a)({title:{value:"",isValid:!1},description:{value:"",isValid:!1}},!1),E=Object(c.a)(g,3),C=E[0],T=E[1],S=E[2],w=Object(s.g)(),A=Object(u.useContext)(h.a),k=A.loggedUser,F=A.token;Object(u.useEffect)((function(){(function(){var t=Object(r.a)(i.a.mark((function t(){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,I("".concat("https://travelling-dreamer.herokuapp.com/api","/places/").concat(e));case 3:n=t.sent,y(n.place),S({title:{value:n.place.title,isValid:!0},description:{value:n.place.description,isValid:!0}},!0),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}})()()}),[I,e,S]);var P=function(){var t=Object(r.a)(i.a.mark((function t(n){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.prev=1,t.next=4,I("".concat("https://travelling-dreamer.herokuapp.com/api","/places/").concat(e),"PATCH",JSON.stringify({title:C.inputs.title.value,description:C.inputs.description.value}),{"Content-Type":"application/json",Authorization:"Bearer "+F});case 4:w.replace("/places/user/".concat(k)),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e){return t.apply(this,arguments)}}();return V?Object(l.jsx)("div",{className:"center",children:Object(l.jsx)(j.a,{})}):a||x?Object(l.jsxs)(u.Fragment,{children:[Object(l.jsx)(O.a,{error:x,onClear:N}),a&&!V&&Object(l.jsxs)("form",{className:"place-form",onSubmit:P,children:[Object(l.jsx)(p.a,{id:"title",type:"text",label:"Title",element:"input",errorText:"Please Enter a valid title",validators:[Object(d.c)()],initialValue:a.title,onInput:T,isInitialValid:!0}),Object(l.jsx)(p.a,{id:"description",label:"Description",element:"textarea",errorText:"Please Enter a valid description",validators:[Object(d.b)(5)],initialValue:a.description,onInput:T,isInitialValid:!0}),Object(l.jsx)(o.a,{type:"submit",disabled:!C.isValid,children:"UPDATE PLACE"})]})]}):Object(l.jsx)("div",{className:"center",children:Object(l.jsx)(b.a,{children:Object(l.jsx)("h2",{children:"Sorry! Cannot Find the place"})})})}}}]);
//# sourceMappingURL=6.0ca0a2fe.chunk.js.map