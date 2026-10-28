
// One lightweight set of decorative glyphs: CSS handles movement; no animation loop or timers.
(function createSymbolRain(){
 const host=document.getElementById('symbolRain'); if(!host) return;
 const botanical=['🌸','🌼','🍁','🍃','🌺','🧧','🌱','🍂','🌿','🌷','🪷','✿','❀','❁','❃','❋','ꕤ','𖧷','𖥔','𖦹','༄','꩜'];
 const glyphs=['ℏ','ℵ','℧','ϑ','ϱ','ϰ','ϖ','Ϟ','ϟ','Ϡ','⧖','⧜','⧫','⧬','⨳','⩘','⫰','∰','∯','⊗','⊕','⊙','⊛','⌬','⌖','⌘','⍟','⍣','⏣','⌭','⌽','⌿','⋇','⋈','⟡','⊹','∇','∂','∮','∳','Ψ','Ξ','Ω','Φ','λ','μ','ζ','χ','ℒ','ℑ','ℜ','∝','≋','≜','≀','⫷','⫸','⦿','⦾','⧊','⩚','⩛','ℝ','ℂ','ℤ','ℕ','∀','∃','∈','∉','⊂','⊆','∩','∪','∅','∴','∵','≃','≅','≡','≈','≠','≤','≥','∞','∑','∏','√','∛','∜','∠','∡','⊥','∥','↦','⇒','⇔'];
 const electrostatic=['ε₀','μ₀','kₑ','q₁','q₂','λ','σ','ρ','Φₑ','ΔV','Cₑ','E⃗','F⃗','p⃗','V(r)','Uₑ','∮E·dA','∇·E','r̂','dA','α≈1/137','a₀','R∞','εᵣ','τ'];
 const calculusVector=['∫f(x)dx','∬S dA','∭V dV','∮C F·dr','∇×B','∇·E','∇²ψ','∂f/∂x','df/dt','d²x/dt²','limₓ→₀','Σₙ₌₁∞','∮∂Ω','curl F','div F','grad φ','∇φ','∇×E','r⃗×p⃗','a⃗·b⃗','|a⃗×b⃗|','⟨ψ|φ⟩','|ψ⟩','ℒ{f}','ℱ{f}','δᵢⱼ','εᵢⱼₖ','λₘₐₓ','det(A−λI)','J=∂(u,v)/∂(x,y)'];
 const radians=['π/6','π/4','π/3','π/2','2π/3','3π/4','5π/6','π','3π/2','2π','θ','φ','Δθ','ωt','dθ'];
 const trig=['sin θ','cos θ','tan θ','sec θ','csc θ','cot θ','sin²θ','cos²θ','eⁱθ','sin(ωt)','cos(ωt)'];
 const palette=['#ff9fc9','#ffd08a','#a9f4d5','#a6e8ff','#d4b5ff','#ffe8a6','#b8f7ee','#f8b7a0'];
 const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const mobile=window.matchMedia&&window.matchMedia('(max-width: 600px)').matches;
 const lowPower=(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4);
 // Keep the rain visually dense while reducing layer count on low-memory phones.
 const count=mobile?(lowPower?27:38):(lowPower?43:61);
 const rand=(a,b)=>a+Math.random()*(b-a);
 const frag=document.createDocumentFragment();
 for(let i=0;i<count;i++){
   const dropKind=Math.random(); const botanicalDrop=dropKind<.375; const winterDrop=dropKind>=.375&&dropKind<.625; // 3/8 flowers, 1/4 winter, 3/8 scientific symbols
   const span=document.createElement('span');
   span.className='drop '+(botanicalDrop?'botanical':winterDrop?'winter':'glyph');
   let pool;
   if(botanicalDrop){ pool=botanical; } else if(winterDrop){pool=['❄','❅','❆','✻','✼','🌨️','☁','⋆'];}
   else {
     const kind=Math.random();
     // Preserve the rare-glyph look; add Class 12 electrostatics/radian marks and keep trig deliberately sparse.
     pool=kind<.38?glyphs:(kind<.60?electrostatic:(kind<.82?calculusVector:(kind<.95?radians:trig)));
   }
   span.textContent=pool[Math.floor(Math.random()*pool.length)];
   // Heavier side-edge rain, with a few top/bottom-center accents for a naturally scattered look.
   const lane=Math.random();
   let x;
   if(lane<.43) x=rand(1,13);
   else if(lane<.86) x=rand(87,98);
   else x=rand(15,85);
   span.style.setProperty('--x',x.toFixed(2)+'vw');
   span.style.setProperty('--size',(rand(botanicalDrop?14:(winterDrop?12:13),botanicalDrop?23:(winterDrop?20:21))*0.78).toFixed(1)+'px');
   span.style.setProperty('--tint',palette[Math.floor(Math.random()*palette.length)]);
   span.style.setProperty('--duration',rand(17,32).toFixed(1)+'s');
   span.style.setProperty('--delay',reduced?'0s':(-rand(0,32)).toFixed(1)+'s');
   span.style.setProperty('--drift',rand(-7,7).toFixed(1)+'vw');
   span.style.setProperty('--spin',rand(-210,210).toFixed(0)+'deg');
   span.style.setProperty('--opacity',rand(.19,.39).toFixed(2));
   span.style.setProperty('--rest-y',rand(4,92).toFixed(1)+'vh');
   span.style.setProperty('--rest-rot',rand(-80,80).toFixed(0)+'deg');
   frag.appendChild(span);
 }
 host.appendChild(frag);
 // Physics-inspired leaf flight: horizontal/vertical velocity, aerodynamic damping,
 // lift/drag and angular acceleration. Integrate smoothly with elapsed frame time.
 // The glyphs are decorative particles, not a calibrated aerodynamic simulation.
 host.classList.add('physics-flight');
 const particles=Array.from(host.children).map((el,i)=>{
   const x=parseFloat(el.style.getPropertyValue('--x'))/100*innerWidth;
   const dur=parseFloat(el.style.getPropertyValue('--duration'));
   const offset=parseFloat(el.style.getPropertyValue('--delay'));
   const phase=Math.random()*Math.PI*2;
   const flutter=Math.random()<.8;
   return {el,x,y:(offset/dur)*innerHeight*1.3-50, vx:(Math.random()-.5)*16,
     vy:Math.max(12,innerHeight/dur),angle:Math.random()*Math.PI*2,omega:(Math.random()-.5)*.6,
     phase,flutter,mass:.8+Math.random()*.7,inertia:.6+Math.random()*.8,
     drag:.6+Math.random()*.5,lift:7+Math.random()*11,wind:(Math.random()-.5)*13,
     wobble:.55+Math.random()*.75,opacity:parseFloat(el.style.getPropertyValue('--opacity'))};
 });
 const reset=p=>{p.x=Math.random()*innerWidth;p.y=-30-Math.random()*innerHeight*.18;p.vx=(Math.random()-.5)*25;p.vy=14+Math.random()*10;p.omega=(Math.random()-.5)*.8;};
 let previous=0,raf=0;
 const reducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function frame(now){
   if(document.hidden||reducedMotion){raf=0;return;}
   const dt=previous?Math.min((now-previous)/1000,.04):.016;previous=now;
   const t=now/1000;
   const w=innerWidth,h=innerHeight;
   for(const p of particles){
     // Wind has long, smooth gusts plus small oscillations, allowing center crossing.
     const gust=12*Math.sin(t*.19+p.phase)+8*Math.sin(t*.33+p.phase*.47);
     const torque=p.flutter?1.05*Math.sin(t*p.wobble+p.phase):.48*Math.sin(t*.42+p.phase);
     p.omega+=((torque-.9*p.omega)/p.inertia)*dt;
     p.angle+=p.omega*dt;
     const lift=p.lift*Math.sin(2*p.angle);
     const ax=(-p.drag*p.vx+gust+p.wind+lift)*.9;
     const ay=18-.12*p.vy+3*Math.cos(p.angle);
     p.vx=Math.max(-45,Math.min(45,p.vx+ax*dt));
     p.vy=Math.max(13,Math.min(48,p.vy+ay*dt));
     // Gentle 18% slowdown without changing the leaf-like flutter physics.
     p.x+=p.vx*dt*.69;p.y+=p.vy*dt*.69;
     if(p.y>h+35||p.x<-90||p.x>w+90)reset(p);
     const fade=Math.min(1,Math.max(0,(p.y+30)/80),Math.max(0,(h+30-p.y)/95));
     p.el.style.transform=`translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0) rotate(${(p.angle*180/Math.PI).toFixed(1)}deg)`;
     p.el.style.opacity=(p.opacity*fade).toFixed(3);
   }
   raf=requestAnimationFrame(frame);
 }
 function syncVisibility(){
   if(document.hidden||reducedMotion){if(raf)cancelAnimationFrame(raf);raf=0;previous=0;}
   else if(!raf){previous=0;raf=requestAnimationFrame(frame);}
 }
 document.addEventListener('visibilitychange',syncVisibility,{passive:true});
 syncVisibility();
})();
const CHAPTERS={
'Maths':['RACE','Sets','Number System','Inequality & Modulus','FOA','Quadratic Equations','Logarithm','Sequence and Series','Compound Angle Trigo','SOT & FOG','Trigo Equations','Determinant','Straight Line (Co-Geo)','Circle','Parabola','Ellipse','Hyperbola','Binomial Theorem','P&C'],
'Physics':['RACE','Mathematical Tools for Physics','Kinematics 1D','Kinematics 2D & Relative Motion','NLM','Circular Motion','WPE','COM','Rotation','Elasticity, Thermal Expansion & Calorimetry','KTG & Thermodynamics','Fluid Mechanics'],
'Physical Chemistry':['RACE','Mole Concept','Concentration Terms','Redox','Ideal Gas','Real Gas','Atomic Structure','Chemical Equilibrium'],
'Organic Chemistry':['RACE','GOC','Acidic & Basic Strength','Isomerism','IUPAC Naming & Common Names','Purification & Characterisation'],
'Inorganic Chemistry':['RACE','Quantum Numbers','Periodic Table & Properties','Chemical Bonding-1'],
'TEST':['JEE MAIN','JEE ADV.']};
const RACE_COUNTS={'Maths':55,'Physics':69,'Physical Chemistry':30,'Organic Chemistry':25,'Inorganic Chemistry':22};
const raceStages=(subject)=>Array.from({length:RACE_COUNTS[subject]||0},(_,i)=>'Race '+(i+1));
const raceRevisionStages=(subject)=>Array.from({length:Math.ceil((RACE_COUNTS[subject]||0)/5)},(_,i)=>'Marked que R'+(i*5+1)+'-'+Math.min((i+1)*5,RACE_COUNTS[subject]));
const STAGES=['Theory','Exercise 1','Exercise 2','Exercise 3','Exercise 4','JEE Main PYQs','JEE Advanced PYQs','Revision','Revision Test'];
const REV_STAGES=['Theory','Notes Question','Module Marked Que','Extra Source','GTR Points','Revision Test'];
const PLAN_STAGES=[...STAGES.filter(s=>s!=='Revision' && s!=='Revision Test'),'JEE MAIN Booklet ©'];
const stageDisplay=(stage,drawer)=>drawer==='Revision'?stage+' ®':stage;
const TEST_STAGES=['PP(Allen)','PYP®','CLASS TEST','OTHER PHASE','DESIGNED'];
const SUBJECTS=Object.keys(CHAPTERS);
const STORE='teraJEEAdvancedTracker_v3_51chapters';
const drawerNames=(subject)=>subject==='TEST'?['Current Chapter']:['Current Chapter','Backlog','Revision'];
const NEW_CHAPTERS={'Maths':['Binomial Theorem','P&C'],'Physics':['Elasticity, Thermal Expansion & Calorimetry','KTG & Thermodynamics','Fluid Mechanics'],'Physical Chemistry':['Chemical Equilibrium']};
const chaptersFor=(subject,drawer)=>drawer==='Backlog'?CHAPTERS[subject].filter(c=>c!=='RACE'&&!(NEW_CHAPTERS[subject]||[]).includes(c)):CHAPTERS[subject];
const stagesFor=(subject,chapter,drawer)=>{
 if(subject==='TEST')return TEST_STAGES;
 if(drawer==='Revision'){
  if(chapter==='RACE')return [...raceRevisionStages(subject),'Revision 1','Revision 2'];
  return [...(subject==='Physics'?[...REV_STAGES,'SQB']:REV_STAGES),'Revision 1','Revision 2'];
 }
 if(chapter==='RACE')return raceStages(subject);
 if(drawer==='Current Chapter' && subject==='Maths')return [...PLAN_STAGES,'Gyanoday','ADDITIONAL MATERIAL'];
 if(drawer==='Backlog' && subject==='Maths')return [...PLAN_STAGES,'Gyanoday'];
 if(drawer==='Current Chapter' && subject==='Physics')return [...PLAN_STAGES,'ADDITIONAL MATERIAL'];
 if(drawer==='Backlog'||drawer==='Current Chapter')return PLAN_STAGES;
 return STAGES;
};
const linkedStageDone=(subject,chapter,stage,drawer)=>!!state.stageStatus[stageKey(subject,chapter,stage,drawer)] || (drawer!=='Revision' && (!!state.stageStatus[stageKey(subject,chapter,stage,drawer==='Current Chapter'?'Backlog':'Current Chapter')]));
const requiredChapterStages=(subject,chapter,drawer)=>{
 if(subject==='TEST')return [];
 if(drawer==='Revision')return stagesFor(subject,chapter,'Revision').filter(st=>!['Revision 1','Revision 2'].includes(st));
 const all=[...new Set([...stagesFor(subject,chapter,'Current Chapter'),...stagesFor(subject,chapter,'Backlog')])];
 const optional=subject==='Maths'?['JEE MAIN Booklet ©','Gyanoday','ADDITIONAL MATERIAL']:subject==='Physics'?['JEE MAIN Booklet ©','ADDITIONAL MATERIAL']:['JEE MAIN Booklet ©'];
 return all.filter(st=>!optional.includes(st));
};
const completionInfo=(subject,chapter,drawer)=>{
 if(subject==='TEST')return {complete:!!state.chapterStatus[chapterKey(subject,chapter,drawer)],ribbon:false};
 const linked=drawer!=='Revision';
 const all=linked?[...new Set([...stagesFor(subject,chapter,'Current Chapter'),...stagesFor(subject,chapter,'Backlog')])]:stagesFor(subject,chapter,'Revision');
 const optional=linked?(subject==='Maths'?['JEE MAIN Booklet ©','Gyanoday','ADDITIONAL MATERIAL']:subject==='Physics'?['JEE MAIN Booklet ©','ADDITIONAL MATERIAL']:['JEE MAIN Booklet ©']):['Revision 1','Revision 2'];
 const required=all.filter(st=>!optional.includes(st));
 return {complete:required.length>0&&required.every(st=>linkedStageDone(subject,chapter,st,drawer)),ribbon:all.length>0&&all.every(st=>linkedStageDone(subject,chapter,st,drawer))};
};
const baseDrawers=()=>({'Current Chapter':{on:true,open:true,chapter:'FOA',stage:'Theory'},'Backlog':{on:true,open:true,chapter:'FOA',stage:'Theory'},'Revision':{on:true,open:true,chapter:'FOA',stage:'Theory'}});
const drawersForSubject=(subject)=>{const first=(CHAPTERS[subject]||CHAPTERS.Maths)[0];return {'Current Chapter':{on:true,open:true,chapter:first,stage:'Theory'},'Backlog':{on:true,open:true,chapter:first,stage:'Theory'},'Revision':{on:true,open:true,chapter:first,stage:'Theory'}}};
const defaults=()=>({version:3,chapterStatus:{},stageStatus:{},planSubject:'Maths',drawers:baseDrawers(),drawersBySubject:Object.fromEntries(SUBJECTS.map(s=>[s,drawersForSubject(s)])),questionBank:{},studyHistory:{},qbSubject:'Maths',qbChapter:'FOA',qbCategory:'Exercise 1',daily:{date:new Date().toLocaleDateString('en-CA'),subject:'Maths',chapter:'FOA',exercise:'Exercise 1',solved:'0',theoryMinutes:'0',minutes:'0',revision:false,hw:false,note:'',doubts:''}});
let state=load();function load(){try{const s=JSON.parse(localStorage.getItem(STORE));return s&&s.version===3?merge(defaults(),s):defaults()}catch(e){return defaults()}}function merge(a,b){const out={...a,...b,drawers:{...a.drawers,...(b.drawers||{})},drawersBySubject:{...a.drawersBySubject,...(b.drawersBySubject||{})},daily:{...a.daily,...(b.daily||{})},studyHistory:{...a.studyHistory,...(b.studyHistory||{})}};for(const subject of SUBJECTS){out.drawersBySubject[subject]={...drawersForSubject(subject),...(out.drawersBySubject[subject]||{})};if(out.drawersBySubject[subject])out.drawersBySubject[subject]={...out.drawersBySubject[subject]};}if(b.drawers && !b.drawersBySubject){const oldSubject=b.planSubject||'Maths';out.drawersBySubject[oldSubject]={...out.drawersBySubject[oldSubject],...b.drawers};}out.drawers=out.drawersBySubject[out.planSubject]||drawersForSubject(out.planSubject);return out}function activeDrawers(){const subject=el('planSubject')?.value||state.planSubject||'Maths';if(!state.drawersBySubject[subject])state.drawersBySubject[subject]=drawersForSubject(subject);return state.drawersBySubject[subject]}function persist(){try{localStorage.setItem(STORE,JSON.stringify(state));setStatus('saveStatus','Saved in this browser. Export JSON for a portable backup.')}catch(e){setStatus('saveStatus','Browser storage unavailable. Export JSON to keep your data.')}}
// Flush the latest in-memory state when the page is backgrounded or closed.
window.addEventListener('pagehide',()=>persist());
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persist()});
function el(id){return document.getElementById(id)}function setStatus(id,msg){el(id).textContent=msg}function fillSelect(node,values,selected){node.innerHTML='';values.forEach(v=>{let o=document.createElement('option');o.value=v;o.textContent=v;node.appendChild(o)});if(values.includes(selected))node.value=selected}function chapterKey(s,c,drawer){return s+'::'+c+'::'+drawer}function stageKey(s,c,st,drawer){return s+'::'+c+'::'+drawer+'::'+st}function qbKey(s,c,cat){return s+'::'+c+'::'+cat}function checkedLabel(label,checked,cls){return `<span class="${cls||''}">${label}</span>`}
function renderActivityStages(which){
 const subject=el(which+'Subject').value, chapter=el(which+'Chapter').value;
 const node=el(which==='qb'?'qbCategory':'dailyExercise');
 const old=node.value;
 const saved=which==='qb'?state.qbCategory:state.daily.exercise;
 const options=(subject!=='TEST' && chapter!=='RACE') ? (subject==='Maths'||subject==='Physics' ? [...PLAN_STAGES,'ADDITIONAL MATERIAL','Extra Source'] : [...PLAN_STAGES,'Extra Source']) : stagesFor(subject,chapter,'Current Chapter');
 fillSelect(node,options,options.includes(old)?old:saved);
 if(which==='qb')state.qbCategory=node.value;
 else state.daily.exercise=node.value;
}
function initSelects(){
 for(const id of ['planSubject','qbSubject','dailySubject'])
  fillSelect(el(id),SUBJECTS,id==='planSubject'?state.planSubject:id==='qbSubject'?(state.qbSubject||'Maths'):state.daily.subject);
 el('dailyDate').value=state.daily.date||new Date().toLocaleDateString('en-CA');
 renderChapterSelect('qb');renderChapterSelect('daily');
}
function renderChapterSelect(which){
 const subj=el(which+'Subject').value;
 const selected=which==='qb'?state.qbChapter:state.daily.chapter;
 fillSelect(el(which+'Chapter'),CHAPTERS[subj],selected);
 if(which==='qb'){
  state.qbSubject=subj;state.qbChapter=el('qbChapter').value;
 }else{
  state.daily.subject=subj;state.daily.chapter=el('dailyChapter').value;
 }
 renderActivityStages(which);
 if(which==='qb')loadQB();
}
function localISODate(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function studyDays(){
 const records=state.studyHistory||{},orbitDays=state.orbit?.daily||{};
 const dates=[...new Set([...Object.keys(records),...Object.keys(orbitDays)])].filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&d<=localISODate()).sort();
 if(!dates.length)return [];
 const days=[];let cursor=new Date(dates[0]+'T12:00:00'),last=new Date(localISODate()+'T12:00:00');
 while(cursor<=last && days.length<36500){const day=[cursor.getFullYear(),String(cursor.getMonth()+1).padStart(2,'0'),String(cursor.getDate()).padStart(2,'0')].join('-');const legacy=Math.max(0,Number(records[day])||0)/60,modern=Math.max(0,Number(orbitDays[day]?.hours)||0);days.push(modern||legacy);cursor.setDate(cursor.getDate()+1)}
 return days;
}
function renderSummary(){
 const included=SUBJECTS.filter(s=>s!=='TEST');let completed=0,totalStages=0,doneStages=0;
 for(const subject of included)for(const chapter of CHAPTERS[subject]){
  const stageNames=stagesFor(subject,chapter,'Current Chapter').filter(st=>!(subject==='Maths'&&['JEE MAIN Booklet ©','Gyanoday','ADDITIONAL MATERIAL'].includes(st))&&!(subject==='Physics'&&['JEE MAIN Booklet ©','ADDITIONAL MATERIAL'].includes(st))&&!(subject!=='Maths'&&subject!=='Physics'&&st==='JEE MAIN Booklet ©'));
  let chapterDone=0;
  for(const st of stageNames){totalStages++;const done=!!state.stageStatus[stageKey(subject,chapter,st,'Current Chapter')]||!!state.stageStatus[stageKey(subject,chapter,st,'Backlog')];if(done){doneStages++;chapterDone++}}
  if(stageNames.length && chapterDone===stageNames.length)completed++;
 }
 const total=included.reduce((n,s)=>n+CHAPTERS[s].length,0);
 el('totalChapters').textContent=total;el('completedCount').textContent=completed;
 const p=totalStages?100*doneStages/totalStages:0;
 el('percent').textContent=p.toFixed(1)+'%';el('progressBar').style.width=p+'%';
 el('distribution').textContent=`${doneStages} / ${totalStages} eligible stage ticks`;
 const days=studyDays();
 if(!days.length){el('medianStudyHours').textContent='—';el('consistencyPercent').textContent='—';el('consistencyBar').style.width='0%';el('studyMetricsHint').textContent='0 recorded study days';return}
 const ordered=[...days].sort((a,b)=>a-b),middle=Math.floor(ordered.length/2),median=ordered.length%2?ordered[middle]:(ordered[middle-1]+ordered[middle])/2;
 const mean=days.reduce((a,b)=>a+b,0)/days.length;
 const consistent=days.filter(h=>h>0 && h>=mean-1e-9).length;
 const consistency=100*consistent/days.length;
 el('medianStudyHours').textContent=mean.toFixed(2)+' h';el('consistencyPercent').textContent=consistency.toFixed(1)+'%';el('consistencyBar').style.width=consistency+'%';
 el('studyMetricsHint').textContent=`${days.length} recorded study day${days.length===1?'':'s'}`;
}
function premiumTintWords(root){ /* Deliberately disabled: consistent text hierarchy. */ }

function renderDrawers(){
 const host=el('drawers');
 // Keep each stage list open (and its scroll position) across checkbox-driven rerenders.
 // Only the user's own tap on its summary should close it.
 const menuStates=new Map(Array.from(host.querySelectorAll('.drawer')).map(node=>{
  const menu=node.querySelector('.stage-menu');
  const options=menu?.querySelector('.stage-options');
  return [node.dataset.drawer,{open:!!menu?.open,scrollTop:options?.scrollTop||0}];
 }));
 host.innerHTML='';const subject=el('planSubject').value;document.body.dataset.subject=subject;const drawers=activeDrawers();
 for(const name of drawerNames(subject)){
  const d=drawers[name],chapters=chaptersFor(subject,name);
  if(!chapters.includes(d.chapter))d.chapter=chapters[0];
  const availableStages=stagesFor(subject,d.chapter,name);
  if(!availableStages.includes(d.stage))d.stage=availableStages[0];
  const cDone=completionInfo(subject,d.chapter,name).complete;
  const sDone=!!state.stageStatus[stageKey(subject,d.chapter,d.stage,name)] || (name==='Backlog' && !!state.stageStatus[stageKey(subject,d.chapter,d.stage,'Current Chapter')]) || (name==='Current Chapter' && !!state.stageStatus[stageKey(subject,d.chapter,d.stage,'Backlog')]);
  const wrap=document.createElement('div');wrap.className='drawer';wrap.dataset.drawer=name;
  wrap.innerHTML=`<div class="drawerhead"><div class="row" style="justify-content:flex-start"><button data-action="collapse" data-name="${name}" aria-expanded="${d.on&&d.open}" ${d.on?'':'disabled'}>${d.on&&d.open?'▾':'▸'}</button><h3>${name}</h3></div><button data-action="toggle" data-name="${name}" aria-pressed="${d.on}">${d.on?'ON':'OFF'}</button></div><div class="drawerbody ${d.on?'':'off'} ${d.on&&d.open?'':'hidden'}"><div class="field"><label>Chapter</label><select data-role="chapter" data-name="${name}">${chapters.map(c=>`<option value="${c}" ${c===d.chapter?'selected':''}>${completionInfo(subject,c,name).ribbon?'🎗 ':completionInfo(subject,c,name).complete ? (name==='Revision'?'🔖🔖 ':name==='Backlog'?'🛡️ ':'🔖 ') : ''}${c}</option>`).join('')}</select></div><div class="check"><input type="checkbox" data-role="chapterDone" data-name="${name}" ${cDone?'checked':''}><label class="${cDone?'strike':''}">Chapter completed ${completionInfo(subject,d.chapter,name).ribbon?'🎗':''}</label></div><div class="field stage-picker"><label>Current Stage · tap a stage to select it, tick its box to complete</label><details class="stage-menu"><summary><span>${stageDisplay(d.stage,name)}</span><span class="stage-caret">▾</span></summary><div class="stage-options">${availableStages.map(st=>{const done=!!state.stageStatus[stageKey(subject,d.chapter,st,name)] || ((name==='Current Chapter'||name==='Backlog') && !!state.stageStatus[stageKey(subject,d.chapter,st,name==='Current Chapter'?'Backlog':'Current Chapter')]);return `<div class="stage-option ${st===d.stage?'selected':''}"><input type="checkbox" aria-label="Mark ${st} completed" data-role="stageItemDone" data-name="${name}" data-stage-value="${st.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" ${done?'checked':''}><button type="button" data-action="select-stage" data-name="${name}" data-stage-value="${st.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" class="stage-choice ${done?'strike':''}">${stageDisplay(st,name)}${st===d.stage?' <span class="current-tag">CURRENT</span>':''}</button></div>`}).join('')}</div></details></div></div>`;
  host.appendChild(wrap);
  const previous=menuStates.get(name);
  if(previous){
   const menu=wrap.querySelector('.stage-menu');
   menu.open=d.on&&previous.open;
   if(d.on&&previous.open)menu.querySelector('.stage-options').scrollTop=previous.scrollTop;
  }
 }
 premiumTintWords(host);
}
function isTheoryExercise(which){return (which==='qb'?el('qbCategory').value:el('dailyExercise').value).trim().toLowerCase()==='theory'}
function updateExerciseFields(){const qbTheory=isTheoryExercise('qb'),dailyTheory=isTheoryExercise('daily'),qbTest=el('qbSubject').value==='TEST',dailyTest=el('dailySubject').value==='TEST';el('qbSolvedField').classList.toggle('hidden',qbTheory&&!qbTest);el('qbAvgWrap').classList.toggle('hidden',qbTheory||qbTest);el('qbTheoryField').classList.toggle('hidden',!qbTheory||qbTest);el('dailySolvedField').classList.toggle('hidden',dailyTheory&&!dailyTest);el('dailyTheoryField').classList.toggle('hidden',!dailyTheory||dailyTest);el('dailyAvgField').classList.toggle('hidden',dailyTheory||dailyTest);}
function getQB(){return state.questionBank[qbKey(el('qbSubject').value,el('qbChapter').value,el('qbCategory').value)]||{total:'',solved:'',correct:'',theoryMinutes:'',avgTimePerQuestion:''}}
function saveQBFields(){const key=qbKey(el('qbSubject').value,el('qbChapter').value,el('qbCategory').value);state.questionBank[key]={...getQB(),total:el('qbTotal').value,solved:el('qbSolved').value,correct:el('qbCorrect').value,theoryMinutes:el('qbTheoryMinutes').value,avgTimePerQuestion:el('qbAvgTime').value};persist()}
function loadQB(){let q=getQB();el('qbTotal').value=q.total??'';el('qbSolved').value=q.solved??'';el('qbCorrect').value=q.correct??'';el('qbTheoryMinutes').value=q.theoryMinutes??'';el('qbAvgTime').value=q.avgTimePerQuestion??'';updateExerciseFields();setStatus('qbStatus','Record: '+qbKey(el('qbSubject').value,el('qbChapter').value,el('qbCategory').value));}
function updateDailyAverage(){const n=Number(el('dailySolved').value),m=Number(el('dailyTime').value);el('dailyAvgTime').value=n>0&&m>=0?(m/n).toFixed(2)+' min/question':'—'}function syncDailyFromUI(){state.daily={...state.daily,date:el('dailyDate').value,subject:el('dailySubject').value,chapter:el('dailyChapter').value,exercise:el('dailyExercise').value,solved:el('dailySolved').value,theoryMinutes:el('dailyTheoryMinutes').value,minutes:el('dailyTime').value,revision:el('dailyRevision').checked,hw:el('dailyHW').checked,note:el('dailyNote').value,doubts:el('dailyDoubts').value};updateDailyAverage();updateExerciseFields()}
function loadDaily(){let d=state.daily;el('dailyDate').value=d.date||new Date().toLocaleDateString('en-CA');el('dailySubject').value=d.subject||'Physics';renderChapterSelect('daily');renderActivityStages('daily');el('dailySolved').value=d.solved??0;el('dailyTheoryMinutes').value=d.theoryMinutes??0;el('dailyTime').value=d.minutes??0;el('dailyRevision').checked=!!d.revision;el('dailyHW').checked=!!d.hw;el('dailyNote').value=d.note||'';el('dailyDoubts').value=d.doubts||'';updateDailyAverage();updateExerciseFields()}
function snapshot(){syncDailyFromUI();return {app:'TRACKER',version:3,exportedAt:new Date().toISOString(),chapterStatus:state.chapterStatus,stageStatus:state.stageStatus,planning:{subject:el('planSubject').value,drawers:activeDrawers(),drawersBySubject:state.drawersBySubject},questionBank:state.questionBank,questionBankSelection:{subject:el('qbSubject').value,chapter:el('qbChapter').value,category:el('qbCategory').value},daily:state.daily,studyHistory:state.studyHistory,orbit:state.orbit||{}}}
function download(name,text,type){const blob=new Blob([text],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch(e){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}ta.remove();return ok}}
const MOTIVATION_QUOTES=[
 'Small steps. Serious results.','Consistency beats intensity.','One task closer.','Earn your confidence.','Focus now, flex later.','Progress is still progress.','Do the work. Trust it.','Discipline builds freedom.','Keep showing up.','Your future self is watching.','Less doubt, more doing.','Every rep counts.','Make today count.','Slow progress is real progress.','Master the basics.','Stay curious. Stay consistent.','Win the next 10 minutes.','Effort compounds quietly.','Be tougher than excuses.','Learn it. Apply it. Repeat.','You can do hard things.','One chapter at a time.','Build proof, not promises.','Focus is your superpower.','Start small. Finish strong.'
];
let lastMotivationQuote=-1;
function celebrateCompletion(target){
 // Completion feedback is text-only: no colored bursts, flashes, or pop effects.
 const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let idx=Math.floor(Math.random()*MOTIVATION_QUOTES.length);
 if(MOTIVATION_QUOTES.length>1&&idx===lastMotivationQuote)idx=(idx+1+Math.floor(Math.random()*(MOTIVATION_QUOTES.length-1)))%MOTIVATION_QUOTES.length;
 lastMotivationQuote=idx;
 if(!reduced){
  const toast=document.createElement('div');toast.className='motivation-toast';
  toast.textContent='✦ '+MOTIVATION_QUOTES[idx]+' ✦';document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),3000);
 }
}
function redraw(){renderSummary();renderDrawers();persist()}
el('planSubject').addEventListener('change',()=>{state.planSubject=el('planSubject').value;state.drawers=activeDrawers();renderDrawers();persist()});el('drawers').addEventListener('click',e=>{let b=e.target.closest('button[data-action]');if(!b)return;if(b.dataset.action==='select-stage'){const name=b.dataset.name,d=activeDrawers()[name];if(!d||!d.on)return;d.stage=b.dataset.stageValue;renderDrawers();const drawerEl=Array.from(el('drawers').querySelectorAll('.drawer')).find(x=>x.dataset.drawer===name);const menu=drawerEl?.querySelector('.stage-menu');if(menu)menu.open=true;persist();return}const d=activeDrawers()[b.dataset.name];if(b.dataset.action==='toggle'){d.on=!d.on;if(!d.on)d.open=false;}else{if(!d.on){d.open=false;redraw();return;}d.open=!d.open;}redraw()});el('drawers').addEventListener('change',e=>{let role=e.target.dataset.role,name=e.target.dataset.name;if(!role)return;let d=activeDrawers()[name],subject=el('planSubject').value;if(!d||!d.on)return;if(role==='chapter'){d.chapter=e.target.value;const opts=stagesFor(subject,d.chapter,name);if(!opts.includes(d.stage))d.stage=opts[0];renderDrawers()}else if(role==='stage'){d.stage=e.target.value;renderDrawers()}else if(role==='chapterDone'){
 const done=e.target.checked;
 if(subject==='TEST')state.chapterStatus[chapterKey(subject,d.chapter,name)]=done;
 else {
  // A manual chapter tick means all REQUIRED stages are ticked. Optional stages
  // remain untouched, so the ribbon still means genuinely ALL stages are done.
  for(const st of requiredChapterStages(subject,d.chapter,name)){
   state.stageStatus[stageKey(subject,d.chapter,st,name)]=done;
   if(name==='Current Chapter'||name==='Backlog'){
    const other=name==='Current Chapter'?'Backlog':'Current Chapter';
    state.stageStatus[stageKey(subject,d.chapter,st,other)]=done;
   }
  }
 }
 renderDrawers();renderSummary();if(done)celebrateCompletion(el('drawers'));
}else if(role==='stageItemDone'){const stage=e.target.dataset.stageValue,done=e.target.checked;state.stageStatus[stageKey(subject,d.chapter,stage,name)]=done;if(name==='Current Chapter'||name==='Backlog')state.stageStatus[stageKey(subject,d.chapter,stage,name==='Current Chapter'?'Backlog':'Current Chapter')]=done;const row=e.target.closest('.stage-option'),label=row?.querySelector('.stage-choice');if(label)label.classList.toggle('strike',done);if(name==='Current Chapter'||name==='Backlog'){const other=name==='Current Chapter'?'Backlog':'Current Chapter';const otherDrawer=Array.from(el('drawers').querySelectorAll('.drawer')).find(x=>x.dataset.drawer===other);const otherCheck=otherDrawer&&Array.from(otherDrawer.querySelectorAll('[data-role=stageItemDone]')).find(x=>x.dataset.stageValue===stage);if(otherCheck)otherCheck.checked=done;const otherLabel=otherCheck?.closest('.stage-option')?.querySelector('.stage-choice');if(otherLabel)otherLabel.classList.toggle('strike',done)}if(done)celebrateCompletion(el('drawers'));renderDrawers();renderSummary()}persist()});
['qbSubject','qbChapter','qbCategory'].forEach(id=>el(id).addEventListener('change',()=>{if(id==='qbSubject'){state.qbSubject=el(id).value;renderChapterSelect('qb')}else if(id==='qbChapter'){state.qbChapter=el(id).value;renderActivityStages('qb')}else state.qbCategory=el(id).value;loadQB();persist()}));['qbTotal','qbSolved','qbCorrect','qbTheoryMinutes','qbAvgTime'].forEach(id=>el(id).addEventListener('input',saveQBFields));el('copyQB').addEventListener('click',async()=>{saveQBFields();let obj={subject:el('qbSubject').value,chapter:el('qbChapter').value,category:el('qbCategory').value,...getQB()};setStatus('qbStatus',(await copyText(JSON.stringify(obj,null,2)))?'Question Bank entry copied.':'Copy unavailable. Select and copy the entry manually.');});
el('dailySubject').addEventListener('change',()=>{renderChapterSelect('daily');syncDailyFromUI();persist()});el('dailyChapter').addEventListener('change',()=>{renderActivityStages('daily');syncDailyFromUI();persist()});['dailyDate','dailyExercise','dailySolved','dailyTheoryMinutes','dailyTime','dailyRevision','dailyHW','dailyNote','dailyDoubts'].forEach(id=>el(id).addEventListener('change',()=>{syncDailyFromUI();persist()}));['dailyNote','dailyDoubts','dailySolved','dailyTheoryMinutes','dailyTime','dailyDate'].forEach(id=>el(id).addEventListener('input',()=>{syncDailyFromUI();persist()}));el('submitUpdate').addEventListener('click',()=>{syncDailyFromUI();const day=state.daily.date,minutes=Math.max(0,Number(state.daily.minutes)||0)+Math.max(0,Number(state.daily.theoryMinutes)||0);if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||day>localISODate()){setStatus('dailyStatus','Select a valid date up to today.');return}state.studyHistory=state.studyHistory||{};state.studyHistory[day]=(Number(state.studyHistory[day])||0)+minutes;renderSummary();const s=snapshot();el('dailySnapshot').textContent=JSON.stringify(s,null,2);el('snapshotWrap').classList.remove('hidden');setStatus('dailyStatus','Snapshot prepared. Copy it and paste it into this conversation; the page cannot send a message by itself.');persist()});el('copyDailySnapshot').addEventListener('click',async()=>setStatus('dailyStatus',(await copyText(el('dailySnapshot').textContent))?'Daily snapshot copied. Paste it into the conversation.':'Copy unavailable; select the snapshot text manually.'));
el('copyAll').addEventListener('click',async()=>{const t=JSON.stringify(snapshot(),null,2);el('fullData').textContent=t;el('fullDataWrap').classList.remove('hidden');setStatus('saveStatus',(await copyText(t))?'Full tracker data copied.':'Snapshot displayed below; select and copy it manually.')});el('exportJSON').addEventListener('click',()=>{download('TRACKER-backup.json',JSON.stringify(snapshot(),null,2),'application/json');setStatus('saveStatus','JSON snapshot exported. Keep it as your backup.')});el('restoreJSON').addEventListener('click',()=>{try{let x=JSON.parse(el('importJSON').value);if(!x||typeof x!=='object')throw Error('Invalid JSON');let src=x.planning?{version:3,chapterStatus:x.chapterStatus||{},stageStatus:x.stageStatus||{},planSubject:x.planning.subject||'Maths',drawers:x.planning.drawers||defaults().drawers,drawersBySubject:x.planning.drawersBySubject||{},questionBank:x.questionBank||{},daily:x.daily||defaults().daily,studyHistory:x.studyHistory||{},orbit:x.orbit||{}}:x;if(!src.drawers||!src.chapterStatus||!src.stageStatus||!src.questionBank||!src.daily)throw Error('Snapshot is missing required tracker sections');if((x.version||src.version||1)<3){
 const convertedCh={};for(const [k,v] of Object.entries(src.chapterStatus||{})){
  const parts=k.split('::');if(parts.length===2)convertedCh[k+'::Current Chapter']=v;else convertedCh[k]=v;
 }
 const convertedSt={};for(const [k,v] of Object.entries(src.stageStatus||{})){
  const parts=k.split('::');if(parts.length===3)convertedSt[[...parts.slice(0,2),'Current Chapter',parts[2]].join('::')]=v;
  else convertedSt[k]=v;
 }
 src.chapterStatus=convertedCh;src.stageStatus=convertedSt;
 }
 state=merge(defaults(),src);state.qbSubject=(x.questionBankSelection&&x.questionBankSelection.subject)||src.qbSubject||'Maths';state.qbChapter=(x.questionBankSelection&&x.questionBankSelection.chapter)||src.qbChapter||'FOA';state.qbCategory=(x.questionBankSelection&&x.questionBankSelection.category)||src.qbCategory||'Exercise 1';el('planSubject').value=state.planSubject;state.drawers=activeDrawers();initSelects();el('qbSubject').value=state.qbSubject;renderChapterSelect('qb');el('qbChapter').value=CHAPTERS[state.qbSubject].includes(state.qbChapter)?state.qbChapter:CHAPTERS[state.qbSubject][0];renderActivityStages('qb');loadDaily();renderDrawers();renderSummary();loadQB();persist();setStatus('restoreStatus','Snapshot restored. Theme and layout remain unchanged.')}catch(e){setStatus('restoreStatus','Restore failed: '+e.message)}});el('resetTracker').addEventListener('click',()=>{if(!confirm('Reset all progress and records in this browser? Export a backup first if needed.'))return;state=defaults();el('planSubject').value=state.planSubject;state.drawers=activeDrawers();initSelects();loadDaily();renderDrawers();renderSummary();loadQB();persist();setStatus('restoreStatus','Tracker reset. All progress records are now empty.');});
initSelects();el('planSubject').value=state.planSubject;state.drawers=activeDrawers();loadDaily();renderDrawers();renderSummary();loadQB();premiumTintWords(document.querySelector('main'));

// Top-level compact drawers: opening one folds the other two. Dashboard remains permanently open.
(function setupSectionAccordions(){
 const sections=[...document.querySelectorAll('.accordion-section')];
 function toggleSection(section){
   const shouldOpen=section.classList.contains('collapsed');
   sections.forEach(other=>{
     other.classList.toggle('collapsed',other!==section||!shouldOpen);
     const head=other.querySelector(':scope > h2, :scope > .qb-title-row');
     if(head)head.setAttribute('aria-expanded',String(!other.classList.contains('collapsed')));
   });
   // Keep the clicked heading at a stable position just below the mobile screen top.
   // Recalculate after other sections fold, so browser scroll anchoring cannot jump it.
   if(shouldOpen){
     const positionHeading=()=>{
       const heading=section.querySelector(':scope > h2, :scope > .qb-title-row');
       if(!heading)return;
       const desiredTop=68;
       const pageY=window.scrollY+heading.getBoundingClientRect().top-desiredTop;
       window.scrollTo({top:Math.max(0,pageY),behavior:'instant'});
     };
     requestAnimationFrame(()=>requestAnimationFrame(positionHeading));
   }
 }
 sections.forEach(section=>{
   const head=section.querySelector(':scope > h2, :scope > .qb-title-row');
   if(!head)return;
   head.addEventListener('click',e=>{
     if(e.target.closest('button,a,input,select,textarea,label'))return;
     toggleSection(section);
   });
   head.addEventListener('keydown',e=>{
     if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleSection(section)}
   });
 });
})();
