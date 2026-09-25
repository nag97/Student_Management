import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [branch, setBranch] = useState("");

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
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.branch}</td>
                  <td>View</td>
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