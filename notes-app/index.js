const root = document.getElementById("root");
let notes = JSON.parse(localStorage.getItem("notes")) || [];
console.log(notes);
if (notes && notes.length) {
  notes.forEach((note) => addNote(note.id, note.value));
}

function addNote(id, value) {
  if (id === undefined) {
    id = notes.length;
    notes.push({ id, value: "" });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  const container = document.createElement("div");
  container.className = "container";

  const note = document.createElement("textarea");
  note.innerText = value || "";
  note.addEventListener("change", (e) => {
    notes.find((n) => n.id === id).value = e.target.value;
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  const deleteBtn = document.createElement("a");
  deleteBtn.style.position = "absolute";
  deleteBtn.innerText = "X";
  deleteBtn.addEventListener("click", () => {
    notes = notes.filter((n) => n.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    container.remove();
  });

  container.append(note, deleteBtn);
  root.append(container);
}
