"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import LogoutButton from "../../lib/auth/logout";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectList = [];
      querySnapshot.forEach(doc => {
        projectList.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectList);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-400">📁 Projects</h1>
          <LogoutButton />
        </div>

        <input
          type="text"
          placeholder="🔍 Search projects..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 mb-6 focus:outline-none"
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="block bg-gray-900 p-4 rounded hover:bg-gray-800 transition border border-gray-700"
              >
                <h2 className="text-xl font-semibold text-yellow-300 mb-2">
                  {project.name}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {project.description || "No description available."}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-gray-400">No matching projects found.</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
