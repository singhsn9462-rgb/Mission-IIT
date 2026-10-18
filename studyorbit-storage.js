/* StudyOrbit IIT storage health tools. Existing data schema is unchanged. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const pretty=n=>Number.isFinite(n)?(n/1048576).toFixed(2)+' MB':'Unavailable';
async function refresh(){const out=$('orbitStorageInfo');if(!out)return;
 try{if(!navigator.storage?.estimate){out.textContent='Storage estimate unavailable in this browser. Export backups regularly.';return;}
 const e=await navigator.storage.estimate();const persistent=await navigator.storage.persisted?.().catch(()=>false);
 out.textContent=`Browser storage: ${pretty(e.usage)} used / ${pretty(e.quota)} estimated · Protection: ${persistent?'Enabled':'Not enabled'}.`;
 }catch(_){out.textContent='Storage status unavailable. Export backups regularly.';}}
 document.addEventListener('DOMContentLoaded',()=>{const btn=$('orbitProtectStorage');if(!btn)return;
 btn.addEventListener('click',async()=>{const status=$('orbitStorageAction');
 if(!navigator.storage?.persist){status.textContent='This browser does not support persistent storage requests.';return;}
 try{const granted=await navigator.storage.persist();status.textContent=granted?'Storage protection enabled by browser. Keep JSON backups too.':'Browser did not grant persistent storage. Keep JSON backups.';}
 catch(_){status.textContent='Storage protection unavailable. Keep JSON backups.';}
 refresh();});
 $('orbitRefreshStorage')?.addEventListener('click',refresh);refresh();
 });
})();
