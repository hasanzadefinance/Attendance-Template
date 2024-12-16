const students = {
  0: "احسان رضایی",
  1: "علی",
  2: "ابوالفضل",
  3: "مریم",
  4: "سارا",
  5: "حسین",
  6: "فاطمه",
  7: "رضا",
  8: "نیما",
  9: "سمیرا",
};

const prevSessions = [
  {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 0,
    5: 1,
    6: 0,
    7: 1,
    8: 1,
    9: 0,
  },
  {
    0: 0,
    1: 0,
    2: 1,
    3: 1,
    4: 1,
    5: 0,
    6: 1,
    7: 0,
    8: 0,
    9: 1,
  },
  {
    0: 1,
    1: 1,
    2: 0,
    3: 1,
    4: 0,
    5: 1,
    6: 1,
    7: 0,
    8: 1,
    9: 1,
  },
  {
    0: 1,
    1: 0,
    2: 1,
    3: 0,
    4: 1,
    5: 1,
    6: 0,
    7: 1,
    8: 0,
    9: 1,
  },
  {
    0: 0,
    1: 1,
    2: 0,
    3: 1,
    4: 1,
    5: 0,
    6: 1,
    7: 1,
    8: 0,
    9: 0,
  },
  {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
  },
  {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  },
  {
    0: 1,
    1: 0,
    2: 0,
    3: 1,
    4: 1,
    5: 0,
    6: 1,
    7: 0,
    8: 1,
    9: 1,
  },
  {
    0: 1,
    1: 1,
    2: 1,
    3: 0,
    4: 1,
    5: 1,
    6: 0,
    7: 1,
    8: 0,
    9: 1,
  },
  {
    0: 0,
    1: 1,
    2: 1,
    3: 1,
    4: 0,
    5: 0,
    6: 1,
    7: 1,
    8: 1,
    9: 0,
  },
];

let currentAttendance = {};
for (let stdId of Object.keys(students)) {
  currentAttendance[stdId] = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  

  //   Set the icon in current session header
  const len = prevSessions.length;
  document.querySelectorAll("th").forEach((th, i) => {
    if (len === i - 1) {
      th.textContent = th.textContent + " (✩)";
      th.style.backgroundColor = '#6A0DC2'
    }
  });

  const table = document.getElementById("attendance-table");

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  // Creating name cells
  Object.entries(students).forEach(([studentId, studentName]) => {
    const row = document.createElement("tr");
    row.classList.add("student-row");
    row.setAttribute("student-id", studentId);
    const nameCell = document.createElement("td");
    nameCell.textContent = studentName;
    nameCell.classList.add("name-cell");
    row.appendChild(nameCell);
    tbody.appendChild(row);
  });

  // Creating previous sessions
  const rows = document.querySelectorAll(".student-row");
  prevSessions.forEach((session, i) => {
    rows.forEach((row) => {
      const cell = document.createElement("td");
      const status = session[row.getAttribute("student-id")];
      cell.textContent = status === 1 ? "✔" : "✖";
      cell.className = status === 1 ? "present" : "absent";
      row.appendChild(cell);
    });
  });

  const remainingCells = 16 - prevSessions.length;

  for (let i = 0; i < remainingCells; i++) {
    rows.forEach((row) => {
      const cell = document.createElement("td");
      row.appendChild(cell);
      if (i === 0) {
        cell.classList.add("cursor-pointer");
        cell.addEventListener("click", (e) => {
          toggleStatus(cell, e);
        });
      }
    });
  }

  function toggleStatus(cell, e) {
    const studentId = e.target.parentElement.getAttribute("student-id");
    let status = currentAttendance[studentId];
    // Toggle the status
    if (status == 0) {
      cell.className = "present cursor-pointer";
      cell.textContent = "✔";
      status = 1;
    } else {
      cell.className = "absent cursor-pointer";
      cell.textContent = "✖";
      status = 0;
    }

    currentAttendance[studentId] = status;
  }
});

function submit() {
  console.log(currentAttendance);
}
