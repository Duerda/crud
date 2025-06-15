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
const db = firebase.database().ref("cursos");

function carregarCursos() {
  db.on("value", (snapshot) => {
    const tbody = $("#tabelaCursos");
    tbody.empty();
    snapshot.forEach((child) => {
      const curso = child.val();
      const key = child.key;
      tbody.append(`
        <tr>
          <td>${curso.nome}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${key}">Editar</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${key}">Excluir</button>
          </td>
        </tr>
      `);
    });
  });
}

$("#formCurso").submit(function (e) {
  e.preventDefault();
  const id = $("#id").val();
  const nome = $("#txtnome").val();

  if (id) {
    db.child(id).update({ nome });
  } else {
    db.push({ nome });
  }

  this.reset();
  $("#id").val("");
});

$(document).on("click", ".edit-btn", function () {
  const id = $(this).data("id");
  db.child(id).get().then((snapshot) => {
    const curso = snapshot.val();
    $("#id").val(id);
    $("#txtnome").val(curso.nome);
  });
});

$(document).on("click", ".delete-btn", function () {
  const id = $(this).data("id");
  if (confirm("Deseja excluir este curso?")) {
    db.child(id).remove();
  }
});

carregarCursos();
