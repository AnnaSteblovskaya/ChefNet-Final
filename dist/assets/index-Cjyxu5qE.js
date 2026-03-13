const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutSection-D1ag3TUc.js","assets/icons-DXx_5-1D.js","assets/react-vendor-CDv5WDhH.js","assets/supabase-yKjPlrCh.js","assets/UniqueFeaturesSection-9iBxIABY.js","assets/IconBox-BmgT9iMt.js","assets/OpportunitiesSection-BLVUDSlT.js","assets/PartnershipSection-Ch_yMBoE.js","assets/InvestmentsSection-B2LApBbn.js","assets/AdvantagesSection-Cu0MvMln.js","assets/RoadmapSection-CqBFBFje.js","assets/ChefNetAppSection-Crya-HGb.js","assets/FAQSection-C9MiQKzi.js","assets/CTABanner-GSC9zHEE.js","assets/TeamSection-DmpbvX2I.js","assets/Footer-CgnzFxdG.js","assets/Dashboard-B_nwql6q.js","assets/charts-D2gQpZoh.js","assets/form-libs-C6Cy9Vhp.js","assets/form-libs-BuqMdKp-.css"])))=>i.map(i=>d[i]);
import{r as i,j as e,A as G,m as k,k as Ce,l as Te}from"./react-vendor-CDv5WDhH.js";import{c as Ae}from"./supabase-yKjPlrCh.js";import{X as J,C as X,a as V,L as _,E as q,b as U,G as Ne,M as De,c as ee,d as Pe,R as ze,U as Ie,e as K,f as pe}from"./icons-DXx_5-1D.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function l(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(s){if(s.ep)return;s.ep=!0;const t=l(s);fetch(s.href,t)}})();const je="modulepreload",Ee=function(r){return"/"+r},ie={},j=function(n,l,a){let s=Promise.resolve();if(l&&l.length>0){let o=function(m){return Promise.all(m.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),f=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));s=o(l.map(m=>{if(m=Ee(m),m in ie)return;ie[m]=!0;const p=m.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${y}`))return;const c=document.createElement("link");if(c.rel=p?"stylesheet":je,p||(c.as="script"),c.crossOrigin="",c.href=m,f&&c.setAttribute("nonce",f),document.head.appendChild(c),p)return new Promise((u,x)=>{c.addEventListener("load",u),c.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${m}`)))})}))}function t(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return s.then(o=>{for(const d of o||[])d.status==="rejected"&&t(d.reason);return n().catch(t)})},Be={theme:"light",setTheme:()=>null},Oe=i.createContext(Be);function Re({children:r,defaultTheme:n="light",storageKey:l="vite-ui-theme",...a}){const[s,t]=i.useState(()=>localStorage.getItem(l)||n);i.useEffect(()=>{const d=window.document.documentElement;d.classList.remove("light","dark"),d.classList.add(s),d.setAttribute("data-theme",s)},[s]);const o={theme:s,setTheme:d=>{localStorage.setItem(l,d),t(d)}};return e.jsx(Oe.Provider,{...a,value:o,children:r})}const me=i.createContext(void 0),Z="chefnet-language",Fe=()=>{try{const r=localStorage.getItem(Z);if(r&&["en","ru","de","es","tr"].includes(r))return r;r&&(console.warn(`Invalid language "${r}" found in localStorage, resetting to default`),localStorage.removeItem(Z))}catch(r){console.error("Error reading language from localStorage:",r)}return"ru"},Me=({children:r})=>{const[n,l]=i.useState(Fe),a=s=>{try{localStorage.setItem(Z,s),l(s)}catch(t){console.error("Error saving language to localStorage:",t),l(s)}};return e.jsx(me.Provider,{value:{language:n,setLanguage:a},children:r})},B=()=>{const r=i.useContext(me);if(!r)throw new Error("useLanguage must be used within a LanguageProvider");return r},Le="https://sdwlngwkeipgwelzxfai.supabase.co",_e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkd2xuZ3drZWlwZ3dlbHp4ZmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNjgwNDksImV4cCI6MjA4Nzk0NDA0OX0.4nDN_CwoJCg-G1t2PPuX-6A2OmRhVXviBOI6kVOUwdo";let Q=null;function he(){return Q||(Q=Ae(Le,_e,{auth:{persistSession:!0,autoRefreshToken:!0,detectSessionInUrl:!0,storageKey:"chefnet-auth-storage"}})),Q}async function ne(){const r=he(),{data:{session:n}}=await r.auth.getSession();return n!=null&&n.access_token?{Authorization:`Bearer ${n.access_token}`,"Content-Type":"application/json"}:{"Content-Type":"application/json"}}async function F(r){const n=await ne(),l=await fetch(r,{headers:n});if(!l.ok)throw new Error(`API error: ${l.status}`);return l.json()}async function qe(r,n){const l=await ne(),a=await fetch(r,{method:"POST",headers:l,body:JSON.stringify(n)});if(!a.ok)throw new Error(`API error: ${a.status}`);return a.json()}async function se(r,n){const l=await ne(),a=await fetch(r,{method:"PUT",headers:l,body:JSON.stringify(n)});if(!a.ok)throw new Error(`API error: ${a.status}`);return a.json()}async function oe(){try{const[r,n,l,a,s]=await Promise.allSettled([F("/api/rounds"),F("/api/investments"),F("/api/referrals"),F("/api/kyc"),F("/api/profile")]);if(r.status==="fulfilled"&&r.value.length>0){const t=r.value,o=n.status==="fulfilled"?n.value.userRounds:[],d={},f={seed:"Seed",seriesA:"Private",marketing:"Marketing",ipo:"Public/IPO"},m={seed:"Раунд посева",seriesA:"Серия A",marketing:"Серия B",ipo:"Серия C / IPO"};t.forEach(p=>{const y=f[p.id]||p.id,c=o.find(u=>u.round_id===p.id);d[y]={id:p.id,name:m[p.id]||p.name,price:parseFloat(p.price),minInvestment:parseFloat(p.min_investment),totalShares:p.total_shares,soldShares:p.sold_shares,myShares:c?c.my_shares:0,status:p.status==="active"?"Активный":p.status==="upcoming"?"Вскоре":"Распроданный",amount:p.amount,highlight:p.highlight}}),localStorage.setItem("chefnet_rounds_data",JSON.stringify(d))}if(n.status==="fulfilled"&&n.value.investments.length>0){const t=n.value.investments.map(o=>({round:o.round==="seed"?"Seed":o.round,shares:o.shares,amount:o.amount,date:o.date,status:o.status}));localStorage.setItem("chefnet_investments",JSON.stringify(t))}if(l.status==="fulfilled"&&l.value.length>0){const t=l.value.map(o=>({name:o.name,status:o.status,amount:o.amount,shares:o.shares,commission:o.commission,date:o.date,round:o.round}));localStorage.setItem("chefnet_referrals_data",JSON.stringify(t)),localStorage.setItem("chefnet_referrals_version","6.0")}if(a.status==="fulfilled"&&a.value.status!=="not_started"){const t=a.value;localStorage.setItem("chefnet_kyc_status",t.status),t.full_name&&localStorage.setItem("chefnet_kyc_data",JSON.stringify({fullName:t.full_name,dateOfBirth:t.date_of_birth||"",country:t.country||"",address:t.address||"",email:t.email||"",phone:t.phone||""})),t.verified_date&&localStorage.setItem("chefnet_kyc_verified_date",t.verified_date)}if(s.status==="fulfilled"&&s.value){const t=s.value;localStorage.setItem("chefnet_profile_data",JSON.stringify({fullName:t.full_name||"",email:t.email||"",phone:t.phone||"",country:t.country||"",address:t.address||"",dateOfBirth:t.date_of_birth||"",nationality:t.nationality||"",zipCode:t.zip_code||""}))}}catch(r){console.error("Error loading data from server:",r)}}async function Ue(){try{const r=localStorage.getItem("chefnet_kyc_status"),n=localStorage.getItem("chefnet_kyc_data"),l=localStorage.getItem("chefnet_profile_data"),a=[];if(r&&r!=="not_started"){const s=n?JSON.parse(n):{};a.push(se("/api/kyc",{status:r,full_name:s.fullName||"",date_of_birth:s.dateOfBirth||"",country:s.country||"",address:s.address||"",email:s.email||"",phone:s.phone||""}))}if(l){const s=JSON.parse(l);a.push(se("/api/profile",{full_name:s.fullName||"",email:s.email||"",phone:s.phone||"",country:s.country||"",address:s.address||"",date_of_birth:s.dateOfBirth||"",nationality:s.nationality||"",zip_code:s.zipCode||""}))}await Promise.allSettled(a)}catch(r){console.error("Error saving data to server:",r)}}async function le(){try{await qe("/api/seed-demo-data",{})}catch(r){console.error("Error seeding demo data:",r)}}function Ke(){["chefnet_rounds_data","chefnet_investments","chefnet_referrals_data","chefnet_referrals_version","chefnet_kyc_status","chefnet_kyc_data","chefnet_kyc_verified_date","chefnet_kyc_sumsub_applicant_id","chefnet_kyc_sumsub_inspection_id","chefnet_profile_data","chefnet_user_email"].forEach(n=>localStorage.removeItem(n))}function Ge(){if(typeof window<"u"){const r=window.location.origin;if(!r.includes("localhost")&&!r.includes("127.0.0.1"))return r}return"https://42494885-bbef-45f9-b43e-8e821de7357f-00-rqlrkj293o1v.worf.replit.dev"}const fe=i.createContext(void 0);function H(r){var n,l;return{id:r.id,email:r.email||"",firstName:((n=r.user_metadata)==null?void 0:n.firstName)||"",lastName:((l=r.user_metadata)==null?void 0:l.lastName)||"",createdAt:r.created_at||new Date().toISOString()}}const Ve=({children:r})=>{const[n,l]=i.useState(null),[a,s]=i.useState(!0),[t,o]=i.useState(null),[d,f]=i.useState(!1),m=he(),p=i.useRef(!1),y=i.useRef(!1),c=i.useRef(!1);async function u(b){try{const h=await fetch("/api/email-status",{headers:{Authorization:`Bearer ${b}`,"Content-Type":"application/json"}});if(h.ok)return(await h.json()).verified===!0}catch(h){console.error("Email verification check failed:",h)}return!1}i.useEffect(()=>{const b=setTimeout(()=>{console.warn("Auth init timed out — showing page without session"),s(!1)},6e3);m.auth.getSession().then(async({data:{session:v}})=>{if(clearTimeout(b),v!=null&&v.user&&!y.current){if(!await u(v.access_token)){await m.auth.signOut(),l(null),s(!1);return}const C=H(v.user);l(C),p.current||(p.current=!0,await le(),await oe())}s(!1)}).catch(v=>{clearTimeout(b),console.error("getSession failed:",v),s(!1)});const h={current:!1},{data:{subscription:A}}=m.auth.onAuthStateChange(async(v,w)=>{if(!(y.current||c.current||h.current)){if(v==="PASSWORD_RECOVERY"&&(w!=null&&w.user)){f(!0),s(!1);return}if(w!=null&&w.user){if(!await u(w.access_token)){h.current=!0,await m.auth.signOut(),h.current=!1,l(null),s(!1);return}const O=H(w.user);l(O),p.current||(p.current=!0,await le(),await oe())}else p.current=!1,l(null);s(!1)}});return()=>A.unsubscribe()},[]);const x=async(b,h,A,v,w,C)=>{try{o(null),y.current=!0;const O=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:b,password:h,firstName:A,lastName:v,lang:w||"ru",ref:C||null})});if(!O.ok){const M=(await O.json().catch(()=>({error:"Registration failed"}))).error||"Registration failed";return console.error("Registration error:",M),o(M),y.current=!1,"error"}return l(null),y.current=!1,"confirmation_needed"}catch(O){return console.error("Registration exception:",O),o("An unexpected error occurred"),y.current=!1,"error"}},g=async(b,h)=>{try{return o(null),(await fetch("/api/send-verification",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:b,firstName:"",lang:h||"ru"})})).ok?!0:(o("Failed to resend verification email"),!1)}catch{return o("An unexpected error occurred"),!1}},N=async(b,h,A)=>{var v;try{o(null),c.current=!0;const{data:w,error:C}=await m.auth.signInWithPassword({email:b,password:h});return C?(console.error("Login error:",C.message),o(C.message),c.current=!1,!1):w.user?await u(((v=w.session)==null?void 0:v.access_token)||"")?(c.current=!1,l(H(w.user)),!0):(await m.auth.signOut(),l(null),o("email_not_verified"),c.current=!1,!1):(c.current=!1,!1)}catch(w){return console.error("Login exception:",w),o("An unexpected error occurred"),c.current=!1,!1}},I=async()=>{await Ue(),Ke(),p.current=!1,await m.auth.signOut(),l(null)},P=()=>{f(!1)},T=async b=>{try{o(null);const{error:h}=await m.auth.updateUser({password:b});return h?(console.error("Update password error:",h.message),o(h.message),!1):(f(!1),!0)}catch(h){return console.error("Update password exception:",h),o("An unexpected error occurred"),!1}},E=async(b,h,A="ru")=>{try{o(null);const v=await fetch("/api/reset-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:b,lang:A})});if(!v.ok){const C=(await v.json().catch(()=>({}))).error||"Failed to send reset email";return console.error("Password reset error:",C),o(C),!1}return!0}catch(v){return console.error("Password reset exception:",v),o("An unexpected error occurred"),!1}},z=async()=>{try{o(null);const{error:b}=await m.auth.signInWithOAuth({provider:"google",options:{redirectTo:Ge()}});b&&(console.error("Google login error:",b.message),o(b.message))}catch(b){console.error("Google login exception:",b),o("An unexpected error occurred")}};return e.jsx(fe.Provider,{value:{user:n,isAuthenticated:!!n,loading:a,login:N,register:x,logout:I,loginWithGoogle:z,resetPassword:E,updatePassword:T,resendConfirmationEmail:g,authError:t,isPasswordRecovery:d,clearPasswordRecovery:P},children:r})},R=()=>{const r=i.useContext(fe);if(!r)throw new Error("useAuth must be used within an AuthProvider");return r};function ce({resetToken:r,onClose:n}){const{updatePassword:l,clearPasswordRecovery:a,authError:s}=R(),{language:t}=B(),[o,d]=i.useState(""),[f,m]=i.useState(""),[p,y]=i.useState(!1),[c,u]=i.useState(!1),[x,g]=i.useState(""),[N,I]=i.useState(!1),P={ru:{title:"Новый пароль",subtitle:"Введите новый пароль для вашего аккаунта",password:"Новый пароль",confirm:"Подтвердите пароль",submit:"Сохранить пароль",cancel:"Отмена",successMsg:"Пароль успешно изменён! Теперь вы можете войти.",errorMismatch:"Пароли не совпадают",errorShort:"Пароль должен содержать минимум 8 символов"},en:{title:"New Password",subtitle:"Enter a new password for your account",password:"New password",confirm:"Confirm password",submit:"Save password",cancel:"Cancel",successMsg:"Password changed successfully! You can now log in.",errorMismatch:"Passwords do not match",errorShort:"Password must be at least 8 characters"},de:{title:"Neues Passwort",subtitle:"Geben Sie ein neues Passwort für Ihr Konto ein",password:"Neues Passwort",confirm:"Passwort bestätigen",submit:"Passwort speichern",cancel:"Abbrechen",successMsg:"Passwort erfolgreich geändert! Sie können sich jetzt anmelden.",errorMismatch:"Passwörter stimmen nicht überein",errorShort:"Das Passwort muss mindestens 8 Zeichen lang sein"},es:{title:"Nueva contraseña",subtitle:"Ingresa una nueva contraseña para tu cuenta",password:"Nueva contraseña",confirm:"Confirmar contraseña",submit:"Guardar contraseña",cancel:"Cancelar",successMsg:"¡Contraseña cambiada con éxito! Ahora puedes iniciar sesión.",errorMismatch:"Las contraseñas no coinciden",errorShort:"La contraseña debe tener al menos 8 caracteres"},tr:{title:"Yeni Şifre",subtitle:"Hesabınız için yeni bir şifre girin",password:"Yeni şifre",confirm:"Şifreyi onayla",submit:"Şifreyi kaydet",cancel:"İptal",successMsg:"Şifre başarıyla değiştirildi! Artık giriş yapabilirsiniz.",errorMismatch:"Şifreler eşleşmiyor",errorShort:"Şifre en az 8 karakter olmalıdır"}},T=P[t]||P.ru,E=()=>{r?n==null||n():a()},z=async b=>{if(b.preventDefault(),g(""),o.length<8){g(T.errorShort);return}if(o!==f){g(T.errorMismatch);return}u(!0);let h=!1;if(r)try{const A=await fetch("/api/reset-password-confirm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:r,newPassword:o})}),v=await A.json();if(A.ok)h=!0;else{const w=v.error||"";if(w.toLowerCase().includes("unavailable")||w.toLowerCase().includes("temporarily")){const C={ru:"Сервис временно недоступен. Восстановите проект Supabase и попробуйте снова.",en:"Service temporarily unavailable. Please try again later.",de:"Dienst vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut.",es:"Servicio temporalmente no disponible. Inténtelo más tarde.",tr:"Hizmet geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin."};g(C[t]||C.ru)}else g(w||"Error")}}catch{g(t==="en"?"Network error. Please try again.":"Ошибка сети. Пожалуйста, попробуйте снова.")}else h=await l(o),h||g(s||"Error");u(!1),h&&(I(!0),setTimeout(()=>{r?(window.history.replaceState({},"",window.location.pathname),n==null||n()):a()},3e3))};return e.jsx(G,{children:e.jsx(k.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 flex items-center justify-center p-4",style:{backgroundColor:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)"},children:e.jsxs(k.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},className:"bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative",children:[e.jsx("button",{onClick:E,className:"absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors",children:e.jsx(J,{className:"w-5 h-5"})}),e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-1",children:T.title}),e.jsx("p",{className:"text-gray-500 text-sm",children:T.subtitle})]}),N?e.jsxs(k.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl flex items-center gap-3",children:[e.jsx(X,{className:"w-5 h-5 flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:T.successMsg})]}):e.jsxs("form",{onSubmit:z,className:"space-y-4",children:[x&&e.jsxs(k.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2",children:[e.jsx(V,{className:"w-5 h-5 flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:x})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:T.password}),e.jsxs("div",{className:"relative",children:[e.jsx(_,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:p?"text":"password",value:o,onChange:b=>d(b.target.value),className:"w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm",placeholder:"••••••••",required:!0}),e.jsx("button",{type:"button",onClick:()=>y(!p),className:"absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",children:p?e.jsx(q,{className:"w-5 h-5"}):e.jsx(U,{className:"w-5 h-5"})})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:T.confirm}),e.jsxs("div",{className:"relative",children:[e.jsx(_,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:p?"text":"password",value:f,onChange:b=>m(b.target.value),className:"w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm",placeholder:"••••••••",required:!0})]})]}),e.jsxs("div",{className:"flex gap-3 pt-2",children:[e.jsx("button",{type:"button",onClick:E,className:"flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all",children:T.cancel}),e.jsx(k.button,{type:"submit",disabled:c,whileHover:{scale:c?1:1.02},whileTap:{scale:c?1:.98},className:"flex-1 py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm",children:c?"...":T.submit})]})]})]})})})}const te={en:{features:"Highlights",aboutUs:"Opportunities",forPartners:"For partners",referralProgramme:"Growth stages",stagesOfDevelopment:"Growth stages",whyChefNet:"Why ChefNet?",roadmap:"Roadmap",faq:"FAQ",team:"Team",contacts:"Contacts",logIn:"Log in",signIn:"Sign in",heroTitle1:"Intelligence that turns choice",heroTitle2:"into value.",heroTitle3:"Intelligence,",heroTitle4:"that turns choice into value.",heroSubtitle:"ChefNet is an AI-powered technology",heroDescription:"that learns your rhythm, remembers your taste, and saves you time and money every day.",heroBenefit1:"Restaurants gain new guests.",heroBenefit2:"Guests receive precise, personalized recommendations.",heroBenefit3:"Partners benefit from transparent growth and a dynamic market.",heroCta:"Now is your opportunity to join this movement.",getStarted:"Get Started",opportunitiesTitle:"Opportunities",opportunity1Title:"ChefNet",opportunity1Desc:"Your chance",opportunity2Title:"ChefNet",opportunity2Desc:"Our turn",opportunity3Title:"ChefNet",opportunity3Desc:"Revolution",believeTitle:"Our philosophy",believeSubtitle:"Simplicity in a single touch. Precision — ChefNet style.",believeDesc1:`We're building a service that makes choosing a place as simple as ordering a taxi.
Our goal is to save time for millions of people and give them the best experience.`,believeDesc2:`Advanced technology works for people: fast, precise, and without unnecessary steps.
ChefNet reveals not the most advertised, but the truly best spots — through honest, authentic, and verified reviews.`,believeDesc3:"",chefnetAppTitle1:"Opportunities with ChefNet ",chefnetAppTitle2:"Invest",chefnetAppTitle3:"",chefnetAppOpportunity1Title:"ChefNet",chefnetAppOpportunity1Subtitle:" — your entry into a new trend.",chefnetAppOpportunity1Desc:"ChefNet Invest - is your chance to join the birth of a global trend and a tech giant unlike any that exists today.",chefnetAppOpportunity1DescPart1:"ChefNet ",chefnetAppOpportunity1DescPart2:"Invest",chefnetAppOpportunity1DescPart3:" - is your chance to join the birth of a global trend and a tech giant unlike any that exists today.",chefnetAppOpportunity2Title:"ChefNet",chefnetAppOpportunity2Subtitle:" — now it's our turn.",chefnetAppOpportunity2Desc:"Booking, Uber, Airbnb, Amazon didn't exist once either. Today, the whole world knows them. The next name on this list - ChefNet!!!",chefnetAppOpportunity2DescPart1:"Booking, Uber, Airbnb, Amazon didn't exist once either. Today, the whole world knows them. The next name on this list - ",chefnetAppOpportunity2DescPart2:"ChefNet",chefnetAppOpportunity2DescPart3:"!!!",chefnetAppOpportunity3Title:"ChefNet",chefnetAppOpportunity3Subtitle:" — the new standard in FoodTech.",chefnetAppOpportunity3Desc:"ChefNet is a revolution in the world of food apps—an idea whose time has come.",chefnetAppOpportunity3DescPart1:"",chefnetAppOpportunity3DescPart2:"ChefNet",chefnetAppOpportunity3DescPart3:" is a revolution in the world of food apps—an idea whose time has come.",uniqueFeaturesTitle:"unique features",uniqueFeaturesChefNet:"ChefNet",feature1Title:"Your Personal AI companion",feature1Desc:"Powered by Super-intelligence: it understands your tastes, curates the best options, and guides you seamlessly from choice to payment. Your AI companion knows what you love, books your table in advance, and saves you time every day.",feature2Title:"Intuitive search",feature2Desc:"Search restaurants, dishes, and cuisines — fast and precise. Interactive map with smart filters: cuisine, rating, price. Always up-to-date results in real time.",feature3Title:"Flexibility of use",feature3Desc:"The system works in two modes: visual selection by images or voice control via your AI companion. You choose — the intelligence handles the rest.",feature4Title:"Clarity and details",feature4Desc:"Interactive menu in photo and video format, with ingredients and calorie info. Pre-order your meal and have it ready the moment you arrive — perfect when you're in a hurry.",feature5Title:"Unique customer review system",feature5Desc:"ChefNet redefines reviews: not just ⭐ ratings, but real emotions. Audio and video format make feedback personal, while ratings for dishes, service, and atmosphere make it genuinely reliable.",feature6Title:"Earn by being active",feature6Desc:"Earn not just points — but real money for your activity.",feature7Title:"All-in-one app",feature7Desc:"A unified global platform: from cafes and bars to premium restaurants and private chefs.",feature8Title:"An AI - companion that makes your culinary experience simple and seamless",feature8Desc:"Your companion finds the perfect spot, reserves your table, maps your route, and reminds you when it's time to go. Visited a restaurant with friends? It'll invite them and reach out to each of them personally!",feature9Title:"Restaurant support and development",feature9Desc:"ChefNet helps venues grow — from early ideas to full-scale expansion. AI analyzes performance metrics and delivers actionable optimization strategies. Access to funding from private investors and culinary funds, as well as participation in investment programs backed by the ChefNet community.",advantagesTitle:"Advantages",advantagesSubtitle:"Why invest",advantage1Title:"Innovation",advantage1Desc:"Advanced",advantage2Title:"Growth",advantage2Desc:"Rapid",advantage3Title:"Team",advantage3Desc:"Expert",advantage4Title:"Returns",advantage4Desc:"High",competitiveTitle:"Advantage",traditional:"Traditional",competitors:"Competitors",chefnet:"ChefNet",avgReturn:"Returns",partnershipTitle:"Partnership",partnershipSubtitle:"Rewards",partnershipCard1Title:"Partner",partnershipCard1Desc:"Become partner",partnershipCard2Title:"Program",partnershipCard2Desc1:"Classic model",partnershipCard2Desc2:"More shares",partnershipCard3Title:"Rounds",partnershipCard3Desc:"Value grows",you:"You",startNetwork:"Start network",level:"Level",level1Reward:"5%",level1Desc:"5% reward",level2Reward:"2%",level2Desc:"2% reward",level3Reward:"1%",level3Desc:"1% reward",howItWorks:"How it works",step1Title:"Share",step1Desc:"Unique link",step2Title:"Friends invest",step2Desc:"Earn commission",step3Title:"Grow",step3Desc:"Build network",roadmapTitle:"Roadmap",roadmapSubtitle:"Follow our journey from startup to industry leader",period1Title:"Q1 2026",period1Desc:"MVP",period1KPI:"",period2Title:"Q2 2026",period2Desc:"Launch",period2KPI:"",period3Title:"Q3 2026",period3Desc:"Product",period3KPI:"",period4Title:"Q4 2026",period4Desc:"Preparation",period4KPI:"",period5Title:"Q1 2027",period5Desc:"Ecosystem",period5KPI:"",period6Title:"Q2 2027",period6Desc:"Marketing",period6KPI:"",period7Title:"Q3 2027",period7Desc:"Growth",period7KPI:"",period8Title:"Q4 2027",period8Desc:"Social",period8KPI:"",period9Title:"2028+",period9Desc:"AI & FinTech",period9KPI:"",completed:"Completed",active:"Active",upcoming:"Upcoming",investmentsTitle:"Growth stages",seedRound:"Seed",seriesA:"Series A",seriesB:"Series B",seriesC:"Series C",pricePerShare:"Price",minInvestment:"Minimum",soldOut:"Sold Out",activeRound:"Active",comingSoon:"Coming Soon",shares:"shares",investNow:"Invest Now",seedBackTitle:"Development of the app MVP",seedBackDesc:`• User acquisition
• Negotiations with restaurants
• Hiring country managers
• KPI: 10K users`,privateBackTitle:"MVP Testing",privateBackDesc:`• Testing the MVP in key cities across the US and Europe
• Partnerships with restaurant associations and local chains
• Improving personalization algorithms and AI recommendations
• KPI: 100K users, 500 restaurants`,marketingBackTitle:"Integration with ride-sharing services",marketingBackDesc:`• Integration with ride-sharing services (Uber, Lyft, Bolt)
• Launch of the fully featured ChefNet app
• Expansion of the fintech module (payments, cashback, ChefNet Token)
• Large-scale collaborations with creators and media in the US and EU
• KPI: 1M users, 5K restaurants, $1M profit`,publicBackTitle:"Expansion into Asia, Latin America, and the Middle East",publicBackDesc:`• Scaling to a global SuperApp
• Launch of a DAO community and NFT programs for restaurants
• Preparation for an IPO with a $3–5B valuation
• KPI: 30M users, 50K restaurants, $100M+ profit`,ctaBannerTitle:"The future of restaurants starts here.",ctaBannerHighlight:"Join ",ctaBannerHighlightBrand:"ChefNet",ctaBannerSuffix:".",faqTitle:"Frequently asked questions",faqSubtitle:"Questions",faq1Question:"What is ChefNet, and what problem does the project solve?",faq1Answer:`ChefNet - is a global FoodTech platform that unifies discovery, booking, payments, and engagement with restaurants and private chefs.

It addresses the fragmentation of the food services ecosystem by establishing a single, seamless standard.`,faq2Question:"What is ChefNet's business model?",faq2Answer:`We operate a hybrid Marketplace + SaaS + Fintech model, diversifying revenue across four channels:

• **Transaction Fees:** A percentage from bookings, food pre-orders, and event ticket sales.

• **Subscriptions (B2B SaaS):** Monthly fees paid by restaurants for access to CRM, AI-driven analytics, and marketing tools.

• **Fintech (Payments):** Transaction fees from in-app payments and bill-splitting features.

• **Advertising:** Paid promotion of restaurants within the app's discovery and search results.`,faq3Question:"At what stage of development is the project currently?",faq3Answer:"The project has successfully closed its pre-seed round. We are currently in an active fundraising phase to finance the development and launch of the MVP.",faq4Question:"Where is the company registered, and what is its legal structure?",faq4Answer:"ChefNet LLC is registered in the state of Delaware, USA — the premier U.S. jurisdiction for international investment.",faq5Question:"Funding round structure and participation terms?",faq5Answer:`To execute ChefNet's global strategy, we have planned a step-by-step fundraising process with a total target of $2,000,000. The financing is structured into four key rounds (tranches). This approach allows investors to mitigate risk, while enabling the company to increase its valuation at each subsequent stage.

Current focus: Round 1 (Pre-Seed).
Fundraising Breakdown:

🟢 Round 1: MVP Development (Pre-Seed)
Amount: $150,000
Objective: Build the technical foundation of the product.
Use of funds: Application architecture, UI/UX design, backend development, and release of the first functional version (MVP) for iOS and Android.
Outcome: A production-ready product available to early users.

🟡 Round 2: Market Fit & Validation (Seed 1)
Amount: $350,000
Objective: Validate core hypotheses in the live market and generate initial metrics.
Use of funds: Soft launch, onboarding the first 50 restaurant partners, initial marketing efforts, and core team operating expenses.
Outcome: Proven product-market fit, first transactions, and active users.

🔵 Round 3: Ecosystem & Integrations (Seed 2 / Bridge)
Amount: $500,000
Objective: Evolve the app into a full-scale platform.
Use of funds: Technical integrations with ride-hailing services, restaurant POS systems, and further development of AI-driven personalization algorithms.
Outcome: A fully functional platform ready to support mass adoption.

🟣 Round 4: Launch & Scaling (Growth)
Amount: $1,000,000
Objective: Aggressive market penetration and monetization.
Use of funds: Large-scale marketing campaigns (influencers, performance marketing), launch of the fintech module, and expansion into new regions (U.S. and Europe).
Outcome: User base growth to KPI levels (hundreds of thousands of users) and achievement of stable recurring revenue.

Status Update: We are currently open to proposals for Round 1 ($150,000) to initiate MVP development.`,faq6Question:"What guarantees are provided to investors?",faq6Answer:`We build investor relationships on the principles of full transparency and adherence to internationally recognized legal standards.

Your investment is protected by the following mechanisms:

**1. Legal Protection (US Law)**

The company is structured under U.S. jurisdiction as a Delaware C-Corp — the gold standard for venture capital investments. Investor rights, including equity ownership and rights under convertible instruments (SAFE), are protected by U.S. law. All arrangements are formalized through legally binding agreements.

**2. Intellectual Property Ownership (IP Ownership)**

All technology, source code, brand assets, and the customer base are legally owned by the company, not by individual founders or contributors. This ensures that the core asset you are investing in is fully protected within the corporate structure.

**3. Transparency and Reporting**

Investors receive regular updates on the company's performance, including financial statements (P&L), product metrics, development roadmap status, and use of funds. You will always have clear visibility into how your capital is being deployed.

**4. Founder Incentives (Vesting)**

Founder equity is subject to a standard vesting schedule. This aligns the founders' interests with the company's long-term success and prevents early departures while retaining ownership at an early stage.`,faq7Question:"What level of potential return can be expected?",faq7Answer:`Investing in ChefNet at an early stage (Pre-Seed/Seed) means gaining exposure to exponential growth in the company's valuation. Our objective goes beyond operating profit — we are focused on scaling enterprise value.

The return potential is driven by three key factors:

**1. Company Valuation Growth (X-multiple potential)**

At the current stage, investors acquire equity at the lowest valuation. With each subsequent round — driven by product integrations and global scaling — the company's valuation increases.

Target: a 10–20x increase in company value by the Series A/B round or a strategic acquisition.

**2. Projected Revenue Growth**

According to our financial model, by 2028 — following global market expansion and full fintech integration — we project Annual Recurring Revenue (ARR) exceeding $100M. This underpins strong asset profitability and long-term value.

**3. Exit Strategy**

Investor returns are primarily realized at exit. We consider two liquidity scenarios for early investors within a 3–5 year horizon:

• **Mergers & Acquisitions (M&A):** Sale of the company to a major industry player (e.g., Uber, DoorDash, Booking, or fintech-banking ecosystems).

• **Secondary Market:** The opportunity to sell equity to new investors in later funding rounds at a significant premium.`,faq8Question:"When is the IPO planned?",faq8Answer:`We view an IPO as one of the possible long-term development scenarios, with a projected horizon of approximately 5–7 years.

However, our primary objective is to maximize the company's valuation and ensure liquidity for investors. Accordingly, we are developing the business with two exit strategies in mind:

**Mergers & Acquisitions (Strategic Acquisition):**

The sale of the company to a global strategic player (for example, ecosystems such as Uber, Booking, DoorDash, or major fintech groups) within a 3–5 year horizon. This is the most likely scenario for a rapid exit, offering high returns with an attractive valuation multiple.

**IPO (Initial Public Offering):**

A public listing upon reaching a valuation exceeding $1 billion and achieving stable international revenue, enabling the creation of an independent, global-scale company.`,faq9Question:"What technologies does ChefNet use?",faq9Answer:`ChefNet is built on a modern cloud-native microservices architecture, ensuring flexibility, secure financial transactions, and rapid deployment of AI-driven features.

Our technology stack:

1. Mobile & Frontend (Cross-platform)

We use Flutter or React Native.

Why:

This enables a single codebase for both iOS and Android, accelerating development by up to 40% and reducing maintenance costs while preserving high performance and a true native user experience.

2. Backend & API (Server-side)

Primary languages: Python (FastAPI / Django) or Node.js.

Why:

Python is ideal for AI integration and data processing. A microservices architecture allows us to seamlessly add new verticals—such as fintech modules or events—without re-engineering the entire platform.

3. Artificial Intelligence (AI & Data)

LLM Integration:

Integration with leading large language models (OpenAI GPT-4 / Anthropic) to power the AI concierge.

Recommendation Engine:

Proprietary machine-learning algorithms that personalize restaurant discovery based on user behavior and order history.

4. Fintech & Security

Payments:

Integration via Stripe Connect or Adyen, the industry standard for marketplaces.

Security:

Full compliance with PCI DSS for payment data protection and end-to-end SSL/TLS encryption for all transmitted data.

5. Infrastructure

Cloud:

Hosting on AWS (Amazon Web Services) or Google Cloud.

Scalability:

Use of Docker and Kubernetes to enable automatic scaling during traffic spikes.`,faq10Question:"What sets ChefNet apart from competitors like Yelp, OpenTable, and Grubhub?",faq10Answer:`Existing players each solve only a single, narrow problem: Yelp is essentially a directory, OpenTable is a reservation utility, and Grubhub is a delivery service. ChefNet unifies the entire guest journey — from the initial "where should we go?" moment to paying the bill — eliminating friction and gaps in the user experience.

Our 5 key advantages:

1. AI Concierge instead of filter-based search (vs. Yelp / TripAdvisor)

Them: Users spend hours scrolling through reviews and tweaking filters to find the right place.

Us: Hyper-personalization. The AI assistant understands the user's tastes and delivers the perfect match in seconds — like asking a foodie friend for advice — factoring in mood, budget, and visit history.

2. Seamless fintech: payment and bill splitting (vs. OpenTable)

Them: The app is useful only up to the reservation. At the end of the meal, guests still wait for the server, the terminal, and struggle to split the bill.

Us: Pay-at-Table. A full in-app flow: reserve → order → pay → split the bill with friends in one tap. No waiting for the check means higher table turnover for restaurants.

3. Social mechanics (vs. Grubhub / Uber Eats)

Them: A solitary consumption experience focused on food delivery.

Us: Social Dining. Tools for shared planning: inviting friends, voting on a restaurant, and purchasing tickets to culinary events. We restore the social dimension of food.

4. A fair monetization model for restaurants

Them: Predatory commissions (up to 30% on delivery) or fees for every referred guest, even returning regulars.

Us: SaaS + Fintech. We provide restaurants with CRM and analytics tools via subscription, while generating core margin from financial transactions — not by squeezing businesses with commissions.

5. A social culinary network and "live" reviews (vs. TripAdvisor)

Them: Boring text-heavy reviews, often written by bots or anonymous users. Food photos are frequently outdated or over-edited, misrepresenting reality.

Us: Video content and trust. We embed short-form video reviews (Stories/Reels) directly into restaurant profiles. Guests share the real atmosphere and authentic dishes — no filters. Users can follow friends or food bloggers to see their recommendation feeds, turning restaurant discovery from a chore into entertainment.`,contactTitle:"Questions?",contactSubtitle:"Here to help",contactButton:"Contact",footerMainTitle:"The future of restaurants starts here. Join ChefNet.",footerTagline:"Your guide to the world of restaurant innovation",footerContacts:"Contacts",footerEmail:"support@chefnet.ai",footerPhone:"+1 (917) 332-8053",footerAddress:`ChefNet LLC
The Green STE B
Dover, DE 19901`,footerNewsletter:"News",footerNewsletterDesc:"Stay up to date with the latest news and offers.",footerNewsletterPlaceholder:"Email",footerNewsletterButton:"Subscribe",footerPrivacyPolicy:"Privacy Policy",footerCopyright:"© 2026 ChefNet LLC All rights reserved.",partnersOpportunitiesTitle:"Opportunities",opportunityCard1Title:"Dashboard",opportunityCard1Desc:"Track shares",opportunityCard2Title:"AI Companion",opportunityCard2Desc:"Publishes news",opportunityCard3Title:"Referral",opportunityCard3Desc:"Increase stake",opportunityCard4Title:"Extended",opportunityCard4Desc:"Additional opportunities",opportunityCard5Title:"Fundraising",opportunityCard5Desc:"Early rounds",opportunityCard6Title:"Legal",opportunityCard6Desc:"Delaware, USA",partnersTitle:"Opportunities for partners",partner1Title:"Become a partner of the company",partner1Desc:"Join us at the founding stage to have your ChefNet shares convert into company stock upon IPO.",partner2Title:"Partner program",partner2Desc:`A classic model that lets you increase your stake by inviting new partners during the fundraising phase.
The more you contribute — the larger your share. Transparent and straightforward.`,partner3Title:"Funding rounds",partner3Desc:"With every stage of ChefNet's growth, the value of your shares increases.",partner4Title:"Partner dashboard",partner4Desc:"Tracking of purchased and earned shares under the Referral Program.",partner5Title:"AI Companion",partner5Desc:"publishes company news and global trends in the restaurant industry, answers your questions and executes your requests.",partner6Title:"Extended referral program",partner6Desc:`After the launch of the Application, you will have additional opportunities to
monetize your existing network, as well as be rewarded for referring new users and
restaurants, and your efforts in developing the ecosystem.`,partner7Title:"Fundraising",partner7Desc:"Participating in early funding rounds offers more opportunities to acquire equity at the most favorable prices and to receive more shares after the company goes public.",partner8Title:"Robust legal framework",partner8Desc:"Company registration in USA, Delaware, ensures serious intent and transparent legal and financial reporting in compliance with U.S. standards.",whyChefNetTitle:"Why ChefNet?",whyCard1Title:"ChefNet is a next-generation ecosystem",whyCard1Desc:"We connect users and businesses through AI, making gastronomy smart and convenient.",whyCard2Title:"Culinary social network",whyCard2Desc:`Content from users and chefs: photos, videos, reviews, recipes.
Live streams and masterclasses from the top chefs.`,whyCard3Title:"ChefNet platform",whyCard3Desc:"A platform where passion for cooking meets technology.",whyCard4Title:"Technology that works for restaurants",whyCard4Line1:"Smart interfaces increase average check.",whyCard4Line2:"AI reduces costs and improves forecasting.",whyCard4Line3:"ChefNet helps restaurants earn more — effortlessly.",whyCard5Title:"Helping restaurants is part of ChefNet's mission",whyCard5Line1:"We provide access to resources for financing for renovation, modernization, or new openings, plus marketing support to ensure the right people find your place.",whyCard5Line2:"ChefNet is an service that not only supports but helps your business grow and thrive.",whyCard6Title:"Personalization through your AI companion",whyCard6Line1:`Recommendations based on your tastes, mood, and context.
Instant booking and a ready route.`,whyCard6Line2:"Dynamic menus, voice scenarios, and adaptive suggestions — everything to make your choice truly easy."},ru:{features:"Фишки",aboutUs:"Возможности",forPartners:"Для партнёров",referralProgramme:"Этапы развития",stagesOfDevelopment:"Этапы развития",whyChefNet:"Почему ChefNet?",roadmap:"Дорожная карта",faq:"FAQ",team:"Команда",contacts:"Контакты",logIn:"Войти",signIn:"Регистрация",heroTitle1:"Интеллект, превращающий выбор",heroTitle2:"в ценность.",heroTitle3:"Интеллект,",heroTitle4:"превращающий выбор в ценность.",heroSubtitle:"ChefNet - это технология основанная на AI,",heroDescription:"которая изучает ваш ритм, запоминает ваш вкус и сохраняет вам время и деньги каждый день.",heroBenefit1:"Здесь рестораны получают новых гостей.",heroBenefit2:"Гости — точные рекомендации.",heroBenefit3:"Партнеры — прозрачный рост и динамичный рынок.",heroCta:"Пришло ваше время стать частью этого движения.",getStarted:"Get Started",opportunitiesTitle:"Opportunities",opportunity1Title:"ChefNet",opportunity1Desc:"Your chance",opportunity2Title:"ChefNet",opportunity2Desc:"Our turn",opportunity3Title:"ChefNet",opportunity3Desc:"Revolution",believeTitle:"Наша философия",believeSubtitle:"Простота в одном касании. Точность — в стиле ChefNet.",believeDesc1:`Мы создаём сервис, который делает выбор места таким же простым, как заказ такси.
Наша цель — экономить время миллионов людей и давать им лучший опыт.`,believeDesc2:`Передовые технологии работают на человека: быстро, точно и без лишних шагов.
ChefNet показывает не самые разрекламированные, а действительно лучшие места — через честные, аутентичные и проверенные отзывы.`,believeDesc3:"",chefnetAppTitle1:"Возможности с ChefNet ",chefnetAppTitle2:"Invest",chefnetAppTitle3:"",chefnetAppOpportunity1Title:"ChefNet",chefnetAppOpportunity1Subtitle:" — ваш вход в новый тренд.",chefnetAppOpportunity1Desc:"ChefNet Invest - это ваш шанс присоединиться к рождению глобального тренда и технологического гиганта, которого еще не существует.",chefnetAppOpportunity1DescPart1:"ChefNet ",chefnetAppOpportunity1DescPart2:"Invest",chefnetAppOpportunity1DescPart3:" - это ваш шанс присоединиться к рождению глобального тренда и технологического гиганта, которого еще не существует.",chefnetAppOpportunity2Title:"ChefNet",chefnetAppOpportunity2Subtitle:" — теперь наша очередь.",chefnetAppOpportunity2Desc:"Booking, Uber, Airbnb, Amazon когда-то тоже не существовали. Сегодня их знает весь мир. Следующее имя в этом списке - ChefNet!!!",chefnetAppOpportunity2DescPart1:"Booking, Uber, Airbnb, Amazon когда-то тоже не существовали. Сегодня их знает весь мир. Следующее имя в этом списке - ",chefnetAppOpportunity2DescPart2:"ChefNet",chefnetAppOpportunity2DescPart3:"!!!",chefnetAppOpportunity3Title:"ChefNet",chefnetAppOpportunity3Subtitle:" — новый стандарт в FoodTech.",chefnetAppOpportunity3Desc:"ChefNet - это революция в мире Food-App. Идея, время которой пришло.",chefnetAppOpportunity3DescPart1:"",chefnetAppOpportunity3DescPart2:"ChefNet",chefnetAppOpportunity3DescPart3:" - это революция в мире Food-App. Идея, время которой пришло.",uniqueFeaturesTitle:"Уникальные фишки",uniqueFeaturesChefNet:"ChefNet",feature1Title:"Личный AI компаньон",feature1Desc:"Основано на Супер-интеллекте: он понимает ваши вкусы, подбирает лучшие варианты и ведет вас от выбора до оплаты. Ваш AI-компаньон знает, что вы любите, заранее бронирует столик и экономит вам время каждый день.",feature2Title:"Интуитивный поиск",feature2Desc:"Поиск по ресторанам, блюдам и стилям — быстро и точно. Интерактивная карта с умными фильтрами: кухня, рейтинг, цена. Всегда только актуальные результаты — в реальном времени.",feature3Title:"Гибкость использования",feature3Desc:"Система работает в двух режимах: визуальный выбор по картинкам или голосовое управление через вашего AI компаньона. Вы выбираете — интеллект делает остальное.",feature4Title:"Наглядность и детальность",feature4Desc:"Интерактивное меню в формате фото и видео, с составом и калорийностью блюд. Возможность предзаказа и подачи к вашему приходу — идеально, когда вы спешите.",feature5Title:"Уникальная система клиентских отзывов",feature5Desc:"ChefNet переосмысливает представление об отзывах: вместо ⭐ — живые эмоции. Аудио- и видео-формат делают обратную связь личной, а рейтинги блюд, сервиса и атмосферы — по-настоящему достоверными.",feature6Title:"Зарабатывайте за активность",feature6Desc:"Зарабатывайте не только баллы — но и реальные деньги за свою активность.",feature7Title:"Всё в одном приложении",feature7Desc:"Единая глобальная платформа: от кофеен и баров до премиум-ресторанов и частных шефов.",feature8Title:"AI-компаньон, который делает гастрономический опыт простым и удобным",feature8Desc:"Ваш компаньон найдет идеальное место, забронирует столик, проложит маршрут и напомнит, когда пора выходить. Идёте с друзьями? Он пригласит их и свяжется с каждым лично!",feature9Title:"Поддержка и развитие ресторанов",feature9Desc:"ChefNet помогает заведениям расти — от идей до масштабирования. AI анализирует метрики и предлагает пути оптимизации. Доступ к финансированию от частных инвесторов и кулинарных фондов, а также участие в программах инвестиций от сообщества ChefNet.",advantagesTitle:"Advantages",advantagesSubtitle:"Why invest",advantage1Title:"Innovation",advantage1Desc:"Advanced",advantage2Title:"Growth",advantage2Desc:"Rapid",advantage3Title:"Team",advantage3Desc:"Expert",advantage4Title:"Returns",advantage4Desc:"High",competitiveTitle:"Advantage",traditional:"Traditional",competitors:"Competitors",chefnet:"ChefNet",avgReturn:"Returns",partnershipTitle:"Partnership",partnershipSubtitle:"Rewards",partnershipCard1Title:"Partner",partnershipCard1Desc:"Become partner",partnershipCard2Title:"Program",partnershipCard2Desc1:"Classic model",partnershipCard2Desc2:"More shares",partnershipCard3Title:"Rounds",partnershipCard3Desc:"Value grows",you:"You",startNetwork:"Start network",level:"Level",level1Reward:"5%",level1Desc:"5% reward",level2Reward:"2%",level2Desc:"2% reward",level3Reward:"1%",level3Desc:"1% reward",howItWorks:"How it works",step1Title:"Share",step1Desc:"Unique link",step2Title:"Friends invest",step2Desc:"Earn commission",step3Title:"Grow",step3Desc:"Build network",roadmapTitle:"Roadmap",roadmapSubtitle:"Следите за нашим путем от стартапа до лидера индустрии",period1Title:"Q1 2026",period1Desc:"MVP",period1KPI:"",period2Title:"Q2 2026",period2Desc:"Launch",period2KPI:"",period3Title:"Q3 2026",period3Desc:"Product",period3KPI:"",period4Title:"Q4 2026",period4Desc:"Preparation",period4KPI:"",period5Title:"Q1 2027",period5Desc:"Ecosystem",period5KPI:"",period6Title:"Q2 2027",period6Desc:"Marketing",period6KPI:"",period7Title:"Q3 2027",period7Desc:"Growth",period7KPI:"",period8Title:"Q4 2027",period8Desc:"Social",period8KPI:"",period9Title:"2028+",period9Desc:"AI & FinTech",period9KPI:"",completed:"Завершено",active:"Активно",upcoming:"Предстоит",investmentsTitle:"Этапы развития",seedRound:"Seed",seriesA:"Series A",seriesB:"Series B",seriesC:"Series C",pricePerShare:"Price",minInvestment:"Minimum",soldOut:"Sold Out",activeRound:"Active",comingSoon:"Coming Soon",shares:"shares",investNow:"Invest Now",seedBackTitle:"Разработка MVP приложения",seedBackDesc:`• Набор пользователей
• Переговоры с ресторанами
• Набор менеджеров по странам
• KPI: 10K пользователей`,privateBackTitle:"Тестирование MVP",privateBackDesc:`• Тестирование MVP в ключевых городах США и Европы
• Партнерство с ресторанными ассоциациями и локальными сетями
• Улучшение алгоритмов персонализации и AI рекомендаций
• KPI: 100K пользователей, 500 ресторанов`,marketingBackTitle:"Интеграция с сервисами такси",marketingBackDesc:`• Интеграция с сервисами такси (Uber, Lyft, Bolt)
• Запуск полнофункционального приложения ChefNet
• Развитие финтех-модуля (оплата, кэшбэк, ChefNet Token)
• Массовые коллаборации с блогерами и медиа в США и ЕС
• KPI: 1M пользователей, 5K ресторанов, $1M прибыли`,publicBackTitle:"Выход на рынки Азии, Латинской Америки и Ближнего Востока",publicBackDesc:`• Масштабирование до статуса глобального SuperApp
• Запуск DAO-комьюнити и NFT-программ для ресторанов
• Подготовка к IPO с капитализацией $3–5B
• KPI: 30M пользователей, 50K ресторанов, $100M+ прибыли`,ctaBannerTitle:"Будущее ресторанов начинается здесь.",ctaBannerHighlight:"Присоединяйся к ",ctaBannerHighlightBrand:"ChefNet",ctaBannerSuffix:".",faqTitle:"Часто задаваемые вопросы",faqSubtitle:"Questions",faq1Question:"Что такое ChefNet и какую проблему решает проект?",faq1Answer:`ChefNet — это глобальная FoodTech-платформа, объединяющая поиск, бронирование, оплату и взаимодействие с ресторанами и частными шефами.

Она решает проблему фрагментации гастросервиса, создавая единый стандарт.`,faq2Question:"Какова бизнес-модель ChefNet?",faq2Answer:`Мы используем гибридную модель Marketplace + SaaS + Fintech, диверсифицируя доходы через 4 канала:

• **Комиссия (Transactional):** % с бронирований, предзаказов еды и продажи билетов на мероприятия.

• **Подписка (B2B SaaS):** Ежемесячная плата ресторанов за доступ к CRM, AI-аналитике и маркетинговым инструментам.

• **Финтех (Payments):** Комиссия за транзакции при оплате и разделении счета внутри приложения.

• **Реклама:** Платное продвижение ресторанов в выдаче приложения.`,faq3Question:"На какой стадии развития сейчас находится проект?",faq3Answer:"Проект успешно закрыл Pre-seed раунд. В данный момент мы находимся в стадии активного фандрайзинга (привлечения инвестиций), чтобы профинансировать разработку и запуск MVP",faq4Question:"Где зарегистрирована компания и какова её юридическая форма?",faq4Answer:"ChefNet LLC зарегистрирована в штате Делавэр, США — лучшая  юрисдикция США для международных инвестиций.",faq5Question:"Структура раундов финансирования и условия участия?",faq5Answer:`Для реализации глобальной стратегии ChefNet мы запланировали поэтапное привлечение капитала (Step-by-step fundraising) с общей целью $2,000,000. Финансирование разбито на 4 ключевых раунда (транша). Такой подход позволяет инвесторам снижать риски, а компании — повышать оценку (valuation) при переходе к каждому следующему этапу.

Текущий фокус — Раунд 1 (Pre-Seed).

Детализация раундов:
🟢 Раунд 1: Разработка MVP (Pre-Seed)

Сумма: $150,000

Цель: Техническая реализация фундамента продукта.

На что пойдут средства: Архитектура приложения, дизайн интерфейсов, backend-разработка и выпуск первой рабочей версии (MVP) для iOS/Android.

Результат: Готовый продукт, готовый к установке первыми пользователями.

🟡 Раунд 2: Market Fit и Тестирование (Seed 1)

Сумма: $350,000

Цель: Проверка гипотез на реальном рынке и первые метрики.

На что пойдут средства: Soft-launch (мягкий запуск), привлечение первых 50 ресторанов, первичный маркетинг, операционные расходы команды.

Результат: Подтвержденный Product-Market Fit, первые транзакции и активные пользователи.

🔵 Раунд 3: Экосистема и Интеграции (Seed 2 / Bridge)

Сумма: $500,000

Цель: Превращение приложения в полноценную платформу.

На что пойдут средства: Техническая интеграция с сервисами такси, POS-системами ресторанов, доработка AI-алгоритмов персонализации.

Результат: Полнофункциональный продукт, готовый к массовой нагрузке.

🟣 Раунд 4: Запуск и Масштабирование (Growth)

Сумма: $1,000,000

Цель: Агрессивный захват доли рынка и монетизация.

На что пойдут средства: Масштабные маркетинговые кампании (блогеры, performance), запуск финтех-модуля, выход в новые регионы (США/Европа).

Результат: Рост базы до KPI (сотни тысяч пользователей), выход на стабильную выручку.

Status Update: В данный момент мы открыты для предложений по Раунду 1 ($150k) для старта разработки MVP.`,faq6Question:"Какие гарантии есть у инвесторов?",faq6Answer:`Мы строим отношения с инвесторами на принципах полной прозрачности и использования международных юридических стандартов.

Ваши вложения защищены следующими механизмами:

**1. Юридическая защита (US Law)**

Компания структурирована в юрисдикции США (Delaware C-Corp) — это золотой стандарт для венчурных инвестиций. Права инвесторов, включая право собственности на доли (Equity) или права по конвертируемым займам (SAFE), защищены законодательством США. Все договоренности фиксируются юридически обязывающими документами.

**2. Интеллектуальная собственность (IP Ownership)**

Все технологии, код, бренд и клиентская база юридически принадлежат компании, а не отдельным физическим лицам. Это гарантирует, что главный актив, в который вы инвестируете, находится под защитой корпоративной структуры.

**3. Прозрачность и отчетность (Reporting)**

Инвесторы получают регулярные отчеты (Investor Updates) о состоянии бизнеса: финансовые показатели (P&L), продуктовые метрики, статус разработки (Roadmap) и использование средств. Вы всегда будете знать, как работают ваши деньги.

**4. Мотивация основателей (Vesting)**

Акции основателей подчиняются стандартному графику вестинга (Vesting Schedule). Это означает, что фаундеры заинтересованы в долгосрочном развитии проекта и не могут покинуть компанию, сохранив свои доли, на раннем этапе.`,faq7Question:"Какую потенциальную прибыль можно ожидать?",faq7Answer:`Инвестируя в ChefNet на ранней стадии (Pre-Seed/Seed), вы получаете доступ к экспоненциальному росту капитализации компании. Наша цель выходит за рамки операционной прибыли: мы фокусируемся на масштабировании стоимости бизнеса.

Потенциал дохода формируется из трех ключевых факторов:

**1. Рост оценки компании (потенциал роста в X раз)**

На текущем этапе вы приобретаете долю по минимальной оценке. С каждым следующим раундом — за счет интеграций продукта и глобального масштабирования — оценка компании растет.

Цель: Увеличение стоимости компании в 10–20 раз к моменту раунда Series A/B или стратегической сделки.

**2. Прогнозируемый рост доходов**

Согласно нашей финансовой модели, к 2028 году — после глобальной экспансии и полной интеграции финтеха — мы прогнозируем Annual Recurring Revenue (ARR) свыше $100M. Это обеспечивает высокую рентабельность активов и долгосрочную стоимость.

**3. Стратегия выхода**

Основная прибыль инвестора реализуется при выходе. Мы рассматриваем два сценария ликвидности для ранних инвесторов в горизонте 3–5 лет:

• **Слияния и поглощения (M&A):** Продажа компании крупному игроку индустрии (напр., Uber, DoorDash, Booking или финтех-банковские экосистемы).

• **Вторичный рынок:** Возможность продать свою долю новым инвесторам на последующих раундах финансирования со значительной премией.`,faq8Question:"Когда планируется выход на IPO?",faq8Answer:`IPO рассматривается нами как один из возможных сценариев долгосрочного развития, с прогнозируемым горизонтом примерно 5–7 лет.

Однако наша первичная цель — максимизация стоимости компании и обеспечение ликвидности для инвесторов. Поэтому мы развиваем бизнес с учетом двух стратегий выхода:

**Слияния и Поглощения (Стратегическая Сделка):**

Продажа компании глобальному стратегическому игроку (например, экосистемам вроде Uber, Booking, DoorDash или крупным финтех-группам) на горизонте 3–5 лет. Это наиболее вероятный сценарий быстрого выхода, обеспечивающий высокую доходность инвестиций с привлекательным мультипликатором оценки.

**IPO (Публичное Размещение):**

Выход на биржу при достижении оценки свыше $1 млрд и стабильных международных доходов, что позволит создать независимую компанию глобального масштаба.`,faq9Question:"Какие технологии используются в ChefNet?",faq9Answer:`ChefNet строится на базе современной микросервисной архитектуры (Cloud-Native), что обеспечивает гибкость, безопасность финансовых транзакций и возможность быстрого внедрения AI-функций.

Наш технологический стек:

1. Mobile & Frontend (Кроссплатформенность)

Мы используем Flutter или React Native.

Зачем:

Это позволяет иметь единую кодовую базу для iOS и Android. Это ускоряет разработку на 40% и снижает затраты на поддержку, сохраняя высокую производительность и нативный пользовательский опыт.

2. Backend & API (Серверная часть)

Основной язык: Python (FastAPI / Django) или Node.js.

Зачем:

Python идеален для интеграции AI-модулей и обработки данных. Микросервисная архитектура позволяет легко подключать новые вертикали (например, финтех-модуль или ивенты), не переписывая все приложение.

3. Artificial Intelligence (AI & Data)

LLM Integration:

Интеграция с передовыми моделями (OpenAI GPT-4 / Anthropic) для работы AI-консьержа.

Recommendation Engine:

Собственные алгоритмы машинного обучения для персонализации выдачи ресторанов на основе истории заказов.

4. Fintech & Security (Безопасность)

Платежи:

Интеграция через Stripe Connect или Adyen (стандарт для маркетплейсов).

Безопасность:

Соответствие стандарту PCI DSS (защита платежных данных) и использование шифрования SSL/TLS для всех передаваемых данных.

5. Infrastructure (Инфраструктура)

Cloud:

Хостинг на AWS (Amazon Web Services) или Google Cloud.

Scalability:

Использование Docker и Kubernetes для автоматического масштабирования при резком росте трафика.`,faq10Question:"Чем ChefNet отличается от конкурентов вроде Yelp, OpenTable, Grubhub?",faq10Answer:`Существующие игроки решают только одну узкую задачу: Yelp — это просто справочник, OpenTable — утилита для брони, Grubhub — курьерская служба. ChefNet объединяет весь путь гостя (Customer Journey) — от идеи «куда пойти» до оплаты счета, устраняя разрывы в пользовательском опыте.

Наши 5 ключевых преимуществ:

1. AI-Консьерж вместо поиска по фильтрам (vs Yelp/TripAdvisor)

У них: Пользователь тратит часы, листая списки отзывов и настраивая фильтры, чтобы найти подходящее место.

У нас: Hyper-personalization. AI-ассистент знает вкусы пользователя и предлагает идеальный вариант за секунды (как если бы вы спросили друга-гурмана), учитывая настроение, бюджет и историю посещений.

2. Бесшовный финтех: Оплата и разделение счета (vs OpenTable)

У них: Приложение полезно только до момента бронирования. В конце ужина гость все равно ждет официанта, терминал и мучается с разделением чека.

У нас: Pay-at-Table. Полный цикл внутри приложения: забронировал — заказал — оплатил — разделил счет с друзьями в один клик. Нет ожидания счета = выше оборачиваемость столов для ресторана.

3. Социальная механика (vs Grubhub/UberEats)

У них: Одиночный опыт потребления (доставка еды).

У нас: Social Dining. Инструменты для совместного планирования: приглашение друзей, голосование за ресторан и покупка билетов на гастро-ивенты. Мы возвращаем еде социальный статус.

4. Честная модель монетизации для ресторанов

У них: Хищнические комиссии (до 30% за доставку) или плата за каждого приведенного гостя, даже если он постоянный.

У нас: SaaS + Fintech. Мы даем ресторанам инструменты CRM и аналитики по подписке, зарабатывая основную маржу на финансовых транзакциях, а не «душим» бизнес комиссиями.

5. Социальная кулинарная сеть и «Живые» отзывы (vs TripAdvisor)

У них: Скучные текстовые «простыни», часто написанные ботами или анонимами. Фотографии еды часто старые или слишком «отфотошопленные», не отражающие реальность.

У нас: Видео-контент и Доверие. Мы внедрили формат видео-отзывов (Stories/Reels) прямо в карточки ресторанов. Гости делятся реальной атмосферой и видом блюд без фильтров. Вы можете подписаться на друзей или фуд-блогеров, чтобы видеть их ленту рекомендаций, превращая выбор ресторана из рутины в развлечение.`,contactTitle:"Questions?",contactSubtitle:"Here to help",contactButton:"Contact",footerTagline:"Ваш проводник в мир ресторанных инноваций",footerContacts:"Контакты",footerEmail:"support@chefnet.ai",footerPhone:"+1 (917) 332-8053",footerAddress:`ChefNet LLC
The Green STE B
Dover, DE 19901`,footerNewsletter:"Новости",footerNewsletterDesc:"Будьте в курсе последних новостей и предложений",footerNewsletterPlaceholder:"Email",footerNewsletterButton:"Подписаться",footerPrivacyPolicy:"Политика конфиденциальности",footerCopyright:"© 2026 ChefNet LLC Все права защищены",partnersOpportunitiesTitle:"Opportunities",opportunityCard1Title:"Dashboard",opportunityCard1Desc:"Track shares",opportunityCard2Title:"AI Companion",opportunityCard2Desc:"Publishes news",opportunityCard3Title:"Referral",opportunityCard3Desc:"Increase stake",opportunityCard4Title:"Extended",opportunityCard4Desc:"Additional opportunities",opportunityCard5Title:"Fundraising",opportunityCard5Desc:"Early rounds",opportunityCard6Title:"Legal",opportunityCard6Desc:"Delaware, USA",partnersTitle:"Возможности для партнеров",partner1Title:"Станьте совладельцем компании",partner1Desc:"Присоединяйтесь на этапе становления — доли ChefNet конвертируются в акции компании при выходе на IPO.",partner2Title:"Партнёрская программа",partner2Desc:`Классическая модель, которая позволяет увеличить долю, приглашая новых партнеров на этапе сбора средств.
Больше участия — больше долей. Всё прозрачно и просто.`,partner3Title:"Раунды финансирования",partner3Desc:"С каждым этапом развития ChefNet ценность долей увеличивается.",partner4Title:"Персональный кабинет партнера",partner4Desc:"Учёт купленных и начисленных в рамках партнёрской программы долей.",partner5Title:"AI - Компаньон",partner5Desc:"публикует новости компании и мировых трендов ресторанного бизнеса, а также отвечает на ваши вопросы и выполняет заявки.",partner6Title:"Расширенная реферальная программа",partner6Desc:`После запуска приложения у вас появятся дополнительные возможности для монетизации вашей существующей сети, а также вознаграждения за привлечение новых пользователей и ресторанов,
и за ваш вклад в развитие экосистемы.`,partner7Title:"Фандрайзинг",partner7Desc:"Участие в ранних раундах финансирования даёт больше возможностей приобрести долю по наиболее выгодной цене и получить акции выше после выхода компании на IPO.",partner8Title:"Строгая законодательная база",partner8Desc:"Регистрация компании в США, штат Делавэр, подтверждает серьёзность намерений и обеспечивает прозрачную, юридическую и финансовую отчётность в соответствии с американскими стандартами.",whyChefNetTitle:"Почему ChefNet?",whyCard1Title:"ChefNet — экосистема нового поколения",whyCard1Desc:"Мы соединяем пользователей и бизнес на базе AI, делая гастрономию умной и удобной.",whyCard2Title:"Кулинарная социальная сеть",whyCard2Desc:`Контент от пользователей и шефов: фото, видео, обзоры, рецепты.
Прямые эфиры и мастер-классы от лучших шефов.`,whyCard3Title:"Платформа ChefNet",whyCard3Desc:"Платформа, где страсть к кулинарии соединяется с технологиями.",whyCard4Title:"Технологии, которые работают на рестораны",whyCard4Line1:"Умные интерфейсы увеличивают средний чек.",whyCard4Line2:"AI сокращает затраты и улучшает прогнозирование.",whyCard4Line3:"ChefNet помогает ресторанам зарабатывать больше без лишних усилий.",whyCard5Title:"Помощь ресторанам — часть миссии ChefNet",whyCard5Line1:"От привлечения гостей до привлечения финансирования при обновлении, модернизации или открытии нового заведения, а также маркетинговая поддержка, чтобы о заведении узнали те, кому оно понравится.",whyCard5Line2:"ChefNet — сервис, который помогает ресторанам не просто работать, но расти и развиваться.",whyCard6Title:"Персонализация через AI-компаньона",whyCard6Line1:`Рекомендации под ваши вкусы, настроение и обстоятельства.
Мгновенное бронирование и готовый маршрут.`,whyCard6Line2:"Динамические меню, голосовые сценарии и адаптивные рекомендации — всё, чтобы выбор был действительно легким."},de:{features:"Besonderheit",aboutUs:"Möglichkeiten",forPartners:"Für partner",referralProgramme:"Entwicklungsphasen",stagesOfDevelopment:"Entwicklungsphasen",whyChefNet:"Warum ChefNet?",roadmap:"Roadmap",faq:"FAQ",team:"Team",contacts:"Kontakte",logIn:"Anmelden",signIn:"Registrieren",heroTitle1:"Intelligenz, die Auswahl in Wert",heroTitle2:"verwandelt.",heroTitle3:"Intelligenz,",heroTitle4:"die Auswahl in Wert verwandelt.",heroSubtitle:"ChefNet ist eine KI-basierte Technologie,",heroDescription:"die Ihren Rhythmus erfasst, Ihren Geschmack speichert und Ihnen täglich Zeit und Geld spart - jeden Tag.",heroBenefit1:"Restaurants gewinnen neue Gäste.",heroBenefit2:"Gäste erhalten präzise, personalisierte Empfehlungen.",heroBenefit3:"Partner profitieren von transparentem Wachstum und einem dynamischen Markt.",heroCta:"Jetzt ist Ihre Chance, Teil dieser Bewegung zu werden.",getStarted:"Get Started",opportunitiesTitle:"Opportunities",opportunity1Title:"ChefNet",opportunity1Desc:"Your chance",opportunity2Title:"ChefNet",opportunity2Desc:"Our turn",opportunity3Title:"ChefNet",opportunity3Desc:"Revolution",believeTitle:"Unsere Philosophie",believeSubtitle:"Einfachheit mit einem Fingertipp. Präzision – ganz im Stil von ChefNet.",believeDesc1:`Wir entwickeln einen Service, der die Wahl einer Lokation so einfach macht wie die Bestellung eines Taxis.
Unser Ziel ist es, Millionen Menschen Zeit zu sparen und ihnen ein bestmögliches Erlebnis zu bieten.`,believeDesc2:`Hochmoderne Technologie arbeitet für den Menschen — schnell, präzise und ohne unnötige Schritte.
ChefNet zeigt nicht die am stärksten beworbenen, sondern die wirklich besten Orte —
dank ehrlicher, authentischer und verifizierter Bewertungen.`,believeDesc3:"",chefnetAppTitle1:"Möglichkeiten mit ChefNet ",chefnetAppTitle2:"Invest",chefnetAppTitle3:"",chefnetAppOpportunity1Title:"ChefNet",chefnetAppOpportunity1Subtitle:" — Ihr Einstieg in einen neuen Trend.",chefnetAppOpportunity1Desc:"ChefNet Invest - ist Ihre Chance, an der Entstehung eines globalen Trends und Technologie-Giganten teilzuhaben, wie es ihn heute noch nicht gibt.",chefnetAppOpportunity1DescPart1:"ChefNet ",chefnetAppOpportunity1DescPart2:"Invest",chefnetAppOpportunity1DescPart3:" - ist Ihre Chance, an der Entstehung eines globalen Trends und Technologie-Giganten teilzuhaben, wie es ihn heute noch nicht gibt.",chefnetAppOpportunity2Title:"ChefNet",chefnetAppOpportunity2Subtitle:" — jetzt sind wir an der Reihe.",chefnetAppOpportunity2Desc:"Booking, Uber, Airbnb, Amazon gab es früher auch nicht. Heute kennt sie die ganze Welt. Der nächste Name auf dieser Liste - ChefNet!!!",chefnetAppOpportunity2DescPart1:"Booking, Uber, Airbnb, Amazon gab es früher auch nicht. Heute kennt sie die ganze Welt. Der nächste Name auf dieser Liste - ",chefnetAppOpportunity2DescPart2:"ChefNet",chefnetAppOpportunity2DescPart3:"!!!",chefnetAppOpportunity3Title:"ChefNet",chefnetAppOpportunity3Subtitle:" — der neue Standard in FoodTech.",chefnetAppOpportunity3Desc:"ChefNet ist eine Revolution in der Welt der Food-Apps – eine Idee, deren Zeit gekommen ist.",chefnetAppOpportunity3DescPart1:"",chefnetAppOpportunity3DescPart2:"ChefNet",chefnetAppOpportunity3DescPart3:" ist eine Revolution in der Welt der Food-Apps – eine Idee, deren Zeit gekommen ist.",uniqueFeaturesTitle:"Die einzigartigen funktionen von",uniqueFeaturesChefNet:"ChefNet",feature1Title:"Ihr persönlicher KI-Begleiter",feature1Desc:"Angetrieben von Super-Intelligenz: Sie versteht Ihren Geschmack, wählt die besten Optionen aus und begleitet Sie nahtlos vom Auswahl bis zur Zahlung. Ihr KI-Begleiter weiß, was Sie lieben, reserviert Ihren Tisch im Voraus und spart Ihnen täglich Zeit.",feature2Title:"Intuitive Suche",feature2Desc:"Suchen Sie Restaurants, Gerichte und kulinarische Stilrichtungen – schnell und präzise. Interaktive Karte mit intelligenten Filtern: Küche, Bewertung, Preis. Immer aktuelle Ergebnisse – in Echtzeit.",feature3Title:"Flexibilität in der Nutzung",feature3Desc:"Das System funktioniert in zwei Modi: visuelle Auswahl anhand von Bildern oder Sprachsteuerung über Ihren KI-Begleiter. Sie wählen – die KI erledigt den Rest.",feature4Title:"Klarheit und Details",feature4Desc:"Interaktives Menü in Foto- und Videoformat mit Zutaten und Kalorieninformationen. Bestellen Sie Ihr Mahlzeit im Voraus und haben Sie sie bereit, sobald Sie es sofort bei Ankunft serviert – ideal, wenn Sie es eilig haben.",feature5Title:"Einzigartiges Kundenbewertungssystem",feature5Desc:"ChefNet definiert Bewertungen neu: nicht nur ⭐-Sterne, sondern echte Emotionen. Audio und Video Format machen das Feedback persönlich, während Bewertungen zu Speisen, Service und Atmosphäre echte Verlässlichkeit schaffen.",feature6Title:"Verdienen Sie mit Ihrer Aktivität",feature6Desc:"Verdienen Sie nicht nur Punkte – sondern echtes Geld für Ihre Aktivität.",feature7Title:"Alles-in-einer-App",feature7Desc:"Eine einheitliche globale Plattform: von Cafés und Bars bis zu Premium-Restaurants und privaten Köchen.",feature8Title:"Ein KI-Begleiter - der Ihr kulinarisches Erlebnis einfach und nahtlos gestaltet",feature8Desc:"Ihr Begleiter findet den perfekten Ort, reserviert Ihren Tisch, plant Ihre Route und erinnert Sie, wenn es Zeit zu gehen. Restaurant mit Freunden besucht? Er wird sie einladen und sich persönlich bei jedem von ihnen melden!",feature9Title:"Unterstützung und Entwicklung von Restaurants",feature9Desc:"ChefNet begleitet gastronomische Betriebe beim Wachstum – von der Idee bis zur Skalierung. KI-gestützte Analysen bewerten Kennzahlen und liefern konkrete Optimierungsvorschläge. Zugang zu Kapital privater Investoren sowie kulinarisch ausgerichteter Fonds und Teilnahme an den Investmentprogrammen der ChefNet-Community.",advantagesTitle:"Advantages",advantagesSubtitle:"Why invest",advantage1Title:"Innovation",advantage1Desc:"Advanced",advantage2Title:"Growth",advantage2Desc:"Rapid",advantage3Title:"Team",advantage3Desc:"Expert",advantage4Title:"Returns",advantage4Desc:"High",competitiveTitle:"Advantage",traditional:"Traditional",competitors:"Competitors",chefnet:"ChefNet",avgReturn:"Returns",partnershipTitle:"Partnership",partnershipSubtitle:"Rewards",partnershipCard1Title:"Partner",partnershipCard1Desc:"Become partner",partnershipCard2Title:"Program",partnershipCard2Desc1:"Classic model",partnershipCard2Desc2:"More shares",partnershipCard3Title:"Rounds",partnershipCard3Desc:"Value grows",you:"You",startNetwork:"Start network",level:"Level",level1Reward:"5%",level1Desc:"5% reward",level2Reward:"2%",level2Desc:"2% reward",level3Reward:"1%",level3Desc:"1% reward",howItWorks:"How it works",step1Title:"Share",step1Desc:"Unique link",step2Title:"Friends invest",step2Desc:"Earn commission",step3Title:"Grow",step3Desc:"Build network",roadmapTitle:"Roadmap",roadmapSubtitle:"Verfolgen Sie unseren Aufstieg vom Startup zum Branchenführer",period1Title:"Q1 2026",period1Desc:"MVP",period1KPI:"",period2Title:"Q2 2026",period2Desc:"Launch",period2KPI:"",period3Title:"Q3 2026",period3Desc:"Product",period3KPI:"",period4Title:"Q4 2026",period4Desc:"Preparation",period4KPI:"",period5Title:"Q1 2027",period5Desc:"Ecosystem",period5KPI:"",period6Title:"Q2 2027",period6Desc:"Marketing",period6KPI:"",period7Title:"Q3 2027",period7Desc:"Growth",period7KPI:"",period8Title:"Q4 2027",period8Desc:"Social",period8KPI:"",period9Title:"2028+",period9Desc:"AI & FinTech",period9KPI:"",completed:"Abgeschlossen",active:"Aktiv",upcoming:"Bevorstehend",investmentsTitle:"Entwicklungsphasen",seedRound:"Seed",seriesA:"Series A",seriesB:"Series B",seriesC:"Series C",pricePerShare:"Price",minInvestment:"Minimum",soldOut:"Sold Out",activeRound:"Active",comingSoon:"Coming Soon",shares:"shares",investNow:"Invest Now",seedBackTitle:"Entwicklung der App MVP",seedBackDesc:`Werben von Nutzern
Verhandlungen mit Restaurants
Einstellung von Ländermanagern
KPI: 10K Nutzer`,privateBackTitle:"Test des MVP",privateBackDesc:`Test des MVP in Schlüsselstädten in den USA und Europa
Partnerschaften mit Gastronomieveränden und lokalen Restaurantketten
Verbesserung der Personalisierungsalgorithmen und KI-basierten Empfehlungen
KPI: 100.000 Nutzer, 500 Restaurants`,marketingBackTitle:"Integration mit Ride-Sharing-Diensten",marketingBackDesc:`Integration mit Ride-Sharing-Diensten (Uber, Lyft, Bolt)
Launch der voll ausgestatteten ChefNet-App
Ausbau des Fintech-Moduls (Zahlungen, Cashback, ChefNet Token)
Umfangreiche Kooperationen mit Kreatoren und Medienpartnern in den USA und der EU
KPI: 1 Mio. Nutzer, 5.000 Restaurants, 1 Mio. USD Gewinn`,publicBackTitle:"Expansion nach Asien, Lateinamerika und in den Nahen Osten",publicBackDesc:`Skalierung zu einer globalen SuperApp
Gründung einer DAO-Community und Einführung von NFT-Programmen für Restaurants
Vorbereitung auf einen Börsengang mit einer Bewertung von 3–5 Mrd. USD
KPI: 30 Mio. Nutzer, 50.000 Restaurants, über 100 Mio. USD Gewinn`,ctaBannerTitle:"Die Zukunft der Restaurants beginnt hier.",ctaBannerHighlight:"Tritt ",ctaBannerHighlightBrand:"ChefNet",ctaBannerSuffix:" bei.",faqTitle:"Häufig gestellte Fragen",faqSubtitle:"Questions",faq1Question:"Was ist ChefNet und welches Problem löst das Projekt?",faq1Answer:`ChefNet ist eine globale FoodTech-Plattform, die Entdeckung, Buchung, Zahlungsabwicklung und Interaktion mit Restaurants sowie privaten Köchen in einem einheitlichen Ökosystem vereint.

Sie löst die Zersplitterung des Gastronomie-Ökosystems durch die Etablierung eines durchgängigen, nahtlosen Standards.`,faq2Question:"Wie funktioniert das Geschäftsmodell von ChefNet?",faq2Answer:`Wir betreiben ein hybrides Geschäftsmodell aus Marketplace, SaaS und Fintech – mit diversifizierten Einnahmequellen über vier Kanäle:

• **Transaktionsgebühren:** Prozentuale Beteiligung an Buchungen, Vorbestellungen von Speisen sowie Event-Ticketverkäufen.

• **Abonnements (B2B SaaS):** Monatliche Gebühren, die von Restaurants für den Zugriff auf CRM-Systeme, KI-gestützte Analysen und Marketingtools gezahlt werden.

• **Fintech (Zahlungsabwicklung):** Transaktionsgebühren aus In-App-Zahlungen und Funktionen zur Rechnungsteilung.

• **Werbung:** Bezahlte Promotion von Restaurants innerhalb der App – sowohl in der Entdeckungsansicht als auch in den Suchergebnissen.`,faq3Question:"In welcher Entwicklungsphase befindet sich das Projekt aktuell?",faq3Answer:"Das Projekt hat seine Pre-Seed-Runde erfolgreich abgeschlossen. Derzeit befinden wir uns in einer aktiven Fundraising-Phase, um die Entwicklung und den Launch des MVP zu finanzieren.",faq4Question:"Wo ist das Unternehmen registriert und welche Rechtsform hat es?",faq4Answer:"Die ChefNet LLC ist im US-Bundesstaat Delaware registriert — dem führenden Rechtsstandort der Vereinigten Staaten für internationale Investitionen.",faq5Question:"Struktur der Investitionsrunde und Beteiligungsbedingungen?",faq5Answer:`Um ChefNets globale Strategie umzusetzen, haben wir einen schrittweisen Fundraising-Prozess mit einem Gesamtziel von 2.000.000 USD geplant. Die Finanzierung ist in vier Schlüsselrunden (Tranchen) strukturiert. Dieser Ansatz ermöglicht Investoren eine Risikominimierung, während das Unternehmen in jeder nachfolgenden Phase seine Bewertung steigern kann.

Aktueller Fokus — Runde 1 (Pre-Seed).

Detaillierte Rundenbeschreibung:
🟢 Runde 1: MVP-Entwicklung (Pre-Seed)

Betrag: 150.000 USD

Ziel: Technische Grundlage des Produkts aufbauen.

Mittelverwendung: Anwendungsarchitektur, UI/UX-Design, Backend-Entwicklung sowie Veröffentlichung der ersten funktionalen Version (MVP) für iOS und Android.

Ergebnis: Ein produktionsreifes Produkt für Early-User verfügbar.

🟡 Runde 2: Marktvalidierung (Seed 1)

Betrag: 350.000 USD

Ziel: Validierung der Kernhypothesen im Live-Markt und Generierung erster Kennzahlen.

Mittelverwendung: Soft Launch, Onboarding der ersten 50 Restaurant-Partner, initiale Marketingmaßnahmen sowie Betriebskosten des Kern-Teams.

Ergebnis: Nachgewiesene Produkt-Markt-Passung, erste Transaktionen und aktive Nutzer.

🔵 Runde 3: Ökosystem & Integrationen (Seed 2 / Bridge)

Betrag: 500.000 USD

Ziel: Weiterentwicklung der App zu einer vollständigen Plattform.

Mittelverwendung: Technische Integrationen mit Ride-Hailing-Diensten, Restaurant-POS-Systemen sowie Weiterentwicklung KI-gestützter Personalisierungsalgorithmen.

Ergebnis: Eine voll funktionsfähige Plattform zur Unterstützung massiver Adaption.

🟣 Runde 4: Launch & Skalierung (Growth)

Betrag: 1.000.000 USD

Ziel: Aggressive Marktdurchdringung und Monetarisierung.

Mittelverwendung: Großflächige Marketingkampagnen (Influencer, Performance-Marketing), Launch des Fintech-Moduls sowie Expansion in neue Regionen (USA und Europa).

Ergebnis: Nutzerbasis auf KPI-Niveau (hunderttausende Nutzer) und Erreichung stabiler wiederkehrender Einnahmen.

Status Update: Wir sind aktuell offen für Angebote zur Runde 1 (150.000 USD) zur Initiierung der MVP-Entwicklung.`,faq6Question:"Welche Sicherheiten werden Investoren gewährt?",faq6Answer:`Wir gestalten Investorenbeziehungen auf Basis absoluter Transparenz und strikter Einhaltung international anerkannter Rechtsstandards.

Ihre Investition wird durch folgende Schutzmechanismen gesichert:

**1. Rechtlicher Schutz (US-Recht)**

Das Unternehmen ist unter US-Gerichtsbarkeit als Delaware C-Corporation strukturiert – der international anerkannte Goldstandard für Venture-Capital-Investitionen. Investorenrechte, einschließlich Eigenkapitalbeteiligungen und Ansprüche aus wandelbaren Instrumenten (SAFE), werden durch US-Recht geschützt. Alle Vereinbarungen werden in rechtsverbindlichen Verträgen fixiert.

**2. Schutz des geistigen Eigentums (IP-Eigentum)**

Sämtliche Technologien, Quellcodes, Markenassets und die Kundenbasis sind rechtlich im Besitz der Gesellschaft – nicht einzelner Gründer oder Mitwirkender. Dies gewährleistet, dass der Kernwert Ihrer Investition vollständig innerhalb der Unternehmensstruktur geschützt ist.

**3. Transparenz und Berichterstattung**

Investoren erhalten regelmäßige Updates zur Unternehmensperformance, einschließlich Finanzberichten (GuV), Produktkennzahlen, Entwicklungsroadmap-Status und Mittelverwendung. Sie behalten stets vollständige Transparenz darüber, wie Ihr Kapital eingesetzt wird.

**4. Gründeranreize (Vesting)**

Gründerbeteiligungen unterliegen einem standardisierten Vesting-Zeitplan. Dies aligniert die Interessen der Gründer mit dem langfristigen Unternehmenserfolg und verhindert vorzeitiges Ausscheiden bei gleichzeitiger Sicherung der frühen Eigentumsposition.`,faq7Question:"Mit welcher Höhe der potenziellen Rendite ist zu rechnen?",faq7Answer:`Eine Investition in ChefNet in der Frühphase (Pre-Seed/Seed) ermöglicht Beteiligung am exponentiellen Wachstum der Unternehmensbewertung. Unser Ziel geht über operativen Gewinn hinaus – wir fokussieren uns auf die Skalierung des Unternehmenswerts.

Die Renditechancen werden durch drei Schlüsselfaktoren getrieben:

**1. Unternehmensbewertungs-Wachstum (X-faches Wertsteigerungspotenzial)**

In der aktuellen Phase erwerben Investoren Eigenkapital zum niedrigsten Bewertungsniveau. Mit jeder Folgerunde – getrieben durch Produktintegrationen und globale Skalierung – steigt die Unternehmensbewertung.

Ziel: 10–20-fache Steigerung des Unternehmenswerts bis zur Series A/B-Runde oder einer strategischen Übernahme.

**2. Projiziertes Umsatzwachstum**

Laut unserem Finanzmodell erwarten wir bis 2028 – nach globaler Markterschließung und vollständiger Fintech-Integration – einen Jährlich Wiederkehrenden Umsatz (ARR) von über 100 Mio. USD. Dies bildet die Grundlage für starke Vermögensrentabilität und langfristigen Wert.

**3. Exit-Strategie**

Investorenrenditen realisieren sich primär beim Exit. Für Early-Stage-Investoren sehen wir innerhalb eines 3–5-Jahres-Horizonts zwei Liquiditätsszenarien vor:

• **Fusionen & Übernahmen (M&A):** Verkauf des Unternehmens an einen globalen Branchenplayer (z.B. Uber, DoorDash, Booking oder Fintech-Banking-Ökosysteme).

• **Sekundärmarkt:** Möglichkeit, Anteile in späteren Finanzierungsrunden mit erheblichem Aufschlag an neue Investoren zu veräußern.`,faq8Question:"Wann ist der Börsengang geplant?",faq8Answer:`Wir betrachten einen Börsengang (IPO) als eines der möglichen langfristigen Entwicklungsszenarien, mit einem prognostizierten Zeithorizont von etwa 5–7 Jahren.

Unser primäres Ziel ist jedoch die Maximierung der Unternehmensbewertung und die Sicherstellung der Liquidität für Investoren. Entsprechend entwickeln wir das Geschäftsmodell mit zwei Exit-Strategien:

**Fusionen & Übernahmen (Strategische Übernahme):**

Verkauf des Unternehmens an einen globalen strategischen Player (z.B. Ökosysteme wie Uber, Booking, DoorDash oder führende Fintech-Konzerne) innerhalb eines 3–5-jährigen Horizonts. Dies ist das wahrscheinlichste Szenario für einen schnellen Exit, das eine hohe Kapitalrendite bei einem attraktiven Bewertungsmultiplikator bietet.

**IPO (Börsengang):**

Öffentliche Notierung nach Erreichen einer Bewertung von über 1 Mrd. USD und stabiler internationaler Umsätze, um ein unabhängiges, global agierendes Unternehmen zu etablieren.`,faq9Question:"Welche Technologien setzt ChefNet ein?",faq9Answer:`ChefNet basiert auf einer modernen, cloud-nativen Microservices-Architektur – für maximale Flexibilität, sichere Finanztransaktionen und die schnelle Bereitstellung KI-gestützter Funktionen.

Unser Technologiestack:

1. Mobile & Frontend (Plattformübergreifend)

Einsatz von Flutter oder React Native.

Warum:

Einheitlicher Codebase für iOS und Android ermöglicht eine bis zu 40 % schnellere Entwicklung, reduziert Wartungskosten und gewährleistet gleichzeitig hohe Performance und ein authentisches nativ-App-Erlebnis.

2. Backend & API (Server-seitig)

Primärsprachen: Python (FastAPI / Django) oder Node.js.

Warum:

Python ist ideal für KI-Integration und Datenverarbeitung. Eine Microservices-Architektur ermöglicht die nahtlose Ergänzung neuer Geschäftsbereiche – wie Fintech-Module oder Event-Management – ohne die komplette Plattform neu zu entwickeln.

3. Künstliche Intelligenz (KI & Daten)

LLM-Integration:

Anbindung an führende Large Language Models (OpenAI GPT-4 / Anthropic) für den KI-Concierge.

Empfehlungssystem:

Proprietäre Machine-Learning-Algorithmen personalisieren die Restaurantempfehlungen basierend auf Nutzerverhalten und Bestellhistorie.

4. Fintech & Sicherheit

Zahlungsabwicklung:

Integration via Stripe Connect oder Adyen (Branchenstandard für Marktplätze).

Sicherheit:

Vollständige PCI DSS-Konformität zum Schutz von Zahlungsdaten sowie Ende-zu-Ende-SSL/TLS-Verschlüsselung sämtlicher übertragener Daten.

5. Infrastruktur

Cloud:

Hosting auf AWS (Amazon Web Services) oder Google Cloud.

Skalierbarkeit:

Einsatz von Docker und Kubernetes zur automatischen Lastverteilung bei Traffic-Spitzen.`,faq10Question:"Was unterscheidet ChefNet grundlegend von Wettbewerbern wie Yelp, OpenTable und Grubhub?",faq10Answer:`ChefNet vereint das gesamte Gästerlebnis – von der ersten Idee bis zur Zahlung.

Bestehende Anbieter lösen jeweils nur ein eng begrenztes Problem: Yelp ist ein Verzeichnis, OpenTable ein Reservierungstool, Grubhub ein Lieferservice. ChefNet beseitigt Reibungsverluste entlang der gesamten Gästereise – vom "Wohin gehen?" zum Bezahlen – und schließt Lücken im Nutzererlebnis.

Unsere 5 Kernvorteile:

1. KI-Concierge statt Filter-Suche (vs. Yelp/TripAdvisor)

Konkurrenz: Nutzer stundenlanges Scrollen durch Bewertungen und Filter-Tuning.

Wir: Hyperpersonalisierung. Der KI-Assistent erkennt Vorlieben, Stimmung und Budget – liefert in Sekunden die perfekte Empfehlung, als frage man einen Feinschmecker-Freund.

2. Nahtloses Fintech: Bezahlen & Rechnungsteilung (vs. OpenTable)

Konkurrenz: App-Nutzen endet bei der Reservierung; am Tisch warten Gäste auf Kellner und Karte.

Wir: Pay-at-Table. Durchgängiger Flow: Reservieren → Bestellen → Bezahlen → Rechnung per Fingertipp teilen. Höhere Tischumsätze durch kürzere Verweildauer.

3. Sozialer Dining-Ansatz (vs. Grubhub/Uber Eats)

Konkurrenz: Isoliertes Lieferservice-Erlebnis.

Wir: Gemeinschaft statt Einsamkeit. Tools zum gemeinsamen Planen: Restaurant-Voting, Event-Tickets kaufen, Freunde einladen – wir beleben das gesellschaftliche Essen neu.

4. Faires Monetarisierungsmodell

Konkurrenz: Wucherprovisionen (bis 30% bei Lieferungen), Gebühren selbst für Stammgäste.

Wir: SaaS + Fintech. CRM/Analytics-Tools per Abonnement; Margen aus Transaktionen – nicht durch Auspressen von Partnern.

5. Lebendige Bewertungskultur (vs. TripAdvisor)

Konkurrenz: Textlastige, oft manipulierte Bewertungen; überbearbeitete Fotos.

Wir: Echtheit durch Video. Kurzvideos (Stories/Reels) zeigen authentische Atmosphäre und Gerichte – ohne Filter. Empfehlungs-Feeds von Freunden oder Food-Bloggern machen die Suche zum Entertainment.`,contactTitle:"Questions?",contactSubtitle:"Here to help",contactButton:"Contact",footerTagline:"Ihr Wegweiser in die Welt der gastronomischen Innovation",footerContacts:"Kontakte",footerEmail:"support@chefnet.ai",footerPhone:"+1 (917) 332-8053",footerAddress:`ChefNet LLC
The Green STE B
Dover, DE 19901`,footerNewsletter:"Nachrichten",footerNewsletterDesc:"Bleiben Sie mit den neuesten Nachrichten und Angeboten stets bestens informiert.",footerNewsletterPlaceholder:"Email",footerNewsletterButton:"Abonnieren",footerPrivacyPolicy:"Datenschutzrichtlinie",footerCopyright:"© 2026 ChefNet LLC. Alle Rechte vorbehalten.",partnersOpportunitiesTitle:"Opportunities",opportunityCard1Title:"Dashboard",opportunityCard1Desc:"Track shares",opportunityCard2Title:"AI Companion",opportunityCard2Desc:"Publishes news",opportunityCard3Title:"Referral",opportunityCard3Desc:"Increase stake",opportunityCard4Title:"Extended",opportunityCard4Desc:"Additional opportunities",opportunityCard5Title:"Fundraising",opportunityCard5Desc:"Early rounds",opportunityCard6Title:"Legal",opportunityCard6Desc:"Delaware, USA",partnersTitle:"Möglichkeiten  für Partner",partner1Title:"Werden Sie Mitinhaber des Unternehmens",partner1Desc:"Steigen Sie in der Gründungsphase ein, damit Ihre ChefNet-Anteile beim Börsengang in Unternehmensaktien umgewandelt werden.",partner2Title:"Partnerprogramm",partner2Desc:"Ein klassisches Modell, mit dem Sie Ihren Anteil erhöhen können, indem Sie während der Fundraising-Phase neue Partner werben.\\nJe mehr Sie investieren – desto größer Ihr Anteil. Alles transparent und einfach.",partner3Title:"Finanzierungsrunden",partner3Desc:"Mit jeder Wachstumsphase von ChefNet steigt der Wert Ihrer Anteile.",partner4Title:"Partner-Dashboard",partner4Desc:"Verfolgen Sie erworbene und verdiente Anteile innerhalb des Partnerprogramms.",partner5Title:"KI-Begleiter",partner5Desc:"veröffentlicht Unternehmensnachrichten und globale Trends der Gastronomiebranche, beantwortet Ihre Fragen und führt Ihre Anfragen aus.",partner6Title:"Erweitertes Empfehlungsprogramm",partner6Desc:"Nach dem Launch der App erhalten Sie zusätzliche Möglichkeiten, Ihr bestehendes Netzwerk zu monetarisieren. Zudem werden Sie für die Vermittlung neuer Nutzer und Restaurants sowie für Ihren Beitrag zur Entwicklung des Ökosystems belohnt.",partner7Title:"Fundraising",partner7Desc:"Die Teilnahme an frühen Finanzierungsrunden bietet mehr Möglichkeiten, Anteile zu den günstigsten Konditionen zu erwerben und nach dem Börsengang der Gesellschaft eine höhere Anzahl an Aktien zu erhalten.",partner8Title:"Solider rechtlicher Rahmen",partner8Desc:"Die Unternehmensregistrierung in den USA, Bundesstaat Delaware, belegt ernsthafte Absichten und garantiert eine transparente rechtliche und finanzielle Berichterstattung gemäß US-amerikanischen Standards.",whyChefNetTitle:"Warum ChefNet?",whyCard1Title:"ChefNet ist ein Ökosystem der nächsten Generation",whyCard1Desc:"Wir verbinden Nutzer und Unternehmen durch KI und machen Gastronomie smart und bequem.",whyCard2Title:"Kulinarisches soziales Netzwerk",whyCard2Desc:"Inhalte von Nutzern und Köchen: Fotos, Videos, Rezensionen und Rezepte.\\nLive-Streams und Meisterkurse von den besten Köchen der Welt.",whyCard3Title:"ChefNet-Platform",whyCard3Desc:"Eine Plattform, auf der Leidenschaft für Kulinarik auf Technologie trifft.",whyCard4Title:"Technologie, die für Restaurants arbeitet",whyCard4Line1:"Intelligente Interfaces erhöhen den durchschnittlichen Umsatz pro Gast.",whyCard4Line2:"KI senkt Kosten und verbessert die Prognosegenauigkeit.",whyCard4Line3:"ChefNet hilft Restaurants, mehr zu verdienen – mühelos.",whyCard5Title:"Die Unterstützung von Restaurants steht im Herzen der ChefNet-Mission",whyCard5Line1:"Wir bieten Zugang zu Ressourcen für die Beschaffung von Finanzmitteln für Renovierungen, Modernisierungen oder Neueröffnungen bis hin zur Marketingunterstützung, damit die richtigen Gäste Ihr Lokal entdecken.",whyCard5Line2:"ChefNet ist der Service, der Restaurants nicht nur beim Betrieb hilft, sondern dabei, zu wachsen und erfolgreich zu sein.",whyCard6Title:"Personalisierung durch Ihren KI-Begleiter",whyCard6Line1:"Passende Empfehlungen basierend auf Ihrem Geschmack, Ihrer Stimmung und dem Kontext.\\nSofortbuchen und eine fertige Route.",whyCard6Line2:"Dynamische Menüs, sprachbasierte Szenarien und adaptive Vorschläge – all das macht Ihre Entscheidung dem Kirklich unkompliziert."},es:{features:"Ventajas",aboutUs:"Oportunidades",forPartners:"Para socios",referralProgramme:"Etapas de desarrollo",stagesOfDevelopment:"Etapas de desarrollo",whyChefNet:"¿Por qué ChefNet?",roadmap:"Hoja de ruta",faq:"FAQ",team:"Equipo",contacts:"Contactos",logIn:"Acceder",signIn:"Registrarse",heroTitle1:"Inteligencia que convierte la elección",heroTitle2:"en valor.",heroTitle3:"Inteligencia,",heroTitle4:"que convierte la elección en valor.",heroSubtitle:"ChefNet es una tecnología basada en inteligencia artificial",heroDescription:"que aprende tu ritmo, recuerda tus preferencias y te ahorra tiempo y dinero cada día.",heroBenefit1:"Los restaurantes ganan nuevos comensales.",heroBenefit2:"Los comensales reciben recomendaciones precisas y personalizadas.",heroBenefit3:"Los socios se benefician de un crecimiento transparente y un mercado dinámico.",heroCta:"Ha llegado el momento de unirse a este movimiento.",getStarted:"Get Started",opportunitiesTitle:"Opportunities",opportunity1Title:"ChefNet",opportunity1Desc:"Your chance",opportunity2Title:"ChefNet",opportunity2Desc:"Our turn",opportunity3Title:"ChefNet",opportunity3Desc:"Revolution",believeTitle:"Lo que nos guía",believeSubtitle:"Sencillez en un solo toque. Precisión al estilo ChefNet.",believeDesc1:`Estamos creando un servicio que hace elegir un lugar tan sencillo como pedir un taxi.
Nuestro objetivo es ahorrar tiempo a millones de personas y ofrecerles la mejor experiencia posible.`,believeDesc2:`La tecnología más avanzada trabaja para las personas: rápida, precisa y sin pasos innecesarios.
ChefNet no muestra los lugares más publicitados, sino los verdaderamente mejores,
gracias a reseñas honestas, auténticas y verificadas.`,believeDesc3:"",chefnetAppTitle1:"Oportunidades con ChefNet ",chefnetAppTitle2:"Invest",chefnetAppTitle3:"",chefnetAppOpportunity1Title:"ChefNet",chefnetAppOpportunity1Subtitle:" — tu entrada a una nueva tendencia.",chefnetAppOpportunity1Desc:"ChefNet Invest – tu oportunidad de formar parte del nacimiento de una tendencia global y un gigante tecnológico sin precedentes en la actualidad.",chefnetAppOpportunity1DescPart1:"ChefNet ",chefnetAppOpportunity1DescPart2:"Invest",chefnetAppOpportunity1DescPart3:" – tu oportunidad de formar parte del nacimiento de una tendencia global y un gigante tecnológico sin precedentes en la actualidad.",chefnetAppOpportunity2Title:"ChefNet",chefnetAppOpportunity2Subtitle:" — Ahora nos toca a nosotros.",chefnetAppOpportunity2Desc:"Booking, Uber, Airbnb y Amazon tampoco existían en su momento. Hoy, todo el mundo los conoce. El próximo nombre en esta lista - !!!ChefNet!!!",chefnetAppOpportunity2DescPart1:"Booking, Uber, Airbnb y Amazon tampoco existían en su momento. Hoy, todo el mundo los conoce. El próximo nombre en esta lista - !!!",chefnetAppOpportunity2DescPart2:"ChefNet",chefnetAppOpportunity2DescPart3:"!!!",chefnetAppOpportunity3Title:"ChefNet",chefnetAppOpportunity3Subtitle:" — el nuevo estándar en FoodTech.",chefnetAppOpportunity3Desc:"ChefNet es una revolución en el mundo de las aplicaciones gastronómicas — una idea cuyo momento ha llegado.",chefnetAppOpportunity3DescPart1:"",chefnetAppOpportunity3DescPart2:"ChefNet",chefnetAppOpportunity3DescPart3:" es una revolución en el mundo de las aplicaciones gastronómicas — una idea cuyo momento ha llegado.",uniqueFeaturesTitle:"Las características únicas de",uniqueFeaturesChefNet:"ChefNet",feature1Title:"Tu compañero de IA personal",feature1Desc:"Impulsado por una Superinteligencia: entiende tus gustos, selecciona las mejores opciones y te guía sin esfuerzo desde la elección hasta el pago. Tu compañero de IA sabe lo que te gusta, reserva tu mesa con anticipación y te ahorra tiempo cada día.",feature2Title:"Búsqueda intuitiva",feature2Desc:"Búsqueda por restaurantes, platos y tipos de cocina: rápida y precisa. Mapa interactivo con filtros inteligentes: tipo de cocina, valoración, precio. Resultados siempre actualizados — en tiempo real.",feature3Title:"Flexibilidad de uso",feature3Desc:"El sistema funciona en dos modos: selección visual mediante imágenes o control por voz a través de tu compañero de IA. Tú eliges — la inteligencia se encarga del resto.",feature4Title:"Claridad y detalles",feature4Desc:"Menú interactivo en formato de fotos y vídeos, con información sobre ingredientes y calorías. Pide tu comida por adelantado y tenla lista en el momento en que llegues: perfecto cuando vas con prisas.",feature5Title:"Sistema único de reseñas de clientes",feature5Desc:"ChefNet redefine las reseñas: no solo valoraciones con ⭐, sino emociones reales. Los comentarios en audio y vídeo hacen la retroalimentación personal, mientras que las puntuaciones por platos, servicio y ambiente la hacen genuinamente confiable.",feature6Title:"Gana por tu actividad",feature6Desc:"Gana no solo puntos, sino dinero real por tu actividad.",feature7Title:"Todo en una sola app",feature7Desc:"Una plataforma global unificada: desde cafeterías y bares hasta restaurantes premium y chefs privados.",feature8Title:"Un compañero de IA que hace tu experiencia gastronómica sencilla y fluida",feature8Desc:"Tu compañero encuentra el lugar ideal, reserva mesa, traza tu ruta y te avisa cuando sea hora de irte. ¿Sales con amigos? Los invitará y se pondrá en contacto con cada uno de forma personalizada.",feature9Title:"Apoyo y desarrollo de restaurantes",feature9Desc:"ChefNet impulsa el crecimiento de establecimientos gastronómicos: desde la fase conceptual inicial hasta la expansión a gran escala. La inteligencia artificial analiza métricas de rendimiento y proporciona estrategias de optimización ejecutables. Acceso a financiación procedente de inversores privados y fondos especializados en gastronomía, además de participación en programas de inversión respaldados por la comunidad ChefNet.",advantagesTitle:"Advantages",advantagesSubtitle:"Why invest",advantage1Title:"Innovation",advantage1Desc:"Advanced",advantage2Title:"Growth",advantage2Desc:"Rapid",advantage3Title:"Team",advantage3Desc:"Expert",advantage4Title:"Returns",advantage4Desc:"High",competitiveTitle:"Advantage",traditional:"Traditional",competitors:"Competitors",chefnet:"ChefNet",avgReturn:"Returns",partnershipTitle:"Partnership",partnershipSubtitle:"Rewards",partnershipCard1Title:"Partner",partnershipCard1Desc:"Become partner",partnershipCard2Title:"Program",partnershipCard2Desc1:"Classic model",partnershipCard2Desc2:"More shares",partnershipCard3Title:"Rounds",partnershipCard3Desc:"Value grows",you:"You",startNetwork:"Start network",level:"Level",level1Reward:"5%",level1Desc:"5% reward",level2Reward:"2%",level2Desc:"2% reward",level3Reward:"1%",level3Desc:"1% reward",howItWorks:"How it works",step1Title:"Share",step1Desc:"Unique link",step2Title:"Friends invest",step2Desc:"Earn commission",step3Title:"Grow",step3Desc:"Build network",roadmapTitle:"Hoja de ruta",roadmapSubtitle:"Siga nuestra trayectoria: de startup a referente indiscutible del sector",period1Title:"Q1 2026",period1Desc:"MVP",period1KPI:"",period2Title:"Q2 2026",period2Desc:"Launch",period2KPI:"",period3Title:"Q3 2026",period3Desc:"Product",period3KPI:"",period4Title:"Q4 2026",period4Desc:"Preparation",period4KPI:"",period5Title:"Q1 2027",period5Desc:"Ecosystem",period5KPI:"",period6Title:"Q2 2027",period6Desc:"Marketing",period6KPI:"",period7Title:"Q3 2027",period7Desc:"Growth",period7KPI:"",period8Title:"Q4 2027",period8Desc:"Social",period8KPI:"",period9Title:"2028+",period9Desc:"AI & FinTech",period9KPI:"",completed:"Completado",active:"Activo",upcoming:"Próximo",investmentsTitle:"Etapas de desarrollo",seedRound:"Seed",seriesA:"Series A",seriesB:"Series B",seriesC:"Series C",pricePerShare:"Price",minInvestment:"Minimum",soldOut:"Sold Out",activeRound:"Active",comingSoon:"Coming Soon",shares:"shares",investNow:"Invest Now",seedBackTitle:"Desarrollo del MVP de la aplicación",seedBackDesc:`• Adquisición de usuarios
• Negociaciones con restaurantes
• Contratación de gerentes por país
• KPI: 10.000 usuarios`,privateBackTitle:"Pruebas del MVP",privateBackDesc:`• Pruebas del MVP en ciudades clave de EE. UU. y Europa
• Alianzas con asociaciones de restaurantes y cadenas locales
• Mejora de los algoritmos de personalización y recomendaciones basadas en IA
• KPI: 100.000 usuarios, 500 restaurantes`,marketingBackTitle:"Integración con servicios de movilidad compartida",marketingBackDesc:`• Integración con servicios de movilidad compartida (Uber, Lyft, Bolt)
• Lanzamiento de la aplicación ChefNet con todas sus funcionalidades
• Ampliación del módulo fintech (pagos, cashback, Token ChefNet)
• Colaboraciones a gran escala con creadores y medios en EE. UU. y la UE
• KPI: 1 millón de usuarios, 5.000 restaurantes, 1 millón de dólares de beneficio`,publicBackTitle:"Expansión a Asia, América Latina y Oriente Medio",publicBackDesc:`• Escalado a una SuperApp global
• Lanzamiento de una comunidad DAO y programas NFT para restaurantes
• Preparación para una salida a bolsa con una valoración de 3.000 a 5.000 millones de dólares
• KPI: 30 millones de usuarios, 50.000 restaurantes, más de 100 millones de dólares de beneficio`,ctaBannerTitle:"El futuro de los restaurantes comienza aquí.",ctaBannerHighlight:"Únete a ",ctaBannerHighlightBrand:"ChefNet",ctaBannerSuffix:".",faqTitle:"Preguntas frecuentes",faqSubtitle:"Questions",faq1Question:"¿Qué es ChefNet y qué problema resuelve esta iniciativa?",faq1Answer:`ChefNet es una plataforma global de FoodTech que unifica el descubrimiento, reservas, pagos y engagement con restaurantes y chefs privados.

Aborda la fragmentación del ecosistema de servicios de alimentación mediante el establecimiento de un único estándar integrado y sin fricciones.`,faq2Question:"¿Cuál es el modelo de negocio de ChefNet?",faq2Answer:`Operamos un modelo híbrido de Marketplace + SaaS + Fintech, diversificando ingresos a través de cuatro canales:

• **Comisiones por transacción:** Porcentaje aplicado a reservas, pedidos anticipados de comida y venta de entradas para eventos.

• **Suscripciones (SaaS B2B):** Tarifas mensuales que pagan los restaurantes por acceso a sistemas CRM, análisis impulsados por inteligencia artificial y herramientas de marketing.

• **Fintech (Pagos):** Comisiones por transacciones provenientes de pagos dentro de la aplicación y funciones de división de cuentas.

• **Publicidad:** Promoción pagada de restaurantes dentro de la aplicación, tanto en la sección de descubrimiento como en los resultados de búsqueda.`,faq3Question:"¿En qué fase de desarrollo se encuentra actualmente el proyecto?",faq3Answer:"El proyecto ha cerrado con éxito su ronda pre-semilla. Actualmente nos encontramos en una fase activa de captación de fondos para financiar el desarrollo y lanzamiento del Producto Mínimo Viable (MVP).",faq4Question:"¿En qué registro mercantil está inscrita la empresa y cuál es su forma jurídica?",faq4Answer:"ChefNet LLC está registrada en el estado de Delaware, EE.UU. — la jurisdicción líder de Estados Unidos para inversiones internacionales.",faq5Question:"¿Estructura de la ronda de financiación y condiciones de participación?",faq5Answer:`Para ejecutar la estrategia global de ChefNet, hemos planificado un proceso de captación de fondos escalonado con un objetivo total de 2.000.000 USD. La financiación se estructura en cuatro rondas clave (tramos). Este enfoque permite a los inversores mitigar riesgos, mientras que la empresa incrementa su valoración en cada etapa sucesiva.

Enfoque actual: 1. Ronda (Pre-Seed).
Desglose de Captación de Fondos

🟢 1. Ronda: Desarrollo MVP (Pre-Seed)
Monto: 150.000 USD
Objetivo: Construir la base técnica del producto.
Uso de fondos: Arquitectura de aplicación, diseño UI/UX, desarrollo backend y lanzamiento de la primera versión funcional (MVP) para iOS y Android.
Resultado: Un producto listo para producción disponible para usuarios tempranos.

🟡 2. Ronda: Ajuste de Mercado y Validación (Seed 1)
Monto: 350.000 USD
Objetivo: Validar hipótesis clave en el mercado real y generar métricas iniciales.
Uso de fondos: Lanzamiento suave, incorporación de los primeros 50 socios restaurantes, esfuerzos iniciales de marketing y gastos operativos del equipo central.
Resultado: Ajuste probado producto-mercado, primeras transacciones y usuarios activos.

🔵 3. Ronda: Ecosistema e Integraciones (Seed 2 / Puente)
Monto: 500.000 USD
Objetivo: Evolucionar la app a una plataforma completa.
Uso de fondos: Integraciones técnicas con servicios de movilidad, sistemas POS de restaurantes y desarrollo avanzado de algoritmos de personalización con IA.
Resultado: Una plataforma totalmente funcional lista para soportar adopción masiva.

🟣 4. Ronda: Lanzamiento y Escalada (Crecimiento)
Monto: 1.000.000 USD
Objetivo: Penetración agresiva en el mercado y monetización.
Uso de fondos: Campañas de marketing a gran escala (influencers, marketing de rendimiento), lanzamiento del módulo fintech y expansión a nuevas regiones (EE.UU. y Europa).
Resultado: Crecimiento de la base de usuarios a niveles KPI (cientos de miles de usuarios) y logro de ingresos recurrentes estables.

Actualización de Estado: Actualmente estamos abiertos a propuestas para la 1. Ronda (150.000 USD) para iniciar el desarrollo del MVP.`,faq6Question:"¿Qué garantías se ofrecen a los inversores?",faq6Answer:`Construimos relaciones con inversores basadas en los principios de transparencia absoluta y cumplimiento de estándares legales reconocidos internacionalmente.

Su inversión está protegida por los siguientes mecanismos:

**1. Protección Jurídica (Derecho de EE.UU.)**

La empresa está estructurada bajo jurisdicción estadounidense como una Delaware C-Corporation — el estándar oro para inversiones de capital riesgo. Los derechos de los inversores, incluyendo propiedad accionarial y derechos bajo instrumentos convertibles (SAFE), están protegidos por la ley estadounidense. Todos los acuerdos se formalizan mediante contratos legalmente vinculantes.

**2. Propiedad Intelectual (Titularidad de IP)**

Toda la tecnología, código fuente, activos de marca y base de clientes son propiedad legal de la empresa, no de fundadores individuales o colaboradores. Esto garantiza que el activo central en el que invierte esté plenamente protegido dentro de la estructura corporativa.

**3. Transparencia e Informes**

Los inversores reciben actualizaciones periódicas sobre el desempeño de la empresa, incluyendo estados financieros (Cuenta de Resultados), métricas de producto, estado de la hoja de ruta de desarrollo y uso de fondos. Siempre tendrá visibilidad clara sobre cómo se despliega su capital.

**4. Incentivos para Fundadores (Vesting)**

Las participaciones de los fundadores están sujetas a un cronograma de vesting estándar. Esto alinea los intereses de los fundadores con el éxito a largo plazo de la empresa y previene salidas anticipadas mientras se mantiene la propiedad en etapas tempranas.`,faq7Question:"¿Qué nivel de rentabilidad potencial puede esperarse?",faq7Answer:`Invertir en ChefNet en fase temprana (Pre-Seed/Seed) significa obtener exposición al crecimiento exponencial de la valoración de la empresa. Nuestro objetivo va más allá del beneficio operativo: nos enfocamos en escalar el valor empresarial.

El potencial de retorno está impulsado por tres factores clave:

**1. Crecimiento de la Valoración Empresarial (potencial de multiplicación X)**

En la fase actual, los inversores adquieren participación a la valoración más baja. Con cada ronda posterior – impulsada por integraciones de producto y escalabilidad global – la valoración de la empresa aumenta.

Objetivo: incremento de 10–20x en el valor de la empresa para la ronda Serie A/B o una adquisición estratégica.

**2. Crecimiento Proyectado de Ingresos**

Según nuestro modelo financiero, para 2028 – tras la expansión global y la integración completa de fintech – proyectamos Ingresos Recurrentes Anuales (ARR) superiores a los 100 M USD. Esto sustenta una sólida rentabilidad de activos y valor a largo plazo.

**3. Estrategia de Salida**

Los retornos para inversores se materializan principalmente en la salida. Consideramos dos escenarios de liquidez para inversores tempranos dentro de un horizonte de 3–5 años:

• **Fusiones y Adquisiciones (M&A):** Venta de la empresa a un gran actor del sector (p. ej., Uber, DoorDash, Booking o ecosistemas fintech-bancarios).

• **Mercado Secundario:** Posibilidad de vender participación a nuevos inversores en rondas de financiación posteriores con una prima significativa.`,faq8Question:"¿Cuándo está prevista la salida a bolsa?",faq8Answer:`Consideramos una salida a bolsa (IPO) como uno de los posibles escenarios de desarrollo a largo plazo, con un horizonte proyectado de aproximadamente 5–7 años.

Sin embargo, nuestro objetivo primordial es maximizar la valoración de la empresa y garantizar liquidez para los inversores. En consecuencia, estamos desarrollando el negocio con dos estrategias de salida en mente:

**Fusiones y Adquisiciones (Adquisición Estratégica):**

La venta de la empresa a un actor estratégico global (por ejemplo, ecosistemas como Uber, Booking, DoorDash o grandes grupos fintech) dentro de un horizonte de 3–5 años. Este es el escenario más probable para una salida rápida, ofreciendo un alto retorno de la inversión con un múltiplo de valoración atractivo.

**IPO (Oferta Pública):**

Una cotización en bolsa al alcanzar una valoración superior a $1.000 millones y lograr ingresos internacionales estables, permitiendo la creación de una empresa independiente de escala global.`,faq9Question:"¿Qué tecnologías utiliza ChefNet?",faq9Answer:`ChefNet se basa en una arquitectura moderna de microservicios nativos en la nube, garantizando flexibilidad, transacciones financieras seguras y una rápida implementación de funciones impulsadas por inteligencia artificial.

Nuestro stack tecnológico:

**1. Móvil y Frontend (Multiplataforma)**

Utilizamos Flutter o React Native.

**Razón:**

Permite una única base de código para iOS y Android, acelerando el desarrollo hasta un 40% y reduciendo costos de mantenimiento, manteniendo alto rendimiento y una experiencia de usuario nativa auténtica.

**2. Backend y API (Lado del servidor)**

Lenguajes principales: Python (FastAPI / Django) o Node.js.

**Razón:**

Python es ideal para integración de IA y procesamiento de datos. Una arquitectura de microservicios nos permite añadir nuevas verticales—como módulos fintech o gestión de eventos—sin reingeniería completa de la plataforma.

**3. Inteligencia Artificial (IA y Datos)**

**Integración de LLM:**

Conexión con modelos líderes de lenguaje (OpenAI GPT-4 / Anthropic) para alimentar el concierge de IA.

**Motor de Recomendación:**

Algoritmos propietarios de machine learning que personalizan el descubrimiento de restaurantes según el comportamiento del usuario e historial de pedidos.

**4. Fintech y Seguridad**

**Pagos:**

Integración mediante Stripe Connect o Adyen, estándar del sector para marketplaces.

**Seguridad:**

Cumplimiento total con PCI DSS para protección de datos de pagos y cifrado SSL/TLS de extremo a extremo para todos los datos transmitidos.

**5. Infraestructura**

**Nube:**

Alojamiento en AWS (Amazon Web Services) o Google Cloud.

**Escalabilidad:**

Uso de Docker y Kubernetes para habilitar escalado automático durante picos de tráfico.`,faq10Question:"¿Qué ventajas diferenciales posicionan a ChefNet frente a competidores como Yelp, OpenTable y Grubhub?",faq10Answer:`ChefNet integra todo el viaje del comensal: desde la primera idea hasta pagar la cuenta. Plataformas actuales resuelven problemas aislados: Yelp es un directorio, OpenTable gestiona reservas, Grubhub entrega comida. ChefNet elimina fricciones en toda la experiencia – desde el «¿dónde comemos?» hasta el pago – cerrando brechas en la usabilidad.

**Cinco ventajas clave:**

**1. Conserje con IA vs. búsquedas con filtros (vs. Yelp/TripAdvisor)**

**Ellos:** Horas navegando reseñas y ajustando filtros.

**Nosotros:** Hiperpersonalización. La IA entiende gustos, presupuesto e historial – sugiere el lugar ideal en segundos, como un consejo de un amigo foodie.

**2. Fintech integrado: pago y división de cuentas (vs. OpenTable)**

**Ellos:** La app solo sirve para reservar; al final, se espera al camarero y se pelea por la cuenta.

**Nosotros:** Pago en mesa. Flujo completo: reservar → pedir → pagar → dividir en un toque. Mayor rotación de mesas sin esperas.

**3. Experiencia social (vs. Grubhub/Uber Eats)**

**Ellos:** Consumo solitario centrado en entregas.

**Nosotros:** Comer conectados. Planificación colectiva: votar restaurantes, comprar entradas para eventos, invitar amigos – recuperamos la esencia social de la gastronomía.

**4. Modelo de ingresos justo para restaurantes**

**Ellos:** Comisiones abusivas (hasta 30% en entregas), cobros por cada cliente referido.

**Nosotros:** SaaS + Fintech. Herramientas de CRM/analytics por suscripción; márgenes de transacciones financieras – sin exprimir a los socios.

**5. Red social culinaria con reseñas en vivo (vs. TripAdvisor)**

**Ellos:** Reseñas genéricas escritas por bots; fotos editadas que distorsionan la realidad.

**Nosotros:** Autenticidad en video. Perfiles con Stories/Reels que muestran ambiente real y platos sin filtros. Feeds de recomendaciones de contactos o influencers convierten la búsqueda en entretenimiento.`,contactTitle:"Questions?",contactSubtitle:"Here to help",contactButton:"Contact",footerTagline:"Tu guía en el mundo de la innovación gastronómica",footerContacts:"Contacto",footerEmail:"support@chefnet.ai",footerPhone:"+1 (917) 332-8053",footerAddress:`ChefNet LLC
The Green STE B
Dover, DE 19901`,footerNewsletter:"Noticias",footerNewsletterDesc:"Manténgase al día con las últimas noticias y ofertas exclusivas.",footerNewsletterPlaceholder:"Email",footerNewsletterButton:"Suscribirse",footerPrivacyPolicy:"Política de privacidad",footerCopyright:"© 2026 ChefNet LLC. Todos los derechos reservados.",partnersOpportunitiesTitle:"Opportunities",opportunityCard1Title:"Dashboard",opportunityCard1Desc:"Track shares",opportunityCard2Title:"AI Companion",opportunityCard2Desc:"Publishes news",opportunityCard3Title:"Referral",opportunityCard3Desc:"Increase stake",opportunityCard4Title:"Extended",opportunityCard4Desc:"Additional opportunities",opportunityCard5Title:"Fundraising",opportunityCard5Desc:"Early rounds",opportunityCard6Title:"Legal",opportunityCard6Desc:"Delaware, USA",partnersTitle:"Oportunidades para socios",partner1Title:"Conviértase en copropietario de la empresa",partner1Desc:"Únase en la etapa fundacional para que sus participaciones en ChefNet se conviertan en acciones de la empresa al salir a bolsa.",partner2Title:"Programa de socios",partner2Desc:"Un modelo clásico que te permite aumentar tu participación invitando a nuevos socios durante la fase de Oportunidad en fases iniciales. Más participación — más acciones. Todo es transparente y sencillo.",partner3Title:"Rondas de financiación",partner3Desc:"Con cada etapa de crecimiento de ChefNet, el valor de tus participaciones aumenta.",partner4Title:"Panel del socio",partner4Desc:"Seguimiento de las participaciones compradas y obtenidas en el marco del Programa de Socios.",partner5Title:"El compañero de IA",partner5Desc:"publica noticias de la empresa y tendencias globales en la industria restaurantera, responde a tus preguntas y ejecuta tus solicitudes.",partner6Title:"Programa de referidos ampliado",partner6Desc:"Tras el lanzamiento de la aplicación, dispondrá de nuevas oportunidades para monetizar su red existente, además de recibir recompensas por referir nuevos usuarios y restaurantes, y por su aporte al desarrollo del ecosistema.",partner7Title:"Rondas de financiación",partner7Desc:"Participar en rondas iniciales de financiación ofrece mayores oportunidades de adquirir participación a los precios más favorables y de recibir más acciones tras la salida a bolsa de la empresa.",partner8Title:"Marco legal sólido",partner8Desc:"El registro de la empresa en EE. UU., estado de Delaware, demuestra seriedad de intención y garantiza una transparencia legal y financiera conforme a los estándares estadounidenses.",whyChefNetTitle:"¿Por qué ChefNet?",whyCard1Title:"ChefNet — un ecosistema de nueva generación",whyCard1Desc:"Conectamos usuarios y empresas mediante inteligencia artificial, haciendo que la gastronomía sea inteligente y fluida.",whyCard2Title:"Una red social gastronómica",whyCard2Desc:`Contenido de usuarios y chefs: fotos, videos, reseñas y recetas.
Transmisiones en directo y clases magistrales de los mejores chefs del mundo.`,whyCard3Title:"Plataforma ChefNet",whyCard3Desc:"Una plataforma donde la pasión por la gastronomía se encuentra con la tecnología.",whyCard4Title:"Tecnología que trabaja para los restaurantes",whyCard4Line1:"Las interfaces inteligentes aumentan el ticket promedio.",whyCard4Line2:"La IA reduce costos y mejora la precisión de las previsiones.",whyCard4Line3:"ChefNet ayuda a los restaurantes a ganar más — sin esfuerzo.",whyCard5Title:"Apoyar a los restaurantes está en el corazón de la misión de ChefNet",whyCard5Line1:"Proporcionamos acceso a recursos para conseguir financiación para renovaciones, mejoras o nuevas lanzamientos, y brindar apoyo de marketing para que las personas adecuadas descubran tu establecimiento.",whyCard5Line2:"ChefNet es el servicio que ayuda a los restaurantes no solo a funcionar, sino a crecer y prosperar.",whyCard6Title:"Personalización con tu compañero de IA",whyCard6Line1:`Recomendaciones precisas según tu gusto, estado de ánimo y contexto.
Reserva instantánea y ruta lista para ir.`,whyCard6Line2:"Menús dinámicos, escenarios por voz y sugerencias adaptativas: todo ello hace que tu elección sea verdaderamente sencilla."},tr:{features:"Avantajlar",aboutUs:"Fırsatlar",forPartners:"Ortaklar için",referralProgramme:"Gelişim aşamaları",stagesOfDevelopment:"Gelişim aşamaları",whyChefNet:"Neden ChefNet?",roadmap:"Yol Haritası",faq:"FAQ",team:"Ekip",contacts:"İletişim",logIn:"Giriş yap",signIn:"Kayıt ol",heroTitle1:"Seçimi değere çeviren",heroTitle2:"zekâ.",heroTitle3:"Seçimi",heroTitle4:"değere çeviren zekâ.",heroSubtitle:"ChefNet, ritminizi öğrenen, tercihinizi hatırlayan",heroDescription:"ve size her gün zaman ile para kazandıran yapay zekâ tabanlı bir teknolojidir.",heroBenefit1:"Restoranlar yeni misafirler edinir.",heroBenefit2:"Misafirler — kişiselleştirilmiş ve isabetli öneriler alır.",heroBenefit3:"Ortaklar şeffaf büyüme ve dinamik bir pazar fırsatı elde eder.",heroCta:"Bu harekete katılmak için doğru zaman geldi.",getStarted:"Get Started",opportunitiesTitle:"Opportunities",opportunity1Title:"ChefNet",opportunity1Desc:"Your chance",opportunity2Title:"ChefNet",opportunity2Desc:"Our turn",opportunity3Title:"ChefNet",opportunity3Desc:"Revolution",believeTitle:"Bizim için önemli olanlar",believeSubtitle:"Basitlik, tek bir dokunuşta. ChefNet tarzında kesinlik.",believeDesc1:`Bir yer seçmeyi, takside sipariş vermek kadar kolaylaştıran bir hizmet geliştiriyoruz.
Amacımız milyonlarca insanın zamanını kazanmasını sağlamak ve onlara en iyi deneyimi sunmaktır.`,believeDesc2:`En gelişmiş teknoloji insana hizmet ediyor: hızlı, doğru ve gereksiz adımlar olmadan.
ChefNet, en çok reklamı yapılan değil, gerçekten en iyi mekanları ortaya çıkarıyor —
samimi, özgün ve Gerçek ve doğrulanmış yorumlar sayesinde.`,believeDesc3:"",chefnetAppTitle1:"ChefNet ",chefnetAppTitle2:"Invest",chefnetAppTitle3:" ile fırsatlar",chefnetAppOpportunity1Title:"ChefNet",chefnetAppOpportunity1Subtitle:" — yeni bir trende giriş kapınız.",chefnetAppOpportunity1Desc:"ChefNet Invest – bugün piyasada benzeri olmayan küresel bir trendin ve teknoloji devinin doğuşuna ortak olma fırsatıdır.",chefnetAppOpportunity1DescPart1:"ChefNet ",chefnetAppOpportunity1DescPart2:"Invest",chefnetAppOpportunity1DescPart3:" – bugün piyasada benzeri olmayan küresel bir trendin ve teknoloji devinin doğuşuna ortak olma fırsatıdır.",chefnetAppOpportunity2Title:"ChefNet",chefnetAppOpportunity2Subtitle:" — Şimdi sıra bizde.",chefnetAppOpportunity2Desc:"Booking, Uber, Airbnb ve Amazon da bir zamanlar yoktu. Bugün onları tüm dünya tanıyor. Bu listedeki bir sonraki isim - ChefNet!!!",chefnetAppOpportunity2DescPart1:"Booking, Uber, Airbnb ve Amazon da bir zamanlar yoktu. Bugün onları tüm dünya tanıyor. Bu listedeki bir sonraki isim - ",chefnetAppOpportunity2DescPart2:"ChefNet",chefnetAppOpportunity2DescPart3:"!!!",chefnetAppOpportunity3Title:"ChefNet",chefnetAppOpportunity3Subtitle:" — FoodTech'te yeni standart.",chefnetAppOpportunity3Desc:"ChefNet, yemek uygulamaları dünyasında bir devrimdir — zamanı gelmiş bir fikirdir.",chefnetAppOpportunity3DescPart1:"",chefnetAppOpportunity3DescPart2:"ChefNet",chefnetAppOpportunity3DescPart3:", yemek uygulamaları dünyasında bir devrimdir — zamanı gelmiş bir fikirdir.",uniqueFeaturesTitle:"benzersiz Özellikleri",uniqueFeaturesChefNet:"ChefNet",feature1Title:"Kişisel Yapay Zekâ Arkadaşınız",feature1Desc:"Süper-Intellekt teknolojisiyle çalışır: Damak zevkinizi anlar, en iyi seçenekleri sunar ve sizi seçimden ödemeye kadar her adımda sorunsuzca yönlendirir. Yapay zekâ arkadaşınız sizin neyi sevdiğinizi bilir, masanızı önceden ayırtır ve size her gün zaman kazandırır.",feature2Title:"Sezgisel arama",feature2Desc:"Restoran, yemek ve mutfak türlerinde arama – hızlı ve kesin. Akıllı filtreli interaktif harita: mutfak türü, puan, fiyat. Sonuçlar her zaman güncel – gerçek zamanlı.",feature3Title:"Kullanım esnekliği",feature3Desc:"Sistem iki modda çalışıyor: Görseller üzerinden seçim yapma ya da yapay zekâ yardımcınız aracılığıyla sesli komutlar. Siz seçin – gerisini zekâ halleder.",feature4Title:"Netlik ve detaylar",feature4Desc:"Malzeme ve kalori bilgileriyle fotoğraf ve video formatında etkileşimli menü. Yemeğinizi önceden sipariş edin ve restorana girdiğiniz anda hazır olsun – acele ettiğinizde mükemmel bir çözüm.",feature5Title:"Benzersiz müşteri değerlendirme sistemi",feature5Desc:"ChefNet, yorum kavramını yeniden tanımlıyor: sadece ⭐ puanlar değil, samimi duygular. Sesli ve video geri bildirımler, incelemeleri kişiselleştiriyor; yemek, hizmet ve atmosfer için ayrı puanlar ise onları gerçekten güvenilir kılıyor.",feature6Title:"Aktivite Karşılığı Kazanç",feature6Desc:"Sadece puan değil, aktiviteniz karşılığında gerçek para kazanın.",feature7Title:"Her şey tek uygulamada",feature7Desc:"Kahve dükkanlarından ve barlardan premium restoranlara ve özel şeflere kadar tek bir küresel platform.",feature8Title:"Yemek deneyiminizi basit ve kesintisiz hale getiren bir yapay zekâ yardımcısı",feature8Desc:"Yapay zekâ arkadaşınız size en uygun mekanı bulur, masayı rezerve eder, rotanızı çizer ve gitme vaktinizde sizi uyarır. Arkadaşlarınızla mı gidiyorsunuz? Hepsini davet eder ve onlarla bireysel olarak iletişime geçer.",feature9Title:"Restoran Desteği ve Gelişimi",feature9Desc:"ChefNet, işletmelerin büyüme journey'ini destekler — ilk fikirlerden tam ölçekli genişlemeye kadar. Yapay zekâ, performans metriklerini analiz eder ve uygulanabilir optimizasyon stratejileri sunar. Özel yatırımcılardan ve mutfak sektörüne odaklı fonlardan finansman imkânı; ayrıca ChefNet topluluğunun desteklediği yatırım programlarına katılım fırsatı.",advantagesTitle:"Advantages",advantagesSubtitle:"Why invest",advantage1Title:"Innovation",advantage1Desc:"Advanced",advantage2Title:"Growth",advantage2Desc:"Rapid",advantage3Title:"Team",advantage3Desc:"Expert",advantage4Title:"Returns",advantage4Desc:"High",competitiveTitle:"Advantage",traditional:"Traditional",competitors:"Competitors",chefnet:"ChefNet",avgReturn:"Returns",partnershipTitle:"Partnership",partnershipSubtitle:"Rewards",partnershipCard1Title:"Partner",partnershipCard1Desc:"Become partner",partnershipCard2Title:"Program",partnershipCard2Desc1:"Classic model",partnershipCard2Desc2:"More shares",partnershipCard3Title:"Rounds",partnershipCard3Desc:"Value grows",you:"You",startNetwork:"Start network",level:"Level",level1Reward:"5%",level1Desc:"5% reward",level2Reward:"2%",level2Desc:"2% reward",level3Reward:"1%",level3Desc:"1% reward",howItWorks:"How it works",step1Title:"Share",step1Desc:"Unique link",step2Title:"Friends invest",step2Desc:"Earn commission",step3Title:"Grow",step3Desc:"Build network",roadmapTitle:"Yol Haritası",roadmapSubtitle:"Girişimden sektör liderine yolculuğumuzu takip edin",period1Title:"Q1 2026",period1Desc:"MVP",period1KPI:"",period2Title:"Q2 2026",period2Desc:"Launch",period2KPI:"",period3Title:"Q3 2026",period3Desc:"Product",period3KPI:"",period4Title:"Q4 2026",period4Desc:"Preparation",period4KPI:"",period5Title:"Q1 2027",period5Desc:"Ecosystem",period5KPI:"",period6Title:"Q2 2027",period6Desc:"Marketing",period6KPI:"",period7Title:"Q3 2027",period7Desc:"Growth",period7KPI:"",period8Title:"Q4 2027",period8Desc:"Social",period8KPI:"",period9Title:"2028+",period9Desc:"AI & FinTech",period9KPI:"",completed:"Tamamlandı",active:"Aktif",upcoming:"Yakında",investmentsTitle:"Gelişim Aşamaları",seedRound:"Seed",seriesA:"Series A",seriesB:"Series B",seriesC:"Series C",pricePerShare:"Price",minInvestment:"Minimum",soldOut:"Sold Out",activeRound:"Active",comingSoon:"Coming Soon",shares:"shares",investNow:"Invest Now",seedBackTitle:"Uygulama MVP'sinin geliştirilmesi",seedBackDesc:`Kullanıcı edinimi
Restoranlarla görüşmeler
Ülke müdürlerinin işe alınması
KPI: 10.000 kullanıcı`,privateBackTitle:"ABD ve Avrupa'daki kilit şehirlerde MVP testleri",privateBackDesc:`Restoran dernekleri ve yerel zincirlerle ortaklıklar
Kişiselleştirme algoritmalarını ve yapay zekâ önerilerinin iyileştirilmesi
KPI: 100.000 kullanıcı, 500 restoran`,marketingBackTitle:"Sürüş paylaşımı hizmetleriyle entegrasyon",marketingBackDesc:`Sürüş paylaşımı hizmetleriyle entegrasyon (Uber, Lyft, Bolt)
Tüm özellikleriye ChefNet uygulamasının piyasaya sürülmesi
Fintech modülünün genişletilmesi (ödemeler, nakit iade, ChefNet Token)
ABD ve AB'de içerik üreticileri ve medya ile büyük çaplı iş birlikleri
KPI: 1 milyon kullanıcı, 5.000 restoran, 1 milyon dolar kâr`,publicBackTitle:"Hedef: Asya, Latin Amerika ve Orta Doğu pazarlarına açılma",publicBackDesc:`Küresel bir Süper Uygulama'ya dönüşme
Restoranlar için bir DAO topluluğu ve NFT programlarının başlatılması
Halka arz için 3–5 milyar dolar değerleme ile hazırlık
KPI: 30 milyon kullanıcı, 50.000 restoran, 100 milyon doların üzerinde kâr`,ctaBannerTitle:"Restoranların geleceği burada başlıyor.",ctaBannerHighlight:"",ctaBannerHighlightBrand:"ChefNet",ctaBannerSuffix:"'e katılın.",faqTitle:"Sıkça Sorulan Sorular",faqSubtitle:"Questions",faq1Question:"ChefNet nedir ve bu proje hangi sorunları çözüyor?",faq1Answer:`ChefNet, restoranlar ve özel şefler ile keşfetme, rezervasyon, ödeme ve etkileşimi birleştiren küresel bir FoodTech platformudur.

Gıda hizmetleri ekosisteminin parçalanmış yapısını, tek ve kesintisiz bir standart oluşturarak çözüme kavuşturur.`,faq2Question:"ChefNet'in iş modeli nasıl işliyor?",faq2Answer:`Hibrit bir Pazar Yeri + SaaS + Fintech modeliyle çalışıyoruz; gelir akışlarımızı dört farklı kanaldan çeşitlendiriyoruz:

• İşlem Ücretleri: Rezervasyonlar, yemek ön siparişleri ve etkinlik bilet satışlarından alınan yüzde payı.

• Abonelikler (B2B SaaS): Restaurantların CRM sistemlerine, yapay zekâ destekli analizlere ve pazarlama araçlarına erişim karşılığında ödediği aylık ücretler.

• Fintech (Ödemeler): Uygulama içi ödemelerden ve hesap bölme özelliklerinden elde edilen işlem ücretleri.

• Reklam: Uygulama içindeki keşfetme ve arama sonuçlarında restaurantların ücretli tanıtımı.`,faq3Question:"Proje şu anda hangi geliştirme aşamasındadır?",faq3Answer:"Proje, ön sermaye turunu başarıyla tamamladı. Şu anda MVP'nin (Minimum Uygulanabilir Ürün) geliştirilmesi ve piyasaya sürülmesini finanse etmek amacıyla aktif bir fon toplama aşamasındayız.",faq4Question:"Şirket hangi yargı alanında tescil edilmiştir ve hukuki organizasyonu (kurumsal yapısı) nedir?",faq4Answer:"ChefNet LLC, uluslararası yatırımlar açısından ABD'nin en önemli hukuki yargı alanına sahip olan Delaware eyaletinde resmi olarak kayıtlıdır.",faq5Question:"Yatırım turu yapısı ve katılım koşulları?",faq5Answer:`ChefNet'in küresel stratejisini hayata geçirmek için toplam hedefi 2.000.000 USD olan adım adım bir fon toplama süreci planladık. Finansman dört temel turda (tranche) yapılandırılmıştır. Bu yaklaşım, yatırımcıların riski minimize etmesine olanak tanırken, şirketin her aşamada değerlemesini artırmasını sağlar.

Mevcut odak: 1. Tur (Pre-Seed).
Fon Dağılımı

🟢 1. Tur: MVP Geliştirme (Pre-Seed)
Tutar: 150.000 USD
Amaç: Ürünün teknik altyapısını oluşturmak.
Kullanım: Uygulama mimarisi, UI/UX tasarımı, arka uç geliştirme ve iOS ile Android için ilk fonksiyonel sürümün (MVP) yayınlanması.
Sonuç: Erken kullanıcılar için kullanıma hazır, üretim kalitesinde bir ürün.

🟡 2. Tur: Piyasa Uyumu ve Doğrulama (Seed 1)
Tutar: 350.000 USD
Amaç: Temel hipotezlerin canlı piyasada doğrulanması ve ilk metriklerin üretilmesi.
Kullanım: Yatışık başlatım, ilk 50 restoran ortağının entegrasyonu, başlangıç pazarlama faaliyetleri ve çekirdek ekibin operasyonel giderleri.
Sonuç: Kanıtlanmış ürün-piyasa uyumu, ilk işlemler ve aktif kullanıcılar.

🔵 3. Tur: Ekosistem ve Entegrasyonlar (Seed 2 / Köprü)
Tutar: 500.000 USD
Amaç: Uygulamayı tam ölçekli bir platforma dönüştürmek.
Kullanım: Sürüş hizmetleriyle teknik entegrasyonlar, restoran POS sistemleri ve yapay zeka destekli kişiselleştirme algoritmalarının ileri geliştirilmesi.
Sonuç: Kitlesel benimseme için hazır tam fonksiyonlu bir platform.

🟣 4. Tur: Lansman ve Ölçeklendirme (Büyüme)
Tutar: 1.000.000 USD
Amaç: Agresif pazar penetrasyonu ve gelir elde etme.
Kullanım: Çapraz pazarlama kampanyaları (influencer'lar, performans pazarlaması), fintech modülünün piyasaya sürülmesi ve yeni bölgelere (ABD ve Avrupa) açılma.
Sonuç: Kullanıcı kitlesinin KPI seviyelerine ulaşması (yüz binlerce kullanıcı) ve istikrarlı tekrarlayan gelir elde edilmesi.

Durum Güncellemesi: MVP geliştirme sürecini başlatmak üzere 1. Tur (150.000 USD) için tekliflere açığız.`,faq6Question:"Yatırımcılara hangi güvenceler sağlanmaktadır?",faq6Answer:`Yatırımcı ilişkilerimizi tam şeffaflık ilkesi ve uluslararası kabul görmüş hukuki standartlara uyum temelinde inşa ediyoruz.

Yatırımınız aşağıdaki mekanizmalarla korunmaktadır:

**1. Hukuki Koruma (ABD Hukuku)**

Şirket, ABD yargı alanında Delaware C-Corporation yapısıyla kurulmuştur – bu, sermaye yatırımları için uluslararası altın standarttır. Yatırımcı hakları (hisse sahipliği ve dönüştürülebilir enstrümanlar/SAFE kapsamındaki haklar dahil) ABD hukuku tarafından korunmaktadır. Tüm düzenlemeler hukuki olarak bağlayıcı sözleşmelerle resmileştirilir.

**2. Fikri Mülkiyet Sahipliği (IP Sahipliği)**

Tüm teknolojiler, kaynak kodlar, marka varlıkları ve müşteri tabanı yasal olarak şirketin malıdır – bireysel kurucular veya katkı sağlayanların değil. Bu, yatırımda bulunduğunuz temel varlığın kurumsal yapı içinde tamamen korunduğunu garanti eder.

**3. Şeffaflık ve Raporlama**

Yatırımcılar, finansal tablolar (Gelir Tablosu), ürün metrikleri, geliştirme yol haritası durumu ve fon kullanımına ilişkin periyodik performans raporları alır. Sermayenizin nasıl kullanıldığı konusunda her zaman net bir görünüme sahip olacaksınız.

**4. Kurucu Teşvikleri (Vesting)**

Kurucu hisseleri standart vesting takvimine tabidir. Bu, kurucuların çıkarlarını şirketin uzun vadeli başarısıyla uyumlu hale getirir ve erken aşamada sahiplik korunurken erken ayrılıkları engeller.`,faq7Question:"Beklenen potansiyel getiri seviyesi nedir?",faq7Answer:`ChefNet'e erken aşama (Pre-Seed/Seed) yatırım yapmak, şirket değerlemesindeki üstel büyümeye maruz kalma anlamına gelir. Hedefimiz faaliyet kârının ötesine geçer: kurumsal değerin ölçeklendirilmesine odaklanıyoruz.

Getiri potansiyeli üç temel faktörle şekillenir:

**1. Şirket Değerleme Büyümesi (X katı çarpan potansiyeli)**

Mevcut aşamada yatırımcılar, en düşük değerleme seviyesinden hisse alır. Ürün entegrasyonları ve küresel ölçeklendirmeyle desteklenen her sonraki turda şirket değerlemesi artar.

Hedef: Series A/B turuna veya stratejik bir satın almaya kadar şirket değerinin 10–20 kat artması.

**2. Öngörülen Gelir Büyümesi**

Finansal modelimize göre, 2028 yılına kadar — küresel pazar genişlemesi ve tam fintech entegrasyonu sonrasında — Yıllık Tekrarlanan Gelir'in (ARR) 100 milyon USD'yi aşmasını öngörüyoruz. Bu, güçlü varlık kârlılığını ve uzun vadeli değeri destekler.

**3. Çıkış Stratejisi**

Yatırımcı getirileri öncelikle çıkışta gerçekleşir. Erken dönem yatırımcılar için 3–5 yıllık bir zaman diliminde iki likidite senaryosu değerlendiriyoruz:

• **Birleşme ve Devirler (M&A):** Şirketin sektörün büyük oyuncularından birine (örn. Uber, DoorDash, Booking veya fintech-bankacılık ekosistemleri) satışı.

• **İkincil Piyasa:** Sonraki finansman turlarında hisseleri önemli bir primle yeni yatırımcılara satma imkanı.`,faq8Question:"Halka arz ne zaman planlanıyor?",faq8Answer:`Bir halka arzı (IPO), yaklaşık 5–7 yıllık bir öngörülen zaman dilimiyle olası uzun vadeli gelişim senaryolarından biri olarak görüyoruz.

Bununla birlikte, birincil hedefimiz şirket değerlemesini maksimize etmek ve yatırımcılar için likidite sağlamak. Bu doğrultuda, iş iki çıkış stratejisi göz önünde bulundurularak geliştirilmektedir:

**Birleşme & Devirler (Stratejik Satın Alma):**

Şirketin küresel bir stratejik oyuncuya (örneğin, Uber, Booking, DoorDash gibi ekosistemler veya büyük fintech grupları) 3–5 yıllık bir zaman diliminde satılması. Bu, cazip bir değerleme çarpanıyla yüksek getiri sunan hızlı çıkış için en olası senaryodur.

**IPO (Halka Arz):**

1 milyar USD'nin üzerinde değerlemeye ve istikrarlı uluslararası gelire ulaşıldığında halka arz, bağımsız, küresel ölçekli bir şirket yaratmayı mümkün kılar.`,faq9Question:"ChefNet hangi teknolojileri kullanmaktadır?",faq9Answer:`ChefNet, esneklik, güvenli finansal işlemler ve yapay zekâ destekli özelliklerin hızlı devreye alınmasını sağlayan modern bir bulut tabanlı mikroservis mimarisine dayanmaktadır.

Teknoloji altyapımız:

**1. Mobil & Frontend (Çapraz Platform)**

Flutter veya React Native kullanılmaktadır.

**Neden:**

Hem iOS hem Android için tek kod tabanı, geliştirme süreçlerini %40'a varan oranda hızlandırırken, bakım maliyetlerini düşürür ve yüksek performans ile gerçek yerel kullanıcı deneyimini korur.

**2. Backend & API (Sunucu Tarafı)**

Temel diller: Python (FastAPI / Django) veya Node.js.

**Neden:**

Python, yapay zekâ entegrasyonu ve veri işleme için idealdir. Mikroservis mimarisi, tüm platformu yeniden tasarlamaya gerek kalmadan fintech modülleri veya etkinlik yönetimi gibi yeni dikeylerin sorunsuzca eklenmesini sağlar.

**3. Yapay Zekâ (YZ & Veri)**

**Büyük Dil Modelleri Entegrasyonu:**

YZ konseyini güçlendirmek üzere lider büyük dil modelleriyle (OpenAI GPT-4 / Anthropic) entegrasyon.

**Öneri Motoru:**

Kullanıcı davranışları ve sipariş geçmişi temel alınarak restoran keşfini kişiselleştiren patentli makine öğrenmesi algoritmaları.

**4. Fintech & Güvenlik**

**Ödemeler:**

Stripe Connect veya Adyen aracılığıyla entegrasyon (pazar yerleri için sektör standardı).

**Güvenlik:**

Ödeme verilerinin korunması için PCI DSS uyumluluğu ve iletilen tüm verilerin uçtan uca SSL/TLS şifrelemesi.

**5. Altyapı**

**Bulut:**

AWS (Amazon Web Services) veya Google Cloud üzerinde barındırma.

**Ölçeklenebilirlik:**

Trafik yoğunluklarında otomatik ölçeklendirmeyi sağlayan Docker ve Kubernetes kullanımı.`,faq10Question:"ChefNet'i Yelp, OpenTable ve Grubhub gibi rakip platformlardan ayıran temel farklar nelerdir?",faq10Answer:`ChefNet, misafir yolculuğunu baştan sona birleştirir: ilk fikirden ödemeye kadar.

Mevcut platformlar tek sorun çözer: Yelp bir rehber, OpenTable rezervasyon aracı, Grubhub teslimatçıdır. ChefNet, «nereye gidelim?» anından ödemeye kadar tüm adımlarda sürtüşmeleri ortadan kaldırarak eksiksiz bir deneyim sunar.

Beş temel avantajımız:

**1. Filtre yerine Yapay Zeka Konserjesi (vs. Yelp/TripAdvisor)**

**Diğerleri:** Kullanıcılar saatlerce yorum okur, filtre ayarlar.

**Biz:** Aşırı kişiselleştirme. YA asistanı, ruh halinizi, bütçenizi ve geçmişinizi anlar – saniyelerde lezzet tutkunu bir arkadaş tavsiyesi gibi mükemmel mekanı gösterir.

**2. Sorunsuz ödeme çözümleri (vs. OpenTable)**

**Diğerleri:** Uygulama rezervasyonda biter; hesap için garson beklenir.

**Biz:** Masada Ödeme. Tümleşik akış: rezervasyon → sipariş → ödeme → tek dokunuşla böl. Restoranlar daha fazla konuk ağırlar.

**3. Sosyal yemek deneyimi (vs. Grubhub/Uber Eats)**

**Diğerleri:** Yalnızlık içinde teslimat odaklı tüketim.

**Biz:** Paylaşımlı mutluluk. Ortak planlama: restoran oylaması, gastronomi etkinlikleri için bilet alma, davet gönderme – yemeğin toplumsal boyutunu diriltiyoruz.

**4. Adil gelir modeli**

**Diğerleri:** Aşırı komisyonlar (%30'a varan teslimat payları), her ziyaret için ücret.

**Biz:** SaaS + FinTech. CRM/analytics araçları abonelikle; gelir temeli finansal işlemlerden – ortaklarımızı zorlamadan.

**5. Canlı içeriklerle güven (vs. TripAdvisor)**

**Diğerleri:** Botlar tarafından yazılan metinler; abartılı fotoğraflar.

**Biz:** Gerçeklik videoda. Profillerdeki kısa videolar (Stories/Reels) filtresiz atmosfer ve lezzetleri gösterir. Arkadaşlarınızı veya food blogcularını takip ederek keşfi eğlenceye dönüştürün.`,contactTitle:"Questions?",contactSubtitle:"Here to help",contactButton:"Contact",footerTagline:"Restoran yeniliklerinin dünyasında rehberiniz",footerContacts:"İletişim",footerEmail:"support@chefnet.ai",footerPhone:"+1 (917) 332-8053",footerAddress:`ChefNet LLC
The Green STE B
Dover, DE 19901`,footerNewsletter:"Haberler",footerNewsletterDesc:"En son haberler ve fırsatlardan haberdar olmak için takipte kalın.",footerNewsletterPlaceholder:"Email",footerNewsletterButton:"Abone Ol",footerPrivacyPolicy:"Gizlilik Politikası",footerCopyright:"© 2026 ChefNet LLC. Tüm hakları saklıdır.",partnersOpportunitiesTitle:"Opportunities",opportunityCard1Title:"Dashboard",opportunityCard1Desc:"Track shares",opportunityCard2Title:"AI Companion",opportunityCard2Desc:"Publishes news",opportunityCard3Title:"Referral",opportunityCard3Desc:"Increase stake",opportunityCard4Title:"Extended",opportunityCard4Desc:"Additional opportunities",opportunityCard5Title:"Fundraising",opportunityCard5Desc:"Early rounds",opportunityCard6Title:"Legal",opportunityCard6Desc:"Delaware, USA",partnersTitle:"Ortaklar İçin Fırsatlar",partner1Title:"Şirketin ortaklarından biri olun",partner1Desc:"Kuruluş aşamasında bize katılın, böylece ChefNet paylarınız halka arzda şirket hissesine dönüştürülsün.",partner2Title:"Ortaklık Programı",partner2Desc:"Yatırım toplama aşamasında yeni ortaklar davet ederek payınızı artırabileceğiniz klasik bir model. Ne kadar çok katkıda bulunursanız, o kadar büyük pay sahibi olursunuz. Tamamen şeffaf ve basit.",partner3Title:"Finansman Döngüleri",partner3Desc:"ChefNet'in her gelişim aşamasıyla birlikte paylarınızın değeri artar.",partner4Title:"Ortak Paneli",partner4Desc:"Ortaklık Programı kapsamında satın alınan ve kazanılan payların takibi.",partner5Title:"Yapay zekâ arkadaşınız,",partner5Desc:"şirket haberlerini ve restoran sektöründeki küresel trendleri yayınlar, sorularınızı yanıtlar ve isteklerinizi yerine getirir.",partner6Title:"Genişletilmiş Yönlendirme Programı",partner6Desc:"Uygulama yayınlandıktan sonra mevcut ağınızı monetize etme fırsatı elde edersiniz. Ayrıca yeni kullanıcılar ve restoranlar yönlendirerek ve ekosistemi geliştirerek ödüllendirilirsiniz.",partner7Title:"Yatırım toplama",partner7Desc:"Erken yatırım turlarına katılmak, en uygun fiyatlarla hisse edinme ve şirket halka arz olduktan sonra Detayları gör hisse alma fırsatı sunar.",partner8Title:"Sağlam ve sıkı bir yasal çerçeve",partner8Desc:"Şirketin ABD'nin Delaware eyaletinde kayıtlı olması, ciddi niyetleri kanıtlar ve Amerikan standartlarına uygun şeffaf hukuki ve finansal raporlamayı sağlar.",whyChefNetTitle:"Neden ChefNet?",whyCard1Title:"ChefNet — yeni nesil bir ekosistem",whyCard1Desc:"Yapay zekâ aracılığıyla kullanıcıları ve işletmeleri birleştiriyor, mutfak kültürünü akıllıca ve kolaylaştırıcı kılıyoruz.",whyCard2Title:"Bir Mutfak Sosyal Ağı",whyCard2Desc:`Kullanıcılardan ve şeflerden içerik: fotoğraf, video, yorumlar ve tarifler.
Dünyanın önde gelen şeflerinden canlı yayınlar ve mutfak dersleri.`,whyCard3Title:"ChefNet Platformu",whyCard3Desc:"Mutfak kültürüne olan tutkuunu teknolojiye buluştuğu bir platform.",whyCard4Title:"Restoranlar için çalışan teknoloji",whyCard4Line1:"Akıllı arayüzler ortalama müşteri harcamasını artırır.",whyCard4Line2:"Yapay zekâ maliyetleri düşürür ve tahminleri iyileştirir.",whyCard4Line3:"ChefNet, restoranların Detayları gör kazanmasına - çekeve değil - yardımcı olur.",whyCard5Title:"Restoranlara destek vermek, ChefNet'in misyonunun bir parçası",whyCard5Line1:"Yenileme, modernizasyon veya yeni açılışlar için finansman sağlamaya kadar, ayrıca doğru insanların mekanınızı keşfetmesini sağlamak için pazarlama desteği sunar.",whyCard5Line2:"ChefNet, restoranların sadece işlemesine değil, büyümelerine ve gelişmelerine do yardımcı olan bir hizmettir.",whyCard6Title:"Yapay zekâ arkadaşınızla kişiselleştirme",whyCard6Line1:`Damak zevkinize, ruh halinize ve durumunuza göre kesin öneriler.
Anında rezervasyon ve hazır rota.`,whyCard6Line2:"Dinamik menüler, sesli senaryolar ve uyarlanabilir öneriler — hepsi seçiminizi gerçekten kolay kılarsınız."}},Y=[{code:"ru",name:"Русский",flag:"RU"},{code:"en",name:"English",flag:"EN"},{code:"de",name:"Deutsch",flag:"DE"},{code:"tr",name:"Türkçe",flag:"TR"},{code:"es",name:"Español",flag:"ES"}];function $({variant:r="light"}){const[n,l]=i.useState(!1),{language:a,setLanguage:s}=B(),t=i.useRef(null),o=i.useRef(null),[d,f]=i.useState({top:0,left:0}),m=Y.find(c=>c.code===a)||Y[0];i.useEffect(()=>{if(!n||!t.current)return;const c=()=>{if(t.current){const u=t.current.getBoundingClientRect();f({top:u.bottom+8,left:u.right-200})}};return c(),window.addEventListener("scroll",c,!0),window.addEventListener("resize",c),()=>{window.removeEventListener("scroll",c,!0),window.removeEventListener("resize",c)}},[n]),i.useEffect(()=>{const c=u=>{t.current&&!t.current.contains(u.target)&&o.current&&!o.current.contains(u.target)&&l(!1)};return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[]);const p=c=>{s(c),l(!1)},y=r==="light"?"text-white hover:text-white/80":"text-gray-700 hover:text-gray-900";return e.jsxs(e.Fragment,{children:[e.jsxs("button",{ref:t,onClick:()=>l(!n),className:`flex items-center gap-2 transition-colors ${y}`,children:[e.jsx(Ne,{className:"w-4 h-4"}),e.jsx("span",{className:"text-[15px] font-medium",children:m.flag})]}),n&&Ce.createPortal(e.jsx(G,{children:e.jsx(k.div,{ref:o,initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.2},className:"fixed bg-white rounded-2xl shadow-xl overflow-hidden min-w-[200px]",style:{top:`${d.top}px`,left:`${d.left}px`,zIndex:99999},children:e.jsx("div",{className:"py-2",children:Y.map(c=>e.jsxs("button",{onClick:()=>p(c.code),className:`w-full px-5 py-3 flex items-center gap-3 hover:bg-background transition-colors ${a===c.code?"bg-background":""}`,children:[e.jsx("span",{className:"text-[#8B4537] text-sm font-medium w-8",children:c.flag}),e.jsx("span",{className:`text-[15px] ${a===c.code?"font-medium text-[#5A2F23]":"font-normal text-[#8B4537]"}`,children:c.name})]},c.code))})})}),document.body)]})}function We({onSuccess:r,onSwitchToRegister:n,onSwitchToReset:l}){const[a,s]=i.useState(""),[t,o]=i.useState(""),[d,f]=i.useState(""),[m,p]=i.useState(!1),[y,c]=i.useState(!1),[u,x]=i.useState(!1),[g,N]=i.useState(!1),[I,P]=i.useState(!1),{login:T,authError:E}=R(),{language:z}=B(),h={en:{email:"Email",password:"Password",loginButton:"Log in",noAccount:"Don't have an account?",signUp:"Sign up",errorInvalid:"Invalid email or password",errorFill:"Please fill in all fields",emailNotConfirmed:"Please confirm your email first. Check your inbox for the confirmation link.",rememberMe:"Remember me",forgotPassword:"Forgot password?",offerPrefix:"I have reviewed the",publicOffer:"public offer",googleSignIn:"Sign in with Google"},ru:{email:"Email",password:"Пароль",loginButton:"Войти",noAccount:"Нет аккаунта?",signUp:"Регистрация",errorInvalid:"Неверный email или пароль",errorFill:"Заполните все поля",emailNotConfirmed:"Сначала подтвердите ваш email. Проверьте входящие письма для перехода по ссылке подтверждения.",rememberMe:"Запомнить меня",forgotPassword:"Забыли пароль?",offerPrefix:"С",publicOffer:"публичной офертой",offerSuffix:"ознакомлен",googleSignIn:"Войти через Google"},de:{email:"E-Mail",password:"Passwort",loginButton:"Anmelden",noAccount:"Noch kein Konto?",signUp:"Registrieren",errorInvalid:"Ungültige E-Mail oder Passwort",errorFill:"Bitte füllen Sie alle Felder aus",emailNotConfirmed:"Bitte bestätigen Sie zuerst Ihre E-Mail. Überprüfen Sie Ihren Posteingang.",rememberMe:"Merken Sie sich mich",forgotPassword:"Passwort vergessen?",offerPrefix:"Ich habe das",publicOffer:"öffentliche Angebot",offerSuffix:"geprüft",googleSignIn:"Mit Google anmelden"},es:{email:"Email",password:"Contraseña",loginButton:"Iniciar sesión",noAccount:"¿No tienes cuenta?",signUp:"Registrarse",errorInvalid:"Email o contraseña inválidos",errorFill:"Por favor complete todos los campos",emailNotConfirmed:"Primero confirma tu email. Revisa tu bandeja de entrada.",rememberMe:"Recuérdame",forgotPassword:"¿Olvidaste tu contraseña?",offerPrefix:"He revisado la",publicOffer:"oferta pública",offerSuffix:"",googleSignIn:"Iniciar sesión con Google"},tr:{email:"E-mail",password:"Şifre",loginButton:"Giriş yap",noAccount:"Hesabınız yok mu?",signUp:"Kayıt ol",errorInvalid:"Geçersiz e-posta veya şifre",errorFill:"Lütfen tüm alanları doldurun",emailNotConfirmed:"Lütfen önce e-postanızı onaylayın. Gelen kutunuzu kontrol edin.",rememberMe:"Beni hatırlayın",forgotPassword:"Şifrenizi mi unuttunuz?",offerPrefix:"",publicOffer:"Halka açık teklifi",offerSuffix:"inceledim",googleSignIn:"Google ile giriş yap"}}[z],A=async v=>{if(v.preventDefault(),f(""),!a||!t){f(h.errorFill);return}if(!g){f(z==="ru"?"Необходимо согласиться с публичной офертой":z==="de"?"Sie müssen das öffentliche Angebot akzeptieren":z==="es"?"Debe aceptar la oferta pública":z==="tr"?"Kamu teklifini kabul etmelisiniz":"You must accept the public offer");return}p(!0);const w=await T(a,t,u);if(p(!1),w)P(!1),r();else{const C=E||"";C==="email_not_verified"||C.toLowerCase().includes("email not confirmed")||C.toLowerCase().includes("not confirmed")?(P(!0),f(h.emailNotConfirmed)):(P(!1),f(E||h.errorInvalid))}};return e.jsxs("form",{onSubmit:A,className:"space-y-5",children:[d&&e.jsxs(k.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:`px-4 py-3 rounded-xl flex items-start gap-2 ${I?"bg-amber-50 border border-amber-200 text-amber-800":"bg-red-50 border border-red-200 text-red-700"}`,children:[I?e.jsx(De,{className:"w-5 h-5 flex-shrink-0 mt-0.5"}):e.jsx(V,{className:"w-5 h-5 flex-shrink-0 mt-0.5"}),e.jsx("span",{className:"text-sm",children:d})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:h.email}),e.jsxs("div",{className:"relative",children:[e.jsx(ee,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:"email",value:a,onChange:v=>s(v.target.value),className:"w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all",placeholder:"you@example.com"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:h.password}),e.jsxs("div",{className:"relative",children:[e.jsx(_,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:y?"text":"password",value:t,onChange:v=>o(v.target.value),className:"w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all",placeholder:"••••••••"}),e.jsx("button",{type:"button",className:"absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",onClick:()=>c(!y),children:y?e.jsx(q,{}):e.jsx(U,{})})]})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",id:"remember-me",checked:u,onChange:v=>x(v.target.checked),className:"h-4 w-4 text-[#D4522A] focus:ring-[#D4522A] border-gray-300 rounded cursor-pointer"}),e.jsx("label",{htmlFor:"remember-me",className:"ml-2 text-sm text-gray-600 cursor-pointer",children:h.rememberMe})]}),e.jsx("button",{type:"button",onClick:l,className:"text-sm text-[#D4522A] hover:text-[#EF6852] font-medium transition-colors",children:h.forgotPassword})]}),e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("input",{type:"checkbox",id:"public-offer",checked:g,onChange:v=>N(v.target.checked),className:"h-4 w-4 text-[#D4522A] focus:ring-[#D4522A] border-gray-300 rounded cursor-pointer mt-0.5 flex-shrink-0"}),e.jsx("label",{htmlFor:"public-offer",className:"text-sm text-gray-600 cursor-pointer leading-tight",children:z==="ru"?e.jsxs(e.Fragment,{children:[h.offerPrefix," ",e.jsx("a",{href:"#",className:"text-[#D4522A] hover:text-[#EF6852] underline font-medium",children:h.publicOffer})," ",h.offerSuffix]}):z==="tr"?e.jsxs(e.Fragment,{children:[e.jsx("a",{href:"#",className:"text-[#D4522A] hover:text-[#EF6852] underline font-medium",children:h.publicOffer})," ",h.offerSuffix]}):e.jsxs(e.Fragment,{children:[h.offerPrefix," ",e.jsx("a",{href:"#",className:"text-[#D4522A] hover:text-[#EF6852] underline font-medium",children:h.publicOffer})," ",h.offerSuffix]})})]}),e.jsx(k.button,{type:"submit",disabled:m,whileHover:{scale:m?1:1.02},whileTap:{scale:m?1:.98},className:"w-full py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed",children:m?"...":h.loginButton}),e.jsxs("div",{className:"text-center pt-4",children:[e.jsxs("span",{className:"text-gray-600 text-sm",children:[h.noAccount," "]}),e.jsx("button",{type:"button",onClick:n,className:"text-[#D4522A] font-medium text-sm hover:underline",children:h.signUp})]})]})}function Qe({onSuccess:r,onSwitchToLogin:n}){const[l,a]=i.useState(""),[s,t]=i.useState(""),[o,d]=i.useState(""),[f,m]=i.useState(""),[p,y]=i.useState(""),[c,u]=i.useState(!1),[x,g]=i.useState(!1),[N,I]=i.useState(!1),[P,T]=i.useState(""),[E,z]=i.useState(!1),[b,h]=i.useState(!1),[A,v]=i.useState(!1),[w,C]=i.useState(!1),{register:O,resendConfirmationEmail:ae,authError:M}=R(),{language:W}=B(),S={en:{firstName:"Name",lastName:"Last name",email:"Email",password:"Password",confirmPassword:"Confirm password",registerButton:"Create account",haveAccount:"Already have an account?",logIn:"Log in",errorFill:"Please fill in all fields",errorPassword:"Passwords do not match",errorPasswordLength:"Password must be at least 8 characters and contain letters and numbers",errorExists:"This email is already registered",errorTerms:"You must agree to the terms and conditions",agreeText:"I agree to",termsOfService:"Terms & Conditions",and:" / ",privacyPolicy:"Privacy Policy",googleSignIn:"Sign in with Google",confirmTitle:"Check your email",confirmMessage:"We sent a confirmation link to",confirmHint:"Click the link in the email to activate your account. After confirmation, you can log in.",resendButton:"Resend email",resendSuccess:"Email sent!",backToLogin:"Go to login",checkSpam:"Check your spam folder if you don't see the email."},ru:{firstName:"Имя",lastName:"Фамилия",email:"Email",password:"Пароль",confirmPassword:"Подтвердите пароль",registerButton:"Создать аккаунт",haveAccount:"Уже есть аккаунт?",logIn:"Войти",errorFill:"Заполните все поля",errorPassword:"Пароли не совпадают",errorPasswordLength:"Пароль должен содержать минимум 8 символов, буквы и цифры",errorExists:"Этот email уже зарегистрирован",errorTerms:"Вы должны согласиться с условиями",agreeText:"Я согласен с",termsOfService:"Условиями использования",and:"и",privacyPolicy:"Политикой конфиденциальности",googleSignIn:"Войти через Google",confirmTitle:"Проверьте вашу почту",confirmMessage:"Мы отправили ссылку для подтверждения на",confirmHint:"Перейдите по ссылке в письме, чтобы активировать аккаунт. После подтверждения вы сможете войти.",resendButton:"Отправить повторно",resendSuccess:"Письмо отправлено!",backToLogin:"Перейти к входу",checkSpam:"Проверьте папку «Спам», если не видите письмо."},de:{firstName:"Name",lastName:"Nachname",email:"E-Mail",password:"Passwort",confirmPassword:"Passwort bestätigen",registerButton:"Konto erstellen",haveAccount:"Haben Sie bereits ein Konto?",logIn:"Anmelden",errorFill:"Bitte füllen Sie alle Felder aus",errorPassword:"Passwörter stimmen nicht überein",errorPasswordLength:"Passwort muss mindestens 8 Zeichen lang sein und Buchstaben und Zahlen enthalten",errorExists:"Diese E-Mail ist bereits registriert",errorTerms:"Sie müssen den Bedingungen zustimmen",agreeText:"Ich stimme den",termsOfService:"Nutzungsbedingungen",and:" / ",privacyPolicy:"Datenschutzbestimmungen zu",googleSignIn:"Mit Google anmelden",confirmTitle:"Prüfen Sie Ihre E-Mail",confirmMessage:"Wir haben einen Bestätigungslink gesendet an",confirmHint:"Klicken Sie auf den Link in der E-Mail, um Ihr Konto zu aktivieren. Nach der Bestätigung können Sie sich anmelden.",resendButton:"E-Mail erneut senden",resendSuccess:"E-Mail gesendet!",backToLogin:"Zur Anmeldung",checkSpam:"Überprüfen Sie Ihren Spam-Ordner, falls Sie die E-Mail nicht sehen."},es:{firstName:"Nombre",lastName:"Apellido",email:"Email",password:"Contraseña",confirmPassword:"Confirmar contraseña",registerButton:"Crear cuenta",haveAccount:"¿Ya tienes una cuenta?",logIn:"Acceder",errorFill:"Por favor complete todos los campos",errorPassword:"Las contraseñas no coinciden",errorPasswordLength:"La contraseña debe tener al menos 8 caracteres y contener letras y números",errorExists:"Este email ya está registrado",errorTerms:"Debe aceptar los términos y condiciones",agreeText:"Acepto los",termsOfService:"Términos de Servicio",and:"y la",privacyPolicy:"Política de Privacidad",googleSignIn:"Iniciar sesión con Google",confirmTitle:"Revisa tu correo",confirmMessage:"Enviamos un enlace de confirmación a",confirmHint:"Haz clic en el enlace del correo para activar tu cuenta. Después de la confirmación, podrás iniciar sesión.",resendButton:"Reenviar correo",resendSuccess:"Correo enviado!",backToLogin:"Ir al inicio de sesión",checkSpam:"Revisa tu carpeta de spam si no ves el correo."},tr:{firstName:"Ad",lastName:"Soyadı",email:"E-mail",password:"Şifre",confirmPassword:"Şifreyi doğrulayın",registerButton:"Hesap oluştur",haveAccount:"Zaten bir hesabınız var mı?",logIn:"Giriş yap",errorFill:"Lütfen tüm alanları doldurun",errorPassword:"Şifreler eşleşmiyor",errorPasswordLength:"Şifre en az 8 karakter olmalı ve harf ve rakam içermelidir",errorExists:"Bu e-posta zaten kayıtlı",errorTerms:"Şartları ve koşulları kabul etmelisiniz",agreeText:"",termsOfService:"Kullanım Şartları'nı",and:"ve",privacyPolicy:"Gizlilik Politikası'nı kabul ediyorum",googleSignIn:"Google ile giriş yap",confirmTitle:"E-postanızı kontrol edin",confirmMessage:"Onay bağlantısı gönderildi:",confirmHint:"Hesabınızı etkinleştirmek için e-postadaki bağlantıya tıklayın. Onaydan sonra giriş yapabilirsiniz.",resendButton:"Tekrar gönder",resendSuccess:"E-posta gönderildi!",backToLogin:"Girişe git",checkSpam:"E-postayı görmüyorsanız spam klasörünüzü kontrol edin."}}[W],be=async()=>{v(!0),C(!1);const D=await ae(o,W);v(!1),D&&(C(!0),setTimeout(()=>C(!1),5e3))},ke=async D=>{if(D.preventDefault(),T(""),!l||!s||!o||!f||!p){T(S.errorFill);return}const we=/[a-zA-Zа-яА-Я]/.test(f),xe=/\d/.test(f);if(f.length<8||!we||!xe){T(S.errorPasswordLength);return}if(f!==p){T(S.errorPassword);return}if(!N){T(S.errorTerms);return}const Se=new URLSearchParams(window.location.search).get("ref")||void 0;z(!0);const re=await O(o,f,l,s,W,Se);z(!1),re==="success"?r():re==="confirmation_needed"?h(!0):T(M||S.errorExists)};return b?e.jsxs(k.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:"text-center py-4",children:[e.jsx("div",{className:"w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center",children:e.jsx(Pe,{className:"w-8 h-8 text-green-600"})}),e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-2",children:S.confirmTitle}),e.jsx("p",{className:"text-sm text-gray-600 mb-1",children:S.confirmMessage}),e.jsx("p",{className:"text-sm font-semibold text-[#D4522A] mb-4",children:o}),e.jsx("p",{className:"text-sm text-gray-500 mb-6",children:S.confirmHint}),e.jsx("p",{className:"text-xs text-gray-400 mb-6",children:S.checkSpam}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("button",{type:"button",onClick:be,disabled:A,className:"w-full py-3 border-2 border-[#D4522A] text-[#D4522A] rounded-xl font-medium hover:bg-orange-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2",children:[e.jsx(ze,{className:`w-4 h-4 ${A?"animate-spin":""}`}),w?S.resendSuccess:S.resendButton]}),e.jsx("button",{type:"button",onClick:n,className:"w-full py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all",children:S.backToLogin})]})]}):e.jsxs("form",{onSubmit:ke,className:"space-y-4",children:[P&&e.jsxs(k.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2",children:[e.jsx(V,{className:"w-5 h-5 flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:P})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:S.firstName}),e.jsxs("div",{className:"relative",children:[e.jsx(Ie,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:"text",value:l,onChange:D=>a(D.target.value),className:"w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm",placeholder:"John"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:S.lastName}),e.jsx("input",{type:"text",value:s,onChange:D=>t(D.target.value),className:"w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm",placeholder:"Doe"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:S.email}),e.jsxs("div",{className:"relative",children:[e.jsx(ee,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:"email",value:o,onChange:D=>d(D.target.value),className:"w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm",placeholder:"you@example.com"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:S.password}),e.jsxs("div",{className:"relative",children:[e.jsx(_,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:c?"text":"password",value:f,onChange:D=>m(D.target.value),className:"w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm",placeholder:"••••••••"}),e.jsx("button",{type:"button",className:"absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",onClick:()=>u(!c),children:c?e.jsx(q,{}):e.jsx(U,{})})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:S.confirmPassword}),e.jsxs("div",{className:"relative",children:[e.jsx(X,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:x?"text":"password",value:p,onChange:D=>y(D.target.value),className:"w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm",placeholder:"••••••••"}),e.jsx("button",{type:"button",className:"absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",onClick:()=>g(!x),children:x?e.jsx(q,{}):e.jsx(U,{})})]})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",checked:N,onChange:D=>I(D.target.checked),className:"w-4 h-4 text-[#D4522A] bg-gray-100 border-gray-300 rounded focus:ring-[#D4522A] focus:ring-2"}),e.jsxs("label",{className:"ml-2 text-sm text-gray-700",children:[S.agreeText," ",e.jsx("a",{href:"#",className:"text-[#D4522A]",children:S.termsOfService})," ",S.and," ",e.jsx("a",{href:"#",className:"text-[#D4522A]",children:S.privacyPolicy})]})]}),e.jsx(k.button,{type:"submit",disabled:E,whileHover:{scale:E?1:1.02},whileTap:{scale:E?1:.98},className:"w-full py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed",children:E?"...":S.registerButton}),e.jsxs("div",{className:"text-center pt-2",children:[e.jsxs("span",{className:"text-gray-600 text-sm",children:[S.haveAccount," "]}),e.jsx("button",{type:"button",onClick:n,className:"text-[#D4522A] font-medium text-sm hover:underline",children:S.logIn})]})]})}function He({onSuccess:r,onBack:n}){const[l,a]=i.useState(""),[s,t]=i.useState(""),[o,d]=i.useState(""),[f,m]=i.useState(!1),{resetPassword:p,authError:y}=R(),{language:c}=B(),x={en:{title:"Reset Password",email:"Email",resetButton:"Send Reset Link",backToLogin:"Back to Login",errorFill:"Please enter your email",errorNotFound:"Could not send reset email",successMessage:"A password reset link has been sent to your email. Please check your inbox."},ru:{title:"Сброс пароля",email:"Email",resetButton:"Отправить ссылку для сброса",backToLogin:"Назад к входу",errorFill:"Введите ваш email",errorNotFound:"Не удалось отправить письмо для сброса",successMessage:"Ссылка для сброса пароля отправлена на вашу почту. Проверьте входящие."},de:{title:"Passwort zurücksetzen",email:"E-Mail",resetButton:"Link zum Zurücksetzen senden",backToLogin:"Zurück zur Anmeldung",errorFill:"Bitte geben Sie Ihre E-Mail ein",errorNotFound:"Reset-E-Mail konnte nicht gesendet werden",successMessage:"Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail gesendet."},es:{title:"Restablecer contraseña",email:"Email",resetButton:"Enviar enlace de restablecimiento",backToLogin:"Volver al inicio de sesión",errorFill:"Por favor ingrese su email",errorNotFound:"No se pudo enviar el correo de restablecimiento",successMessage:"Se ha enviado un enlace para restablecer su contraseña a su correo electrónico."},tr:{title:"Şifre sıfırlama",email:"E-mail",resetButton:"Sıfırlama bağlantısı gönder",backToLogin:"Girişe geri dön",errorFill:"Lütfen e-postanızı girin",errorNotFound:"Sıfırlama e-postası gönderilemedi",successMessage:"Şifre sıfırlama bağlantısı e-postanıza gönderildi."}}[c],g=async N=>{if(N.preventDefault(),t(""),d(""),!l){t(x.errorFill);return}m(!0);const I=await p(l,"",c);m(!1),I?(d(x.successMessage),setTimeout(()=>{r()},4e3)):t(y||x.errorNotFound)};return e.jsx("div",{className:"space-y-4",children:e.jsxs("form",{onSubmit:g,className:"space-y-4",children:[s&&e.jsxs(k.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2",children:[e.jsx(V,{className:"w-5 h-5 flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:s})]}),o&&e.jsxs(k.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2",children:[e.jsx(X,{className:"w-5 h-5 flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:o})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:x.email}),e.jsxs("div",{className:"relative",children:[e.jsx(ee,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"}),e.jsx("input",{type:"email",value:l,onChange:N=>a(N.target.value),className:"w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4522A] focus:border-transparent transition-all text-sm",placeholder:"you@example.com"})]})]}),e.jsx(k.button,{type:"submit",disabled:f,whileHover:{scale:f?1:1.02},whileTap:{scale:f?1:.98},className:"w-full py-3 bg-gradient-to-r from-[#D4522A] to-[#E8744F] text-white rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed",children:f?"...":x.resetButton}),e.jsx("div",{className:"text-center pt-2",children:e.jsx("button",{type:"button",onClick:n,className:"text-[#D4522A] font-medium text-sm hover:underline",children:x.backToLogin})})]})})}function ge({isOpen:r,onClose:n,mode:l="login",onAuthSuccess:a}){const[s,t]=i.useState(l),{language:o}=B();i.useEffect(()=>{r&&t(l)},[r,l]);const d={en:{login:"Log in",register:"Registration",reset:"Reset Password"},ru:{login:"Войти",register:"Регистрация",reset:"Восстановление пароля"},de:{login:"Anmelden",register:"Registrieren",reset:"Passwort wiederherstellen"},es:{login:"Acceder",register:"Registrarse",reset:"Restablecer contraseña"},tr:{login:"Giriş yap",register:"Kayıt ol",reset:"Parolayı sıfırla"}},f={en:{login:"Enter your credentials to access your partner dashboard"},ru:{login:"Введите свои учетные данные для доступа к панели управления партнера"},de:{login:"Geben Sie Ihre Zugangsdaten ein, um auf Ihr Partner-Dashboard zuzugreifen"},es:{login:"Introduce tus credenciales para acceder a tu panel de socio"},tr:{login:"Ortak panelinize erişmek için kimlik bilgilerinizi girin"}};return e.jsx(G,{children:r&&e.jsxs(e.Fragment,{children:[e.jsx(k.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-50"}),e.jsx("div",{className:"fixed inset-0 flex items-center justify-center z-50 p-4",children:e.jsxs(k.div,{initial:{opacity:0,scale:.95,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:20},className:"bg-[var(--color-surface)] rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden",onClick:m=>m.stopPropagation(),children:[e.jsx("button",{onClick:n,className:"absolute top-6 right-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors z-10",children:e.jsx(J,{className:"w-6 h-6"})}),e.jsxs("div",{className:"p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-[var(--color-text)] mb-2",children:d[o][s]}),s==="login"&&e.jsx("p",{className:"text-sm text-[var(--color-text-secondary)] mb-6",children:f[o][s]}),s==="login"?e.jsx(We,{onSuccess:a||n,onSwitchToRegister:()=>t("register"),onSwitchToReset:()=>t("reset")}):s==="register"?e.jsx(Qe,{onSuccess:a||n,onSwitchToLogin:()=>t("login")}):e.jsx(He,{onSuccess:()=>t("login"),onBack:()=>t("login")})]})]})})]})})}function ye({isOpen:r,onClose:n,onLoginClick:l,onSignInClick:a,handleLoginClick:s,handleSignInClick:t}){const{language:o}=B(),d=te[o],f=l||s||(()=>{}),m=a||t||(()=>{}),p=[{id:"unique-features",label:d.features},{id:"opportunities",label:d.aboutUs},{id:"partnership",label:d.forPartners},{id:"investments",label:d.stagesOfDevelopment},{id:"advantages",label:d.whyChefNet},{id:"roadmap",label:d.roadmap},{id:"faq",label:d.faq},{id:"team",label:d.team},{id:"footer",label:d.contacts}],y=c=>{const u=document.getElementById(c);u&&(u.scrollIntoView({behavior:"smooth"}),n())};return e.jsx(G,{children:r&&e.jsxs(e.Fragment,{children:[e.jsx(k.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,className:"fixed inset-0 bg-black/50 backdrop-blur-sm z-50"}),e.jsxs(k.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"spring",damping:30,stiffness:300},className:"fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl overflow-y-auto",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-gray-200",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(K,{className:"w-5 h-5 text-[#FF6B35]"}),e.jsxs("span",{className:"font-bold text-lg",children:["ChefNet ",e.jsx("span",{className:"text-[#FF6B35]",children:"Invest"})]})]}),e.jsx("button",{onClick:n,className:"p-2 rounded-lg hover:bg-gray-100 transition-colors",children:e.jsx(J,{className:"w-6 h-6"})})]}),e.jsxs("nav",{className:"p-4",children:[e.jsx("ul",{className:"space-y-2",children:p.map(c=>e.jsx("li",{children:e.jsx("button",{onClick:()=>y(c.id),className:"w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-[#3E3E3E] font-medium",children:c.label})},c.id))}),e.jsxs("div",{className:"mt-6 space-y-3 px-4",children:[e.jsx("button",{onClick:()=>{f(),n()},className:"w-full py-3 px-4 bg-[#FF6B35] text-white rounded-full font-medium hover:bg-[#FF8C42] transition-colors",children:d.logIn}),e.jsx("button",{onClick:()=>{m(),n()},className:"w-full py-3 px-4 border-2 border-[#FF6B35] text-[#FF6B35] rounded-full font-medium hover:bg-[#FF6B35] hover:text-white transition-colors",children:d.signIn})]})]})]})]})})}const Ye="/assets/ea3684a8e6ad5b9f30bbc761f606c383abcbe400.webp",Ze="/assets/f6e6a7c1827ce38e56117c96836c20e4665523fd.webp";function $e({onGoToDashboard:r}){const{language:n}=B(),{isAuthenticated:l}=R(),a=i.useMemo(()=>te[n],[n]),[s,t]=i.useState(!1),[o,d]=i.useState("login"),[f,m]=i.useState(!1),p=()=>{l?r():(d("login"),t(!0))},y=()=>{l?r():(d("register"),t(!0))},c=()=>{t(!1),setTimeout(()=>{r()},300)};return e.jsxs("section",{id:"home",className:"relative bg-background px-4 pb-8 pt-6 sm:px-6 md:px-8",children:[e.jsxs("div",{className:"hidden md:block relative overflow-hidden",style:{height:"auto",minHeight:"620px",borderRadius:"32px",background:"#5A2F23"},children:[e.jsx("div",{className:"relative z-10 px-8 py-4",children:e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[e.jsxs("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"flex items-center gap-1.5 flex-shrink-0",children:[e.jsx(K,{className:"w-5 h-5 text-[#FF6B35] drop-shadow-[0_2px_8px_rgba(255,107,53,0.5)]"}),e.jsxs("div",{className:"whitespace-nowrap",children:[e.jsxs("span",{className:"font-semibold text-[15px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]",children:["ChefNet"," "]}),e.jsx("span",{className:"font-semibold text-[15px] tracking-tight drop-shadow-[0_2px_6px_rgba(255,107,53,0.4)]",style:{color:"#FF6B35"},children:"Invest"})]})]}),e.jsxs("nav",{className:"hidden lg:flex items-center gap-4 flex-1 justify-center",children:[e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("unique-features"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.features}),e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("opportunities"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.aboutUs}),e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("partnership"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.forPartners}),e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("investments"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.stagesOfDevelopment}),e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("advantages"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.whyChefNet}),e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("roadmap"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.roadmap}),e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("faq"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.faq}),e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("team"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.team}),e.jsx("button",{onClick:()=>{var u;return(u=document.getElementById("footer"))==null?void 0:u.scrollIntoView({behavior:"smooth"})},className:"text-white hover:text-white text-[12px] font-medium transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]",children:a.contacts})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-shrink-0",children:[e.jsx("div",{className:"mr-4",children:e.jsx($,{})}),e.jsx(k.button,{whileHover:{scale:1.03},whileTap:{scale:.97},className:"px-3.5 bg-white/10 text-white rounded-full text-[12px] font-medium hover:bg-white/15 transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)]",style:{borderColor:"rgba(255, 107, 53, 0.5)",borderWidth:"1px",borderStyle:"solid"},onClick:p,children:a.logIn}),e.jsx(k.button,{whileHover:{scale:1.03},whileTap:{scale:.97},className:"px-3.5 bg-white/10 text-white rounded-full text-[12px] font-medium hover:bg-white/15 transition-all whitespace-nowrap drop-shadow-[0_2px_6px_rgba(255,255,255,0.4)]",style:{borderColor:"rgba(255, 107, 53, 0.5)",borderWidth:"1px",borderStyle:"solid"},onClick:y,children:a.signIn})]})]})}),e.jsx("div",{className:"relative z-10 flex-1 flex items-center justify-start px-8 pt-20 pb-8",children:e.jsxs("div",{className:"w-full max-w-[40%] pr-10",children:[e.jsxs(k.h1,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},className:"text-white font-bold text-[42px] leading-tight mb-5",style:{letterSpacing:"-0.02em",fontFamily:"Montserrat, sans-serif"},children:[e.jsxs("span",{className:"inline-block relative",style:{position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:"-10px",right:"-10px",top:"-6px",bottom:"-6px",background:"linear-gradient(135deg, #FF8B5A 0%, #FF7645 50%, #FF6B35 100%)",borderRadius:"18px",zIndex:-1,boxShadow:"0 0 40px 15px rgba(255, 107, 53, 0.4), 0 0 80px 30px rgba(255, 107, 53, 0.2)",filter:"blur(2px)"}}),e.jsx("span",{style:{position:"relative",zIndex:1},children:n==="ru"?"Интеллект,":n==="en"?"Intelligence":n==="de"?"Intelligenz,":n==="es"?"Inteligencia":"Seçimi"})]}),e.jsx("br",{}),n==="ru"?"превращающий":n==="en"?"that turns":n==="de"?"die Auswahl":n==="es"?"que convierte":"değere çeviren",e.jsx("br",{}),n==="ru"?"выбор в ценность.":n==="en"?"choice into value.":n==="de"?"in Wert verwandelt.":n==="es"?"la elección en valor.":"zekâ."]}),e.jsxs(k.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},className:"text-white text-[14px] leading-relaxed mb-6",children:[e.jsx("p",{className:"font-bold mb-2",style:{fontFamily:"Nunito, sans-serif"},children:a.heroSubtitle}),e.jsx("p",{className:"font-normal opacity-90 mb-4",children:n==="ru"?e.jsxs(e.Fragment,{children:["которая изучает ваш ритм, запоминает ваш вкус и сохраняет вам",e.jsx("br",{}),"время и деньги каждый день."]}):a.heroDescription}),e.jsx("p",{className:"font-normal opacity-90 mb-1",children:a.heroBenefit1}),e.jsx("p",{className:"font-normal opacity-90 mb-1",children:a.heroBenefit2}),e.jsx("p",{className:"font-normal opacity-90 mb-4",children:a.heroBenefit3}),e.jsx("p",{className:"font-normal opacity-90",children:a.heroCta})]})]})}),e.jsx("img",{src:Ye,alt:"Food",loading:"eager",decoding:"async",className:"absolute top-0 bottom-0 h-full w-full object-cover z-0",style:{right:"-12%",objectPosition:"right center",opacity:1,filter:"brightness(1.1) contrast(1.2) saturate(1.15)",maskImage:"linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 85%, transparent 100%)",WebkitMaskImage:"linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.3) 85%, transparent 100%)"}})]}),e.jsxs("div",{className:"md:hidden overflow-hidden relative",style:{borderRadius:"32px",minHeight:"780px"},children:[e.jsx("div",{className:"absolute inset-0 z-0",style:{backgroundImage:`url(${Ze})`,backgroundSize:"cover",backgroundPosition:"center center",filter:"brightness(1.0) contrast(1.1) saturate(1.1)"}}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"px-4 py-3",children:e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[e.jsxs("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"flex items-center gap-1 flex-shrink-0",children:[e.jsx(K,{className:"w-4 h-4 text-[#FF6B35] drop-shadow-[0_2px_8px_rgba(255,107,53,0.5)]"}),e.jsxs("div",{className:"whitespace-nowrap",children:[e.jsxs("span",{className:"font-semibold text-[13px] text-white tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]",children:["ChefNet"," "]}),e.jsx("span",{className:"font-semibold text-[13px] tracking-tight drop-shadow-[0_2px_6px_rgba(255,107,53,0.4)]",style:{color:"#FF6B35"},children:"Invest"})]})]}),e.jsxs("div",{className:"flex items-center gap-2 flex-shrink-0",children:[e.jsx($,{}),e.jsx("button",{onClick:()=>m(!0),className:"p-2 text-white hover:bg-white/10 rounded-lg transition-colors",children:e.jsx(pe,{className:"w-5 h-5"})})]})]})}),e.jsxs("div",{className:"relative z-10 px-4 py-8 pb-12",children:[e.jsxs(k.h1,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},className:"text-white font-bold text-[28px] sm:text-[36px] leading-tight mb-3",style:{letterSpacing:"-0.02em",fontFamily:"Montserrat, sans-serif"},children:[e.jsxs("span",{className:"inline-block relative",style:{position:"relative"},children:[e.jsx("span",{style:{position:"absolute",left:"-10px",right:"-10px",top:"-6px",bottom:"-6px",background:"linear-gradient(135deg, #FF8B5A 0%, #FF7645 50%, #FF6B35 100%)",borderRadius:"18px",zIndex:-1,boxShadow:"0 0 40px 15px rgba(255, 107, 53, 0.4), 0 0 80px 30px rgba(255, 107, 53, 0.2)",filter:"blur(2px)"}}),e.jsx("span",{style:{position:"relative",zIndex:1},children:a.heroTitle3})]})," ",a.heroTitle4]}),e.jsxs(k.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4},className:"text-white text-[13px] leading-snug mb-4",children:[e.jsxs("div",{className:"mb-2",children:[e.jsx("p",{className:"font-bold mb-0.5",style:{fontFamily:"Nunito, sans-serif"},children:a.heroSubtitle}),e.jsx("p",{className:"font-normal opacity-90",children:a.heroDescription})]}),e.jsxs("div",{className:"mb-2 font-normal opacity-90",children:[e.jsx("p",{className:"mb-0",children:a.heroBenefit1}),e.jsx("p",{className:"mb-0",children:a.heroBenefit2}),e.jsx("p",{className:"mb-0",children:a.heroBenefit3})]}),e.jsx("p",{className:"font-normal opacity-90",children:a.heroCta})]}),e.jsx(k.button,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6},whileHover:{scale:1.03},whileTap:{scale:.97},className:"w-full max-w-xs px-6 py-3 bg-white text-[#FF6B35] rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl",onClick:y,children:a.logIn})]})]})]}),e.jsx(ge,{isOpen:s,onClose:()=>t(!1),mode:o,onAuthSuccess:c}),e.jsx(ye,{isOpen:f,onClose:()=>m(!1),onLoginClick:p,onSignInClick:y})]})}function Je({onGoToDashboard:r}){const{language:n}=B(),{isAuthenticated:l}=R(),a=te[n],[s,t]=i.useState(!1),[o,d]=i.useState("login"),[f,m]=i.useState(!1),[p,y]=i.useState(!1);i.useRef(null),i.useEffect(()=>{const g=document.getElementById("home");if(!g){console.log("❌ Hero section not found");return}const N=new IntersectionObserver(([I])=>{const P=!I.isIntersecting;console.log("👁️ Hero visible:",I.isIntersecting,"| Sticky nav visible:",P),m(P)},{threshold:.1,rootMargin:"-80px 0px 0px 0px"});return N.observe(g),()=>{N.disconnect()}},[]);const c=()=>{l?r():(d("login"),t(!0))},u=()=>{l?r():(d("register"),t(!0))},x=()=>{t(!1),setTimeout(()=>{r()},300)};return e.jsxs(e.Fragment,{children:[e.jsx(k.div,{initial:{y:-100,opacity:0},animate:{y:f?0:-100,opacity:f?1:0},transition:{duration:.3,ease:"easeOut"},className:`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg ${f?"pointer-events-auto":"pointer-events-none"}`,style:{backgroundColor:"rgba(233, 222, 214, 0.85)"},children:e.jsx("div",{className:"px-8 py-4",children:e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[e.jsxs("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"flex items-center gap-1.5 flex-shrink-0",children:[e.jsx(K,{className:"w-5 h-5 text-[#FF6B35]"}),e.jsxs("div",{className:"whitespace-nowrap",children:[e.jsxs("span",{className:"font-semibold text-[15px] text-[#2C1810] tracking-tight",children:["ChefNet"," "]}),e.jsx("span",{className:"font-semibold text-[15px] tracking-tight",style:{color:"#D93F29"},children:"Invest"})]})]}),e.jsx("div",{className:"hidden lg:block flex-1",children:e.jsxs("nav",{className:"flex items-center justify-center gap-6",children:[e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("unique-features"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.features}),e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("opportunities"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.aboutUs}),e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("partnership"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.forPartners}),e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("investments"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.stagesOfDevelopment}),e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("advantages"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.whyChefNet}),e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("roadmap"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.roadmap}),e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("faq"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.faq}),e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("team"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.team}),e.jsx("button",{onClick:()=>{var g;return(g=document.getElementById("footer"))==null?void 0:g.scrollIntoView({behavior:"smooth"})},className:"text-[#3E3E3E] hover:text-[#FF6B35] text-[12px] font-medium transition-all whitespace-nowrap",children:a.contacts})]})}),e.jsxs("div",{className:"flex items-center gap-1.5 flex-shrink-0",children:[e.jsx("div",{className:"mr-4",children:e.jsx($,{variant:"dark"})}),e.jsx("button",{onClick:()=>y(!0),className:"lg:hidden p-2 text-[#6B4423] hover:bg-[#6B4423]/10 rounded-lg transition-colors",children:e.jsx(pe,{className:"w-5 h-5"})}),e.jsx(k.button,{whileHover:{scale:1.03},whileTap:{scale:.97},className:"hidden sm:block px-3 py-1.5 text-[#D93F29] rounded-full text-[12px] font-medium hover:bg-[#D93F29]/10 transition-all whitespace-nowrap",style:{borderColor:"#D93F29",borderWidth:"1px",borderStyle:"solid"},onClick:c,children:a.logIn}),e.jsx(k.button,{whileHover:{scale:1.03},whileTap:{scale:.97},className:"hidden sm:block px-3 py-1.5 text-[#D93F29] rounded-full text-[12px] font-medium hover:bg-[#D93F29]/10 transition-all whitespace-nowrap",style:{borderColor:"#D93F29",borderWidth:"1px",borderStyle:"solid"},onClick:u,children:a.signIn})]})]})})}),e.jsx(ge,{isOpen:s,onClose:()=>t(!1),mode:o,onAuthSuccess:x}),e.jsx(ye,{isOpen:p,onClose:()=>y(!1),onGoToDashboard:r,isAuthenticated:l,handleLoginClick:c,handleSignInClick:u})]})}class de extends i.Component{constructor(n){super(n),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(n,l){console.error("[ErrorBoundary]",n,l)}render(){return this.state.hasError?e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-[var(--color-background)] text-[var(--color-text)]",children:e.jsxs("div",{className:"text-center p-8",children:[e.jsx("p",{className:"text-lg mb-4",children:"Что-то пошло не так. Обновите страницу."}),e.jsx("button",{onClick:()=>window.location.reload(),className:"px-6 py-2 bg-[#D4522A] text-white rounded-lg hover:bg-[#B8441F] transition-colors",children:"Обновить"})]})}):this.props.children}}const Xe=i.lazy(()=>j(()=>import("./AboutSection-D1ag3TUc.js"),__vite__mapDeps([0,1,2,3]))),en=i.lazy(()=>j(()=>import("./UniqueFeaturesSection-9iBxIABY.js"),__vite__mapDeps([4,2,5,1,3]))),nn=i.lazy(()=>j(()=>import("./OpportunitiesSection-BLVUDSlT.js"),__vite__mapDeps([6,2,5,1,3]))),tn=i.lazy(()=>j(()=>import("./PartnershipSection-Ch_yMBoE.js"),__vite__mapDeps([7,2,5,1,3]))),an=i.lazy(()=>j(()=>import("./InvestmentsSection-B2LApBbn.js"),__vite__mapDeps([8,2,5,1,3]))),rn=i.lazy(()=>j(()=>import("./AdvantagesSection-Cu0MvMln.js"),__vite__mapDeps([9,2,5,1,3]))),sn=i.lazy(()=>j(()=>import("./RoadmapSection-CqBFBFje.js"),__vite__mapDeps([10,2,5,1,3]))),on=i.lazy(()=>j(()=>import("./ChefNetAppSection-Crya-HGb.js"),__vite__mapDeps([11,2,3,1]))),ln=i.lazy(()=>j(()=>import("./FAQSection-C9MiQKzi.js"),__vite__mapDeps([12,2,5,1,3]))),cn=i.lazy(()=>j(()=>import("./CTABanner-GSC9zHEE.js"),__vite__mapDeps([13,2,3,1]))),dn=i.lazy(()=>j(()=>import("./TeamSection-DmpbvX2I.js"),__vite__mapDeps([14,2,5,3,1]))),un=i.lazy(()=>j(()=>import("./Footer-CgnzFxdG.js"),__vite__mapDeps([15,2,1,3]))),pn=i.lazy(()=>j(()=>import("./Dashboard-B_nwql6q.js"),__vite__mapDeps([16,2,17,1,18,19,3]))),ue={en:"Email confirmed! You can now log in.",ru:"Email подтверждён! Теперь вы можете войти.",de:"E-Mail bestätigt! Sie können sich jetzt anmelden.",es:"Email confirmado! Ahora puedes iniciar sesión.",tr:"E-posta onaylandı! Artık giriş yapabilirsiniz."},L={invalid:{en:"Verification link is invalid. Please request a new one.",ru:"Ссылка для подтверждения недействительна. Запросите новую.",de:"Bestätigungslink ist ungültig. Bitte fordern Sie einen neuen an.",es:"El enlace de verificación no es válido. Solicite uno nuevo.",tr:"Doğrulama bağlantısı geçersiz. Lütfen yeni bir tane isteyin."},expired:{en:"Verification link has expired. Please request a new one.",ru:"Ссылка для подтверждения истекла. Запросите новую.",de:"Bestätigungslink ist abgelaufen. Bitte fordern Sie einen neuen an.",es:"El enlace de verificación ha expirado. Solicite uno nuevo.",tr:"Doğrulama bağlantısının süresi doldu. Lütfen yeni bir tane isteyin."},server:{en:"A server error occurred. Please try again later.",ru:"Произошла ошибка сервера. Попробуйте позже.",de:"Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.",es:"Ocurrió un error del servidor. Inténtelo de nuevo más tarde.",tr:"Bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin."},missing:{en:"Verification link is incomplete. Please use the full link from the email.",ru:"Ссылка для подтверждения неполная. Используйте полную ссылку из письма.",de:"Bestätigungslink ist unvollständig.",es:"El enlace de verificación está incompleto.",tr:"Doğrulama bağlantısı eksik."}};function mn(){const{isAuthenticated:r,loading:n,isPasswordRecovery:l}=R(),{language:a}=B(),[s,t]=i.useState(!1),[o,d]=i.useState(!1),[f,m]=i.useState(null),[p,y]=i.useState(null);return i.useEffect(()=>{const c=new URLSearchParams(window.location.search);c.get("verified")==="true"&&(d(!0),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>d(!1),8e3));const u=c.get("verify_error");u&&(m(u),window.history.replaceState({},"",window.location.pathname),setTimeout(()=>m(null),1e4));const x=c.get("reset_token");x&&(y(x),window.history.replaceState({},"",window.location.pathname))},[]),n?e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-[var(--color-background)]",children:e.jsx("div",{className:"w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin"})}):r&&s?e.jsx(i.Suspense,{fallback:e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-[var(--color-background)]",children:e.jsx("div",{className:"w-8 h-8 border-4 border-[#D4522A] border-t-transparent rounded-full animate-spin"})}),children:e.jsx(pn,{onBackToHome:()=>t(!1)})}):e.jsxs("div",{className:"min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300 overflow-x-hidden w-full max-w-full",children:[l&&e.jsx(ce,{}),p&&e.jsx(ce,{resetToken:p,onClose:()=>y(null)}),o&&e.jsxs("div",{className:"fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-[90vw]",children:[e.jsx("svg",{className:"w-5 h-5 flex-shrink-0",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),e.jsx("span",{className:"font-medium text-sm",children:ue[a]||ue.ru}),e.jsx("button",{onClick:()=>d(!1),className:"ml-2 text-white/80 hover:text-white",children:"×"})]}),f&&e.jsxs("div",{className:"fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-[90vw]",children:[e.jsx("svg",{className:"w-5 h-5 flex-shrink-0",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}),e.jsx("span",{className:"font-medium text-sm",children:(L[f]||L.invalid)[a]||(L[f]||L.invalid).ru}),e.jsx("button",{onClick:()=>m(null),className:"ml-2 text-white/80 hover:text-white",children:"×"})]}),e.jsx(Je,{onGoToDashboard:()=>t(!0)}),e.jsx($e,{onGoToDashboard:()=>t(!0)},a),e.jsxs(i.Suspense,{fallback:null,children:[e.jsx(en,{}),e.jsx(nn,{}),e.jsx(tn,{}),e.jsx(an,{}),e.jsx(Xe,{}),e.jsx(rn,{}),e.jsx(sn,{}),e.jsx(on,{}),e.jsx(ln,{}),e.jsx(cn,{}),e.jsx(dn,{}),e.jsx(un,{})]})]})}function hn(){return e.jsx(de,{children:e.jsx(Me,{children:e.jsx(Ve,{children:e.jsx(Re,{defaultTheme:"light",storageKey:"chefnet-theme",children:e.jsx(de,{children:e.jsx(mn,{})})})})})})}const ve=document.getElementById("root");if(!ve)throw new Error("Failed to find the root element");Te.createRoot(ve).render(e.jsx(i.StrictMode,{children:e.jsx(hn,{})}));export{$ as L,R as a,Ge as g,te as t,B as u};
