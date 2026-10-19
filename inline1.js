
if("serviceWorker" in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(error=>console.error("StudyOrbit service worker registration failed:",error));});}
