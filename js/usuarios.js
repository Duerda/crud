// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQXcDs-sjnO4fYj8mrD7BDZp6kPW5DGMo",
  authDomain: "jquery-firebase-4987e.firebaseapp.com",
  databaseURL: "https://jquery-firebase-4987e-default-rtdb.firebaseio.com",
  projectId: "jquery-firebase-4987e",
  storageBucket: "jquery-firebase-4987e.appspot.com",
  messagingSenderId: "280908793283",
  appId: "1:280908793283:web:9b2e0de94c701c7b222976"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("usuarios");

// Função para carregar os usuários na tabela
function carregarUsuarios() {
  db.on("value", (snapshot) => {
    const tbody = $("#tabelaUsuarios");
    tbody.empty();
    snapshot.forEach((child) => {
      const usuario = child.val();
      const key = child.key;
      tbody.append(`
        <tr>
          <td>${usuario.nome}</td>
          <td>${usuario.email}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">Editar</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">Excluir</button>
          </td>
        </tr>
      `);
    });
  });
}

// Cadastrar ou editar usuário
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

// Botão editar
$(document).on("click", ".edit-btn", function () {
  const id = $(this).data("id");
  db.child(id).get().then((snapshot) => {
    const usuario = snapshot.val();
    $("#id").val(id);
    $("#txtnome").val(usuario.nome);
    $("#txtemail").val(usuario.email);
  });
});

// Botão excluir
$(document).on("click", ".delete-btn", function () {
  const id = $(this).data("id");
  if (confirm("Deseja excluir este usuário?")) {
    db.child(id).remove();
  }
});

// Chama função ao iniciar
carregarUsuarios();
