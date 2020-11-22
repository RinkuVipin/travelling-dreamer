(this["webpackJsonptravel-app"]=this["webpackJsonptravel-app"]||[]).push([[8],{43:function(e,t,c){"use strict";var n=c(1);c(0),c(49);t.a=function(e){return Object(n.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},49:function(e,t,c){},67:function(e,t,c){},68:function(e,t,c){},69:function(e,t,c){},74:function(e,t,c){"use strict";c.r(t);var n=c(47),a=c.n(n),r=c(48),s=c(11),l=c(1),o=c(0),i=c(2),d=c(45),j=c(43),u=c(12),p=(c(67),function(e){var t=Object(o.useRef)(),c=e.center,n=e.zoom;return Object(o.useEffect)((function(){new window.ol.Map({target:t.current.id,layers:[new window.ol.layer.Tile({source:new window.ol.source.OSM})],view:new window.ol.View({center:window.ol.proj.fromLonLat([c.lng,c.lat]),zoom:n})})}),[c,n]),Object(l.jsx)("div",{ref:t,className:"map ".concat(e.className),style:e.style,id:"map"})}),b=c(61),O=(c(68),c(51)),h=c(50),m=c(17),f=function(e){var t=Object(O.a)(),c=t.loading,n=t.error,f=t.getRequest,x=t.clearError,v=Object(i.g)(),g=Object(o.useContext)(u.a),w=g.isSignedIn,C=g.loggedUser,E=g.token,N=Object(o.useState)(!1),_=Object(s.a)(N,2),k=_[0],I=_[1],y=Object(o.useState)(!1),D=Object(s.a)(y,2),A=D[0],L=D[1],S=function(){return I(!1)},F=function(){return L(!1)},T=function(){var t=Object(r.a)(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return L(!1),t.prev=1,t.next=4,f("".concat("https://travelling-dreamer.herokuapp.com/api","/places/").concat(e.placeId),"DELETE",null,{Authorization:"Bearer "+E});case 4:e.loadAfterDelete(e.placeId),v.replace("/places/user/".concat(C)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(){return t.apply(this,arguments)}}();return Object(l.jsxs)(o.Fragment,{children:[Object(l.jsx)(h.a,{error:n,onClear:x}),Object(l.jsx)(b.a,{show:k,onCancel:S,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:Object(l.jsx)(d.a,{onClick:S,children:"CLOSE"}),children:Object(l.jsx)("div",{className:"place-item__map-container",children:Object(l.jsx)(p,{center:e.coordinates,zoom:16})})}),Object(l.jsx)(b.a,{show:A,onCancel:F,header:"Delete Place ?",footerClass:"place-item__modal-actions",footer:Object(l.jsxs)(o.Fragment,{children:[Object(l.jsx)(d.a,{onClick:F,inverse:!0,children:"CANCEL"}),Object(l.jsx)(d.a,{onClick:T,danger:!0,children:"DELETE"})]}),children:Object(l.jsx)("p",{children:"Are you sure you want to delete this place permanently ? "})}),Object(l.jsx)("li",{className:"place-item",children:Object(l.jsxs)(j.a,{className:"place-item__content",children:[c&&Object(l.jsx)(m.a,{asOverlay:!0}),Object(l.jsx)("div",{className:"place-item__image",children:Object(l.jsx)("img",{src:"".concat("https://travelling-dreamer.herokuapp.com","/").concat(e.image),alt:e.title})}),Object(l.jsxs)("div",{className:"place-item__info",children:[Object(l.jsx)("h2",{children:e.title}),Object(l.jsx)("h3",{children:e.address}),Object(l.jsx)("p",{children:e.description})]}),Object(l.jsxs)("div",{className:"place-item__actions",children:[Object(l.jsx)(d.a,{inverse:!0,onClick:function(){return I(!0)},children:"VIEW ON MAP"}),w&&C===e.creatorId&&Object(l.jsx)(d.a,{to:"/places/".concat(e.placeId),children:"EDIT"}),w&&C===e.creatorId&&Object(l.jsx)(d.a,{danger:!0,onClick:function(){return L(!0)},children:"DELETE"})]})]})})]})},x=(c(69),function(e){var t=Object(o.useContext)(u.a).loggedUser;return 0===e.places.length?Object(l.jsx)("div",{className:"place-list center",children:Object(l.jsxs)(j.a,{children:[Object(l.jsx)("h2",{children:"No Places Found!"}),e.userId===t&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h2",{children:"Do you want to create one ?"})," ",Object(l.jsx)(d.a,{to:"/places/new",children:"Share Place"})," "]})]})}):Object(l.jsx)("ul",{className:"place-list",children:e.places.map((function(t){return Object(l.jsx)(f,{placeId:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creatorId,coordinates:t.location,loadAfterDelete:e.loadAfterDelete},t.id)}))})});t.default=function(){var e=Object(o.useState)(),t=Object(s.a)(e,2),c=t[0],n=t[1],d=Object(O.a)(),j=d.loading,u=d.error,p=d.getRequest,b=d.clearError,f=Object(i.h)().userId;Object(o.useEffect)((function(){(function(){var e=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p("".concat("https://travelling-dreamer.herokuapp.com/api","/places/user/").concat(f));case 3:t=e.sent,n(t.places),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[p,f]);return Object(l.jsxs)(o.Fragment,{children:[j&&Object(l.jsx)("div",{className:"center",children:Object(l.jsx)(m.a,{})}),Object(l.jsx)(h.a,{error:u,onClear:b}),c&&Object(l.jsx)(x,{places:c,userId:f,loadAfterDelete:function(e){n((function(t){return t.filter((function(t){return t.id!==e}))}))}})]})}}}]);
//# sourceMappingURL=8.2b32fb6f.chunk.js.map