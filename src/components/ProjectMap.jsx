"use client";
import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";

export default function ProjectMap({ location, name }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!location || !mapRef.current) return;

    const point = new Feature({
      geometry: new Point(fromLonLat([location.lng, location.lat])),
    });

    point.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // marker icon
          scale: 0.05,
        }),
      })
    );

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [point],
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
        center: fromLonLat([location.lng, location.lat]),
        zoom: 12,
      }),
    });

    return () => map.setTarget(null); // cleanup on unmount
  }, [location]);

  return <div ref={mapRef} className="w-full h-96 rounded shadow-lg" />;
}
