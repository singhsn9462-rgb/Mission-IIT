
(()=>{
const count=document.getElementById('completedCount');if(!count)return;
const card=count.closest('.stat');
function showCompleted(){const old=document.getElementById('orbCompletedModal');if(old)old.remove();
 const overlay=document.createElement('div');overlay.id='orbCompletedModal';overlay.className='orb-completed-backdrop';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Completed chapters');
 const panel=document.createElement('div');panel.className='orb-completed-panel';panel.innerHTML='<h3>Completed Chapters</h3><button class="orb-completed-close" aria-label="Close">×</button><div class="orb-completed-scroll"></div>';
 overlay.appendChild(panel);const content=panel.querySelector('.orb-completed-scroll');
 try{let any=false;for(const subject of SUBJECTS.filter(s=>s!=='TEST')){const done=CHAPTERS[subject].filter(ch=>{const stages=stagesFor(subject,ch,'Current Chapter').filter(st=>!(subject==='Maths'&&['JEE MAIN Booklet ©','Gyanoday','ADDITIONAL MATERIAL'].includes(st))&&!(subject==='Physics'&&['JEE MAIN Booklet ©','ADDITIONAL MATERIAL'].includes(st))&&!(subject!=='Maths'&&subject!=='Physics'&&st==='JEE MAIN Booklet ©'));return stages.length&&stages.every(st=>state.stageStatus[stageKey(subject,ch,st,'Current Chapter')]||state.stageStatus[stageKey(subject,ch,st,'Backlog')])});if(done.length){any=true;const h=document.createElement('h4');h.textContent=subject+' ('+done.length+')';content.appendChild(h);const ul=document.createElement('ul');for(const ch of done){const li=document.createElement('li');li.textContent=ch;ul.appendChild(li)}content.appendChild(ul)}}if(!any)content.textContent='No completed chapters yet.'}catch(e){content.textContent='Unable to load chapter list.'}
 const close=()=>{overlay.remove();document.removeEventListener('keydown',onKey)};const onKey=e=>{if(e.key==='Escape')close()};panel.querySelector('button').onclick=close;overlay.onclick=e=>{if(e.target===overlay)close()};document.addEventListener('keydown',onKey);document.body.appendChild(overlay);panel.querySelector('button').focus();}
 card?.addEventListener('click',showCompleted);card?.setAttribute('role','button');card?.setAttribute('tabindex','0');card?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showCompleted()}});
})();
