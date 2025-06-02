"use client";

export default function ProjectVideos({ project }) {
  if (!project?.videos || project.videos.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        No videos available for this project.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {project.videos.map((videoUrl, index) => (
        <div key={index} className="border border-gray-700 rounded overflow-hidden">
          <video
            src={videoUrl}
            controls
            className="w-full h-64 object-cover bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
}
