(()=>{var e={};e.id=178,e.ids=[178],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},6113:e=>{"use strict";e.exports=require("crypto")},6005:e=>{"use strict";e.exports=require("node:crypto")},1017:e=>{"use strict";e.exports=require("path")},7310:e=>{"use strict";e.exports=require("url")},5553:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>d,routeModule:()=>h,tree:()=>c});var a=s(7096),l=s(6132),r=s(7284),i=s.n(r),n=s(2564),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);s.d(t,o);let c=["",{children:["profile",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,8939)),"C:\\Users\\sebik\\Desktop\\H1B\\H1BMatch_FrontEnd\\src\\app\\profile\\page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,9113)),"C:\\Users\\sebik\\Desktop\\H1B\\H1BMatch_FrontEnd\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\sebik\\Desktop\\H1B\\H1BMatch_FrontEnd\\src\\app\\profile\\page.tsx"],p="/profile/page",u={require:s,loadChunk:()=>Promise.resolve()},h=new a.AppPageRouteModule({definition:{kind:l.x.APP_PAGE,page:"/profile/page",pathname:"/profile",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},8358:(e,t,s)=>{Promise.resolve().then(s.bind(s,211))},211:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>ProfilePage});var a=s(784),l=s(9885),r=s(5304),i=s(7040),n=s(312),o=s(7133),c=s(7505),d=s(7550),p=s(976),u=s(391),h=s(7094),x=s(6206),m=s(9546),f=s(6315),g=s(5037),j=s(366),y=s(2960);let b="http://localhost:3001/api";function ProfilePage(){let{isSignedIn:e}=(0,g.aC)(),[t,s]=(0,l.useState)("Passionate developer with a knack for creating efficient and scalable web applications. Always eager to learn new technologies and solve complex problems."),[v,N]=(0,l.useState)(!1),[w,P]=(0,l.useState)(["React","Node.js","TypeScript","GraphQL","AWS"]),[k,S]=(0,l.useState)(!1),[C,_]=(0,l.useState)("Add a skill"),[E,U]=(0,l.useState)("Your About Section. Write a brief description about yourself."),[T,z]=(0,l.useState)(!1),[F,q]=(0,l.useState)(null),[O,A]=(0,l.useState)(null),[D,R]=(0,l.useState)("Update your Job Title"),[Z,B]=(0,l.useState)("Update your location"),[$,J]=(0,l.useState)(!1),[M,H]=(0,l.useState)(!1),[G,I]=(0,l.useState)(""),[L,Y]=(0,l.useState)(!1),[Q,W]=(0,l.useState)("FirstName LastName"),[X,K]=(0,l.useState)(""),[V,ee]=(0,l.useState)(!1),[et,es]=(0,l.useState)(null),ea=(0,l.useRef)(null),el=(0,l.useRef)(null);async function getContent(e){let t=await j.Me({data:e}).promise,s=await t.getPage(1);return await s.getTextContent()}async function getItems(e){let t=await getContent(e),s="";return t.items.forEach(e=>{e.str&&(s+=e.str+" ")}),s.trim()}(0,l.useEffect)(()=>{getUserData()},[]);let getUserData=async()=>{let e=await fetch(`${b}/profile`,{credentials:"include"});if(!e.ok){console.error("Error fetching user data");return}let t=await e.json();console.log("The data is "+JSON.stringify(t)),t.resume_uploaded_date?es(t.resume_uploaded_date):es(""),W(t.name.split(" ").map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" ")),R(t.title),B(t.location),s(t.bio),U(t.about),K(t.profile_picture_link)},handleResumeUpload=async e=>{let t=e.target.files?.[0];if(t){if("application/pdf"===t.type){q(t),A(new Date().toLocaleString()),Y(!0);try{let e=await t.arrayBuffer(),s=await getItems(e);console.log("The text is "+s),I(s);let a=await fetch(`${b}/resume`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({resume:s}),credentials:"include"});a.ok?alert("Resume uploaded successfully"):alert("Error uploading resume. Please try again.")}catch(e){console.error("Error reading PDF:",e),alert("Error reading PDF file. Please try again.")}finally{Y(!1)}}else alert("Please upload a PDF file")}},handleProfilePictureUpload=async e=>{let t=e.target.files?.[0];if(t){let e=new FormData;e.append("profilePicture",t);try{let t=await fetch(`${b}/upload-profile-picture`,{method:"POST",body:e,credentials:"include"});if(t.ok){let e=await t.json();K(e.profilePictureLink),ee(!1)}else alert("Error uploading profile picture. Please try again.")}catch(e){console.error("Error uploading profile picture:",e),alert("Error uploading profile picture. Please try again.")}}},handleRemoveSkill=async e=>{let t=w.filter(t=>t!==e);try{P(t)}catch(e){console.error("Error updating skills:",e),alert("Failed to update skills. Please try again.")}},handleUpdateJobTitle=async e=>{try{let t=await fetch(`${b}/update-title`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jobTitle:e}),credentials:"include"});t.ok?console.log("Successfully updated job title"):alert("Error updating job title. Please try again."),J(!1)}catch(e){console.error("Error updating job title:",e),alert("Failed to update job title. Please try again.")}},handleUpdateCity=async e=>{try{let t=await fetch(`${b}/update-location`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({location:e}),credentials:"include"});t.ok?console.log("Successfully updated the location"):alert("Error updating job title. Please try again."),H(!1)}catch(e){console.error("Error updating city:",e),alert("Failed to update city. Please try again.")}},handleUpdateSkills=async e=>{try{S(!1)}catch(e){console.error("Error updating skills:",e),alert("Failed to update skills. Please try again.")}},handleUpdateBio=async e=>{try{let t=await fetch(`${b}/update-bio`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({bio:e}),credentials:"include"});t.ok?console.log("Successfully updated users bio"):alert("Error updating bio. Please try again."),N(!1)}catch(e){console.error("Error updating bio:",e),alert("Failed to update bio. Please try again.")}},handleUpdateAbout=async e=>{try{let t=await fetch(`${b}/update-about`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({about:e}),credentials:"include"});t.ok?console.log("Successfully updated about section"):alert("Error updating About section. Please try again."),z(!1)}catch(e){console.error("Error updating about:",e),alert("Failed to update about section. Please try again.")}};return(0,a.jsxs)("div",{className:"flex ",children:[a.jsx(y.l,{}),a.jsx("div",{className:"ml-64 flex-1 p-4",children:(0,a.jsxs)("div",{className:"container mx-auto space-y-6 w-[90%] md:w-[50%]",children:[(0,a.jsxs)(i.Zb,{children:[a.jsx(i.Ol,{children:(0,a.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsxs)(n.qE,{className:"h-20 w-20 md:h-32 md:w-32",children:[a.jsx(n.F$,{src:X,alt:"Profile Picture"}),a.jsx(n.Q5,{children:Q.split(" ").map(e=>e[0]).join("")})]}),(0,a.jsxs)(r.z,{variant:"secondary",size:"icon",className:"absolute bottom-0 right-0",onClick:()=>{el.current?.click()},children:[a.jsx(p.Z,{className:"h-4 w-4"}),a.jsx("span",{className:"sr-only",children:"Change profile picture"})]}),a.jsx(c.I,{ref:el,type:"file",accept:"image/*",onChange:handleProfilePictureUpload,className:"hidden"})]}),(0,a.jsxs)("div",{children:[a.jsx(i.ll,{className:"text-2xl",children:Q}),$?(0,a.jsxs)("div",{className:"flex items-center gap-2 mt-1",children:[a.jsx(c.I,{value:D,placeholder:"Update your job title",onChange:e=>R(e.target.value),className:"h-6 py-1 text-sm"}),a.jsx(r.z,{size:"sm",onClick:()=>handleUpdateJobTitle(D),children:"Save"})]}):(0,a.jsxs)("p",{className:"text-sm text-muted-foreground flex items-center gap-2",children:[D,(0,a.jsxs)(r.z,{variant:"ghost",size:"sm",onClick:()=>J(!0),children:[a.jsx(u.Z,{className:"h-3 w-3"}),a.jsx("span",{className:"sr-only",children:"Edit job title"})]})]}),(0,a.jsxs)("div",{className:"flex items-center mt-1 text-sm text-muted-foreground",children:[a.jsx(h.Z,{className:"mr-1 h-4 w-4"}),M?(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[a.jsx(c.I,{value:Z,onChange:e=>B(e.target.value),className:"h-6 py-1 text-sm",placeholder:"Update your location"}),a.jsx(r.z,{size:"sm",onClick:()=>handleUpdateCity(Z),children:"Save"})]}):(0,a.jsxs)("span",{className:"flex items-center gap-2",children:[Z,(0,a.jsxs)(r.z,{variant:"ghost",size:"sm",onClick:()=>H(!0),children:[a.jsx(u.Z,{className:"h-3 w-3"}),a.jsx("span",{className:"sr-only",children:"Edit city"})]})]})]})]})]})}),a.jsx(i.aY,{children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[a.jsx("h3",{className:"font-semibold",children:"Top Skills"}),(0,a.jsxs)(r.z,{variant:"ghost",size:"sm",onClick:()=>S(!k),children:[a.jsx(u.Z,{className:"h-4 w-4"}),a.jsx("span",{className:"sr-only",children:"Edit skills"})]})]}),k?(0,a.jsxs)("div",{className:"space-y-2",children:[a.jsx("div",{className:"flex flex-wrap gap-2",children:w.map((e,t)=>(0,a.jsxs)(o.C,{variant:"secondary",children:[e,(0,a.jsxs)("button",{onClick:()=>handleRemoveSkill(e),className:"ml-1 text-xs",children:[a.jsx(x.Z,{className:"h-3 w-3"}),a.jsx("span",{className:"sr-only",children:"Remove skill"})]})]},t))}),(0,a.jsxs)("div",{className:"flex gap-2",children:[a.jsx(c.I,{value:C,onChange:e=>_(e.target.value),placeholder:"Add a skill",className:"flex-grow"}),a.jsx(r.z,{onClick:()=>handleUpdateSkills(w),children:"Add"})]})]}):a.jsx("div",{className:"flex flex-wrap gap-2",children:w.map((e,t)=>a.jsx(o.C,{variant:"secondary",children:e},t))})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[a.jsx("h3",{className:"font-semibold",children:"Bio"}),(0,a.jsxs)(r.z,{variant:"ghost",size:"sm",onClick:()=>N(!v),children:[a.jsx(u.Z,{className:"h-4 w-4"}),a.jsx("span",{className:"sr-only",children:"Edit bio"})]})]}),v?(0,a.jsxs)("div",{className:"space-y-2",children:[a.jsx(d.g,{value:t,onChange:e=>s(e.target.value),rows:4}),a.jsx(r.z,{onClick:()=>handleUpdateBio(t),children:"Save"})]}):a.jsx("p",{className:"text-sm text-muted-foreground",children:t})]})]})})]}),(0,a.jsxs)(i.Zb,{children:[a.jsx(i.Ol,{children:a.jsx(i.ll,{className:"text-xl",children:"Resume"})}),(0,a.jsxs)(i.aY,{children:[(0,a.jsxs)("div",{className:"flex flex-wrap items-center justify-between mb-4",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[a.jsx(m.Z,{className:"mr-2 h-5 w-5"}),a.jsx("span",{className:"text-purple-400 font-serif",children:et?`Resume uploaded on: ${new Date(et).toLocaleDateString()}`:"No resume uploaded"})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsxs)(r.z,{variant:"outline",onClick:()=>{ea.current?.click()},disabled:L,children:[a.jsx(f.Z,{className:"mr-2 h-4 w-4"}),L?"Processing...":"Upload Resume"]}),a.jsx(c.I,{ref:ea,type:"file",accept:".pdf",onChange:handleResumeUpload,className:"hidden"})]})]}),O&&(0,a.jsxs)("p",{className:"text-sm text-muted-foreground",children:["Uploaded on: ",O]}),L&&a.jsx("p",{className:"text-sm text-muted-foreground mt-2",children:"Reading PDF content..."})]})]}),(0,a.jsxs)(i.Zb,{children:[a.jsx(i.Ol,{children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[a.jsx(i.ll,{className:"text-xl",children:"About"}),(0,a.jsxs)(r.z,{variant:"ghost",size:"sm",onClick:()=>z(!T),children:[a.jsx(u.Z,{className:"h-4 w-4"}),a.jsx("span",{className:"sr-only",children:"Edit about section"})]})]})}),a.jsx(i.aY,{children:T?(0,a.jsxs)("div",{className:"space-y-2",children:[a.jsx(d.g,{value:E,onChange:e=>U(e.target.value),rows:4}),a.jsx(r.z,{onClick:()=>handleUpdateAbout(E),children:"Save"})]}):a.jsx("p",{className:"text-sm text-muted-foreground",children:E})})]})]})})]})}j.Tu.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.mjs"},8939:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>r,default:()=>o});var a=s(5153);let l=(0,a.createProxy)(String.raw`C:\Users\sebik\Desktop\H1B\H1BMatch_FrontEnd\src\app\profile\page.tsx`),{__esModule:r,$$typeof:i}=l,n=l.default,o=n}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[560,323,251,440,129,990,121,831,370,906,337,639],()=>__webpack_exec__(5553));module.exports=s})();