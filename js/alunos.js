const firebaseConfig = {
  apiKey: "AIzaSyAQXcDs-sjnO4fYj8mrD7BDZp6kPW5DGMo",
  authDomain: "jquery-firebase-4987e.firebaseapp.com",
  databaseURL: "https://jquery-firebase-4987e-default-rtdb.firebaseio.com",
  projectId: "jquery-firebase-4987e",
  storageBucket: "jquery-firebase-4987e.appspot.com",
  messagingSenderId: "280908793283",
  appId: "1:280908793283:web:9b2e0de94c701c7b222976"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("alunos");

function carregarAlunos() {
  db.on("value", (snapshot) => {
    const tbody = $("#tabelaAlunos");
    tbody.empty();
    snapshot.forEach((child) => {
      const aluno = child.val();
      const key = child.key;
      tbody.append(`
        <tr>
          <td>${aluno.nome}</td>
          <td>${aluno.email}</td>
          <td>${aluno.telefone}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      `);
    });
  });
}

$("#formAluno").submit(function (e) {
  e.preventDefault();
  const id = $("#id").val();
  const nome = $("#txtnome").val();
  const email = $("#txtemail").val();
  const telefone = $("#txttelefone").val();
  if (id) {
    db.child(id).update({ nome, email, telefone });
  } else {
    db.push({ nome, email, telefone });
  }
  this.reset();
  $("#id").val("");
});

$(document).on("click", ".edit-btn", function () {
  const id = $(this).data("id");
  db.child(id).get().then((snapshot) => {
    const aluno = snapshot.val();
    $("#id").val(id);
    $("#txtnome").val(aluno.nome);
    $("#txtemail").val(aluno.email);
    $("#txttelefone").val(aluno.telefone);
  });
});

$(document).on("click", ".delete-btn", function () {
  const id = $(this).data("id");
  if (confirm("Tem certeza que deseja excluir este aluno?")) {
    db.child(id).remove();
  }
});

carregarAlunos();
