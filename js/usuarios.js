const firebaseConfig = {
  apiKey: "AIzaSyCa-Tj46HGm5IkeIwPj5HrEkTrPiC5CloI",
  authDomain: "jquery-816ed.firebaseapp.com",
  databaseURL: "https://jquery-816ed-default-rtdb.firebaseio.com",
  projectId: "jquery-816ed",
  storageBucket: "jquery-816ed.firebasestorage.app",
  messagingSenderId: "266132617291",
  appId: "1:266132617291:web:a8247d1b631ac1ec8bf5ce",
  measurementId: "G-LHVYV58S4V"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("usuarios");

function carregarUsuarios() {
  db.on("value", (snapshot) => {
    const tbody = $("#tabelaUsuarios");
    tbody.empty();
    snapshot.forEach((child) => {
      const user = child.val();
      const key = child.key;
      tbody.append(`
        <tr>
          <td>${user.nome}</td>
          <td>${user.email}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${key}"><i class="bi bi-pencil-fill"></i></button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${key}"><i class="bi bi-trash-fill"></i></button>
          </td>
        </tr>
      `);
    });
  });
}

$("#formUsuario").submit(function (e) {
  e.preventDefault();
  const id = $("#id").val();
  const nome = $("#txtnome").val();
  const email = $("#txtemail").val();

  if (id) {
    db.child(id).update({ nome, email });
  } else {
    db.push({ nome, email });
  }

  this.reset();
  $("#id").val("");
});

$(document).on("click", ".edit-btn", function () {
  const id = $(this).data("id");
  db.child(id).get().then((snapshot) => {
    const user = snapshot.val();
    $("#id").val(id);
    $("#txtnome").val(user.nome);
    $("#txtemail").val(user.email);
  });
});

$(document).on("click", ".delete-btn", function () {
  const id = $(this).data("id");
  if (confirm("Deseja excluir este usuário?")) {
    db.child(id).remove();
  }
});

carregarUsuarios();
