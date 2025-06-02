"use client";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import Overlay from "ol/Overlay";
import Link from "next/link";

export default function AllProjectsMap() {
  const mapRef = useRef(null);
  const overlayRef = useRef(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectList = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.location?.lat && data.location?.lng) {
          projectList.push({ id: doc.id, ...data });
        }
      });
      setProjects(projectList);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!mapRef.current || projects.length === 0) return;

    const features = projects.map(proj => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([proj.location.lng, proj.location.lat])),
        projectId: proj.id,
        name: proj.name,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05,
          }),
        })
      );

      return feature;
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([78.486671, 17.385044]), // default center
        zoom: 5,
      }),
    });

    // Overlay for project name popup
    const overlay = new Overlay({
      element: overlayRef.current,
      autoPan: true,
      positioning: "bottom-center",
      offset: [0, -10],
    });
    map.addOverlay(overlay);

    map.on("click", function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        overlay.setPosition(coordinates);
        overlayRef.current.innerHTML = `
          <a href="/projects/${feature.get("projectId")}" class="text-yellow-400 underline text-sm">${feature.get("name")}</a>
        `;
      } else {
        overlay.setPosition(undefined);
      }
    });

    return () => map.setTarget(null);
  }, [projects]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🗺️ All Projects Map</h1>
      <div ref={mapRef} className="w-full h-[500px] rounded shadow-lg" />
      <div ref={overlayRef} className="absolute z-10 bg-black bg-opacity-80 px-3 py-1 rounded text-white text-sm"></div>
    </div>
  );
}
