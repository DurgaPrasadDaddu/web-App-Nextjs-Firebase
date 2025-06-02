"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function ProjectDashboard() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", orders: "", lastOrder: "" });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      const querySnapshot = await getDocs(collection(db, "projects"));
      const firebaseProjects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(firebaseProjects);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        ...newProject,
        orders: parseInt(newProject.orders),
      });
      setProjects((prev) => [...prev, { id: docRef.id, ...newProject }]);
      setNewProject({ name: "", orders: "", lastOrder: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-sky-400 text-black px-4 py-2 rounded hover:bg-sky-300"
          >
            + New Project
          </button>
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
          >
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddProject} className="bg-gray-800 p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">Add New Project</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-gray-700"
            required
          />
          <input
            type="number"
            placeholder="Orders"
            value={newProject.orders}
            onChange={(e) => setNewProject({ ...newProject, orders: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-gray-700"
            required
          />
          <input
            type="date"
            placeholder="Last Order"
            value={newProject.lastOrder}
            onChange={(e) => setNewProject({ ...newProject, lastOrder: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-gray-700"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400"
            >
              Add Project
            </button>
          </div>
        </form>
      )}

      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-6 rounded bg-gray-800"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-400">Orders: {project.orders}</p>
            <p className="text-sm text-gray-400">
              Last Order: {project.lastOrder}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}