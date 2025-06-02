"use client";

export default function ProjectImages({ project }) {
  if (!project?.images || project.images.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        No images available for this project.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {project.images.map((url, index) => (
        <div key={index} className="rounded overflow-hidden border border-gray-700">
          <img
            src={url}
            alt={`Project Image ${index + 1}`}
            className="w-full h-60 object-cover transition-transform hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
