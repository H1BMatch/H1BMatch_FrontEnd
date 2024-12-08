(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[301],{4538:function(e,t,r){Promise.resolve().then(r.bind(r,6238))},6238:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return AboutUsPage}});var n=r(7437),a=r(2265),s=r(609),o=r(6812),i=r(3089),l=r(6582),u=r(4606);function DeveloperCard(e){let{name:t,role:r,email:a,photo:i,description:l}=e;return(0,n.jsx)(s.Zb,{children:(0,n.jsxs)(s.aY,{className:"mx-4 p-4 flex flex-col items-center text-center",children:[(0,n.jsxs)(o.qE,{className:"w-24 h-24 mb-3",children:[(0,n.jsx)(o.F$,{src:i,alt:t}),(0,n.jsx)(o.Q5,{children:t.split(" ").map(e=>e[0]).join("")})]}),(0,n.jsx)("h3",{className:"text-lg font-semibold mb-2",children:t}),(0,n.jsx)("p",{className:"text-sm text-muted-foreground mb-2",children:r}),(0,n.jsx)("a",{href:"mailto:".concat(a),className:"text-sm text-blue-600 hover:underline mb-4",children:a}),(0,n.jsx)("p",{className:"text-xs",children:l})]})})}function ContactForm(){let[e,t]=(0,a.useState)(!1),[r,s]=(0,a.useState)(null),handleSubmit=async e=>{e.preventDefault(),t(!0),s(null);let r=e.currentTarget,n=new FormData(r);try{let e=await fetch("https://formspree.io/f/myzyyqaj",{method:"POST",body:n,headers:{Accept:"application/json"}});if(e.ok)s("Thanks for your submission!"),r.reset();else{let t=await e.json();Object.hasOwn(t,"errors")?s(t.errors.map(e=>e.message).join(", ")):s("Oops! There was a problem submitting your form")}}catch(e){s("Oops! There was a problem submitting your form")}t(!1)};return(0,n.jsxs)("form",{onSubmit:handleSubmit,className:"space-y-6",children:[(0,n.jsx)("div",{children:(0,n.jsx)(l.I,{type:"text",name:"name",placeholder:"Your Name",required:!0,className:"w-full"})}),(0,n.jsx)("div",{children:(0,n.jsx)(l.I,{type:"email",name:"email",placeholder:"Your Email",required:!0,className:"w-full"})}),(0,n.jsx)("div",{children:(0,n.jsx)(u.g,{name:"message",placeholder:"Your Message",required:!0,className:"w-full min-h-[150px]"})}),(0,n.jsx)(i.z,{type:"submit",disabled:e,className:"w-full",children:e?"Sending...":"Send Message"}),r&&(0,n.jsx)("div",{className:"mt-4 p-4 ".concat(r.includes("Oops")?"bg-red-100 text-red-700":"bg-green-100 text-green-700"," rounded-md"),role:"alert",children:r})]})}function AboutUsPage(){return(0,n.jsx)("div",{className:"container mx-auto py-12 flex",children:(0,n.jsxs)("div",{className:"ml-64 flex-1 p-4",children:[(0,n.jsx)("h1",{className:"text-4xl font-bold mx-auto mb-12 text-center",children:"About Us"}),(0,n.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-4",children:[{name:"Bikash Acharya",role:"Full Stack Engineer",email:"sebikash10@gmail.com",photo:"https://media.licdn.com/dms/image/v2/D5603AQHmJozR8AMzJA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1666404518370?e=1738800000&v=beta&t=1Zo2k3OLQf5BPgH2vpr-flwhmSgZET44F-qhc2WPnko",description:"Software Development & Data Science Enthusiast | Computer Science & Data Science Graduate NKU (Dec '24)"},{name:"Yoseph Shibiru",role:"Full Stack Engineer",email:"shibiruy1@nku.edu",photo:"https://media.licdn.com/dms/image/v2/C4E03AQEDGMN9BApOPQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1659142629876?e=1738800000&v=beta&t=H4enUqNbSY6Ut_93lv-MBhCOxDuem6h91luBusY6h2I",description:"Prev Data Engineer Intern @Amazon | CS 24'"},{name:"Navleen Singh",role:"Full Stack Engineer",email:"singhn3@nku.edu",photo:"https://media.licdn.com/dms/image/v2/C5603AQHQ8nDKPb1QLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517278386255?e=1738800000&v=beta&t=FzgW4uQTQEBAUjcesz4RJq94SZnoL8dFfMEA6gle1zA",description:"Cognitive Computing Platform Engineer at Fidelity Investments"}].map((e,t)=>(0,n.jsx)(DeveloperCard,{...e},t))}),(0,n.jsx)(s.Zb,{className:"max-w-2xl mx-auto",children:(0,n.jsxs)(s.aY,{className:"p-6",children:[(0,n.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"Contact Us"}),(0,n.jsx)(ContactForm,{})]})})]})})}},6812:function(e,t,r){"use strict";r.d(t,{F$:function(){return l},Q5:function(){return u},qE:function(){return i}});var n=r(7437),a=r(2265),s=r(6694),o=r(345);let i=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.fC,{ref:t,className:(0,o.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",r),...a})});i.displayName=s.fC.displayName;let l=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.Ee,{ref:t,className:(0,o.cn)("aspect-square h-full w-full",r),...a})});l.displayName=s.Ee.displayName;let u=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)(s.NY,{ref:t,className:(0,o.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted",r),...a})});u.displayName=s.NY.displayName},3089:function(e,t,r){"use strict";r.d(t,{z:function(){return u}});var n=r(7437),a=r(2265),s=r(7256),o=r(9213),i=r(345);let l=(0,o.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),u=a.forwardRef((e,t)=>{let{className:r,variant:a,size:o,asChild:u=!1,...c}=e,d=u?s.g7:"button";return(0,n.jsx)(d,{className:(0,i.cn)(l({variant:a,size:o,className:r})),ref:t,...c})});u.displayName="Button"},609:function(e,t,r){"use strict";r.d(t,{Ol:function(){return i},Zb:function(){return o},aY:function(){return c},ll:function(){return l}});var n=r(7437),a=r(2265),s=r(345);let o=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("rounded-xl border bg-card text-card-foreground shadow",r),...a})});o.displayName="Card";let i=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("flex flex-col space-y-1.5 p-6",r),...a})});i.displayName="CardHeader";let l=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("font-semibold leading-none tracking-tight",r),...a})});l.displayName="CardTitle";let u=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("text-sm text-muted-foreground",r),...a})});u.displayName="CardDescription";let c=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("p-6 pt-0",r),...a})});c.displayName="CardContent";let d=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("div",{ref:t,className:(0,s.cn)("flex items-center p-6 pt-0",r),...a})});d.displayName="CardFooter"},6582:function(e,t,r){"use strict";r.d(t,{I:function(){return o}});var n=r(7437),a=r(2265),s=r(345);let o=a.forwardRef((e,t)=>{let{className:r,type:a,...o}=e;return(0,n.jsx)("input",{type:a,className:(0,s.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...o})});o.displayName="Input"},4606:function(e,t,r){"use strict";r.d(t,{g:function(){return o}});var n=r(7437),a=r(2265),s=r(345);let o=a.forwardRef((e,t)=>{let{className:r,...a}=e;return(0,n.jsx)("textarea",{className:(0,s.cn)("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",r),ref:t,...a})});o.displayName="Textarea"},345:function(e,t,r){"use strict";r.d(t,{cn:function(){return cn}});var n=r(7042),a=r(4769);function cn(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.m6)((0,n.W)(t))}},6694:function(e,t,r){"use strict";r.d(t,{Ee:function(){return y},NY:function(){return N},fC:function(){return v}});var n=r(2265),a=r(6989),s=r(6459),o=r(1030),i=r(9790),l=r(7437),u="Avatar",[c,d]=(0,a.b)(u),[f,m]=c(u),p=n.forwardRef((e,t)=>{let{__scopeAvatar:r,...a}=e,[s,o]=n.useState("idle");return(0,l.jsx)(f,{scope:r,imageLoadingStatus:s,onImageLoadingStatusChange:o,children:(0,l.jsx)(i.WV.span,{...a,ref:t})})});p.displayName=u;var h="AvatarImage",x=n.forwardRef((e,t)=>{let{__scopeAvatar:r,src:a,onLoadingStatusChange:u=()=>{},...c}=e,d=m(h,r),f=function(e,t){let[r,a]=n.useState("idle");return(0,o.b)(()=>{if(!e){a("error");return}let r=!0,n=new window.Image,updateStatus=e=>()=>{r&&a(e)};return a("loading"),n.onload=updateStatus("loaded"),n.onerror=updateStatus("error"),n.src=e,t&&(n.referrerPolicy=t),()=>{r=!1}},[e,t]),r}(a,c.referrerPolicy),p=(0,s.W)(e=>{u(e),d.onImageLoadingStatusChange(e)});return(0,o.b)(()=>{"idle"!==f&&p(f)},[f,p]),"loaded"===f?(0,l.jsx)(i.WV.img,{...c,ref:t,src:a}):null});x.displayName=h;var b="AvatarFallback",g=n.forwardRef((e,t)=>{let{__scopeAvatar:r,delayMs:a,...s}=e,o=m(b,r),[u,c]=n.useState(void 0===a);return n.useEffect(()=>{if(void 0!==a){let e=window.setTimeout(()=>c(!0),a);return()=>window.clearTimeout(e)}},[a]),u&&"loaded"!==o.imageLoadingStatus?(0,l.jsx)(i.WV.span,{...s,ref:t}):null});g.displayName=b;var v=p,y=x,N=g},6989:function(e,t,r){"use strict";r.d(t,{b:function(){return createContextScope},k:function(){return createContext2}});var n=r(2265),a=r(7437);function createContext2(e,t){let r=n.createContext(t),Provider=e=>{let{children:t,...s}=e,o=n.useMemo(()=>s,Object.values(s));return(0,a.jsx)(r.Provider,{value:o,children:t})};return Provider.displayName=e+"Provider",[Provider,function(a){let s=n.useContext(r);if(s)return s;if(void 0!==t)return t;throw Error(`\`${a}\` must be used within \`${e}\``)}]}function createContextScope(e,t=[]){let r=[],createScope=()=>{let t=r.map(e=>n.createContext(e));return function(r){let a=r?.[e]||t;return n.useMemo(()=>({[`__scope${e}`]:{...r,[e]:a}}),[r,a])}};return createScope.scopeName=e,[function(t,s){let o=n.createContext(s),i=r.length;r=[...r,s];let Provider=t=>{let{scope:r,children:s,...l}=t,u=r?.[e]?.[i]||o,c=n.useMemo(()=>l,Object.values(l));return(0,a.jsx)(u.Provider,{value:c,children:s})};return Provider.displayName=t+"Provider",[Provider,function(r,a){let l=a?.[e]?.[i]||o,u=n.useContext(l);if(u)return u;if(void 0!==s)return s;throw Error(`\`${r}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let createScope=()=>{let r=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let a=r.reduce((t,{useScope:r,scopeName:n})=>{let a=r(e),s=a[`__scope${n}`];return{...t,...s}},{});return n.useMemo(()=>({[`__scope${t.scopeName}`]:a}),[a])}};return createScope.scopeName=t.scopeName,createScope}(createScope,...t)]}},9790:function(e,t,r){"use strict";r.d(t,{WV:function(){return i},jH:function(){return dispatchDiscreteCustomEvent}});var n=r(2265),a=r(4887),s=r(7256),o=r(7437),i=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let r=n.forwardRef((e,r)=>{let{asChild:n,...a}=e,i=n?s.g7:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,o.jsx)(i,{...a,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function dispatchDiscreteCustomEvent(e,t){e&&a.flushSync(()=>e.dispatchEvent(t))}},6459:function(e,t,r){"use strict";r.d(t,{W:function(){return useCallbackRef}});var n=r(2265);function useCallbackRef(e){let t=n.useRef(e);return n.useEffect(()=>{t.current=e}),n.useMemo(()=>(...e)=>t.current?.(...e),[])}},1030:function(e,t,r){"use strict";r.d(t,{b:function(){return a}});var n=r(2265),a=globalThis?.document?n.useLayoutEffect:()=>{}}},function(e){e.O(0,[7,971,472,744],function(){return e(e.s=4538)}),_N_E=e.O()}]);