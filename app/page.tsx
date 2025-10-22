"use client";

import { useEffect, useState } from "react";
import type { MapContainerProps } from "react-leaflet";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { MapContainer, TileLayer, Polyline, Marker, Popup } = isClient
    ? require("react-leaflet")
    : ({} as typeof import("react-leaflet"));
  const L = isClient ? require("leaflet") : null;

  const route: [number, number][] = [
    [10.994, -74.807],
    [10.995, -74.805],
    [10.996, -74.804],
    [10.997, -74.802],
  ];

  const startIcon =
    L &&
    new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [30, 30],
    });

  const endIcon =
    L &&
    new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [30, 30],
    });

  return (
    <main className="min-h-screen flex justify-center items-center bg-yellow-50">
      <div className="w-[360px] bg-white rounded-3xl shadow-lg overflow-hidden relative flex flex-col items-center pb-8">

        {/* Flecha atrás */}
        <div className="absolute top-4 left-4 bg-white rounded-full shadow-md p-2 cursor-pointer z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="black"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        {/* MAPA */}
        <div className="relative h-[300px] w-full z-0">
          {isClient && (
            <MapContainer
              center={[10.995, -74.805]}
              zoom={15}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Polyline positions={route} color="orange" weight={5} />
              <Marker position={route[0]} icon={startIcon}>
                <Popup>Inicio</Popup>
              </Marker>
              <Marker position={route[route.length - 1]} icon={endIcon}>
                <Popup>Destino</Popup>
              </Marker>
            </MapContainer>
          )}
          {/* Distancia */}
          <div className="absolute bottom-4 left-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md">
            2.03 Km
          </div>
        </div>

        {/* Running Section (flotante separada) */}
        <div className="w-[90%] bg-black text-white rounded-2xl mt-6 px-6 py-5 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="black"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM6 9l6-1.5L17 9m-4 0l3 7m-6.5-6L8 17m9 0h2m-8 0H7"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">Running</p>
              <p className="text-xs text-gray-400">3000 meters per day</p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mt-4 w-full bg-gray-700 h-2 rounded-full">
            <div className="bg-yellow-400 h-2 rounded-full w-2/3"></div>
          </div>
        </div>

        {/* Today Stats */}
        <div className="bg-white px-6 py-5 mt-6 grid grid-cols-3 text-center text-gray-700 w-full">
          <div>
            <p className="text-lg font-semibold">2.03</p>
            <p className="text-xs">Kilometer</p>
          </div>
          <div>
            <p className="text-lg font-semibold">15</p>
            <p className="text-xs">Minutes</p>
          </div>
          <div>
            <p className="text-lg font-semibold">75</p>
            <p className="text-xs">Calories</p>
          </div>
        </div>
      </div>
    </main>
  );
}
