(this["webpackJsonptravel-app"]=this["webpackJsonptravel-app"]||[]).push([[7],{43:function(e,t,s){"use strict";var c=s(1);s(0),s(49);t.a=function(e){return Object(c.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},49:function(e,t,s){},56:function(e,t,s){"use strict";var c=s(1);s(0),s(57);t.a=function(e){return Object(c.jsx)("div",{className:"avatar ".concat(e.className),style:e.style,children:Object(c.jsx)("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}})})}},57:function(e,t,s){},65:function(e,t,s){},66:function(e,t,s){},75:function(e,t,s){"use strict";s.r(t);var c=s(47),r=s.n(c),a=s(48),n=s(11),i=s(1),l=s(0),u=s(50),j=s(17),o=s(43),d=s(8),h=s(56),m=(s(65),function(e){return Object(i.jsx)("li",{className:"user-item",children:Object(i.jsx)(o.a,{className:"user-item__content",children:Object(i.jsxs)(d.b,{to:"places/user/".concat(e.userId),children:[Object(i.jsx)("div",{className:"user-item__image",children:Object(i.jsx)(h.a,{image:"".concat("https://travelling-dreamer.herokuapp.com","/").concat(e.userImage),alt:e.userName})}),Object(i.jsxs)("div",{className:"user-item__info",children:[Object(i.jsx)("h2",{children:e.userName}),Object(i.jsxs)("h3",{children:[e.visitedPlaces,1===e.visitedPlaces?" Place":" Places"]})]})]})})})}),b=(s(66),function(e){return 0===e.users.length?Object(i.jsx)("div",{className:"center",children:Object(i.jsx)(o.a,{children:Object(i.jsx)("h2",{children:"No registered users found."})})}):Object(i.jsx)("ul",{className:"users-list",children:e.users.map((function(e){return Object(i.jsx)(m,{userId:e.id,userName:e.name,userImage:e.image,visitedPlaces:e.places.length},e.id)}))})}),p=s(51);t.default=function(){var e=Object(l.useState)(),t=Object(n.a)(e,2),s=t[0],c=t[1],o=Object(p.a)(),d=o.loading,h=o.error,m=o.getRequest,O=o.clearError;return Object(l.useEffect)((function(){(function(){var e=Object(a.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m("https://travelling-dreamer.herokuapp.com/api/users");case 3:t=e.sent,c(t.users),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[m]),Object(i.jsxs)(l.Fragment,{children:[d&&Object(i.jsx)("div",{className:"center",children:Object(i.jsx)(j.a,{})}),Object(i.jsx)(u.a,{error:h,onClear:O}),s&&Object(i.jsx)(b,{users:s})]})}}}]);
//# sourceMappingURL=7.0cc3ea0f.chunk.js.map