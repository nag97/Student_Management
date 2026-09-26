import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [branch, setBranch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editBranch, setEditBranch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log("Error fetching students:", error);
      });
  }, []);

  function addStudent(e) {
    console.log(e)
    e.preventDefault();

    fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: Number(age),
        branch: branch,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents([...students, data]);

        setName("");
        setAge("");
        setBranch("");
      })
      .catch((error) => {
        console.log("Error adding student:", error);
      });
  }

  function deleteStudent(id) {
  fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      setStudents(students.filter((student) => student._id !== id));
    })
    .catch((error) => {
      console.log("Error deleting student:", error);
    });
}
  function editStudent(student) {
  setEditId(student._id);
  setEditName(student.name);
  setEditAge(student.age);
  setEditBranch(student.branch);
}

function updateStudent(id) {
  fetch(`http://localhost:3000/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: editName,
      age: Number(editAge),
      branch: editBranch,
    }),
  })
    .then((res) => res.json())
    .then((updatedStudent) => {
      setStudents(
        students.map((student) =>
          student._id === id ? updatedStudent : student
        )
      );

      setEditId(null);
    })
    .catch((error) => {
      console.log("Error updating student:", error);
    });
}

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>StudentMS</h2>

        <nav>
          <button>Dashboard</button>
          <button>Students</button>
          <button>Attendance</button>
          <button>Marks</button>
          <button>Settings</button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="profile">👤 Nagaraj</div>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>

          <div className="card">
            <h3>Teachers</h3>
            <p>8</p>
          </div>

          <div className="card">
            <h3>Classes</h3>
            <p>6</p>
          </div>
        </section>

        <section className="students-section">
          <div className="section-header">
            <h2>Students</h2>
          </div>

          <form className="add-student-form" onSubmit={addStudent}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <input
              type="text"
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />

            <button type="submit">Add Student</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Branch</th>
                <th>Action</th>
              </tr>
            </thead>

<tbody>
  {students.map((student) => (
    <tr key={student._id}>
      {editId === student._id ? (
        <>
          <td>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </td>

          <td>
            <input
              type="number"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
            />
          </td>

          <td>
            <input
              value={editBranch}
              onChange={(e) => setEditBranch(e.target.value)}
            />
          </td>

          <td>
            <button onClick={() => updateStudent(student._id)}>
              Save
            </button>

            <button onClick={() => setEditId(null)}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{student.name}</td>
          <td>{student.age}</td>
          <td>{student.branch}</td>

          <td>
            <button onClick={() => editStudent(student)}>
              Edit
            </button>

            <button onClick={() => deleteStudent(student._id)}>
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;