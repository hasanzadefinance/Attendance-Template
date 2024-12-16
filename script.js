document.addEventListener("DOMContentLoaded", () => {
  // Sample data for students
  const students = [
    {
      name: "John Doe",
      sessions: [
        "present",
        "absent",
        "",
        "present",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
    },
    {
      name: "Jane Smith",
      sessions: [
        "",
        "",
        "present",
        "",
        "absent",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
    },
  ];

  const newStudents = {
    0: 'Ali Shah',
    1: 'Ehsan Ash',
    2: 'Navid Nam'
  }



  // Get the table with its class
  const table = document.getElementById("attendance-table");

  // Generate table rows dynamically from the data
  function generateTable() {
    // Get the body part from the table
    const tbody = table.querySelector("tbody");
    // Fully make the body part empty
    tbody.innerHTML = "";

    // Foreach student, do :
    newStudents.forEach((student, rowIndex) => {
      // Initially create a row
      const row = document.createElement("tr");

      // Add student name column
      const nameCell = document.createElement("td");
      nameCell.textContent = student.name;
      row.appendChild(nameCell);

      // For each session, do this:
      student.sessions.forEach((status, sessionIndex) => {
        const cell = document.createElement("td");
        // Class names are exactly the same as statuses
        cell.className = status;
        // Set the text content based on the status
        switch (status) {
          case "present":
            cell.textContent = "Present";
            break;
          case "absent":
            cell.textContent = "Absent";
            break;
          case "":
            cell.textContent = "";
        }
        cell.addEventListener("click", () => {
          // This again will intialize the table
          toggleStatus(cell, rowIndex, sessionIndex);
        });
        // Now add the cell
        row.appendChild(cell);
      });
      // Add the row to table
      tbody.appendChild(row);
    });
  }

  // Function to toggle attendance status and update the data
  function toggleStatus(cell, rowIndex, sessionIndex) {
    const currentStatus = cell.className;
    let nextStatus;
    if (currentStatus === "") {
      nextStatus = "present";
    } else if (currentStatus === "present") {
      nextStatus = "absent";
    } else {
      nextStatus = "";
    }

    cell.className = nextStatus;
    switch (nextStatus) {
      case "present":
        cell.textContent = "Present";
        break;
      case "absent":
        cell.textContent = "Absent";
        break;
      case "":
        cell.textContent = "";
    }
    // Update the data array
    students[rowIndex].sessions[sessionIndex] = nextStatus;
    console.log("Updated Data:", students); // For debugging
  }

  // Initialize the table
  generateTable();
});
