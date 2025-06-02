"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProjectImages from "../../../components/ProjectImages";
import ProjectVideos from "../../../components/ProjectVideos";
import ProjectMap from "../../../components/ProjectMap";
import ProjectChart from "../../../components/ProjectChart";
import LogoutButton from "../../../lib/auth/logout";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tab, setTab] = useState("images");

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchProject();
  }, [id]);

  const renderTab = () => {
    switch (tab) {
      case "images":
        return <ProjectImages project={project} />;
      case "videos":
        return <ProjectVideos project={project} />;
      case "map":
        return <ProjectMap project={project} />;
      case "charts":
        return <ProjectChart />;
      default:
        return null;
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-yellow-400">{project.name}</h1>
        <LogoutButton />
      </div>

      <div className="flex gap-4 mb-6">
        {["images", "videos", "map", "charts"].map(item => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`capitalize px-4 py-2 rounded ${
              tab === item ? "bg-yellow-400 text-black font-semibold" : "bg-gray-800 text-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 p-4 rounded-lg shadow">{renderTab()}</div>
    </div>
  );
}
