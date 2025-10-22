"use client";

import { useEffect, useState } from "react";
import {
  FaRoad,
  FaClock,
  FaFireFlameCurved,
  FaMoon,
  FaSun,
} from "react-icons/fa6";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
    <main
      className={`min-h-screen flex justify-center items-center transition-colors duration-500 ${
        darkMode ? "bg-[#0b0b0d]" : "bg-yellow-50"
      }`}
    >
      <div
        className={`relative w-[320px] h-[720px] rounded-3xl overflow-hidden flex flex-col items-center pb-4 shadow-lg transition-all duration-500 ${
          darkMode ? "bg-[#1a1a1d] text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Botón Modo Dark/Light */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-9 right-9 rounded-full shadow-md p-2 cursor-pointer z-20 transition-all duration-500 ${
            darkMode
              ? "bg-[#2c2c30] text-yellow-400 hover:bg-yellow-500 hover:text-black"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {darkMode ? (
            <FaSun className="w-4 h-4" />
          ) : (
            <FaMoon className="w-4 h-4" />
          )}
        </button>

        {/* Flecha atrás */}
        <div
          className={`absolute top-9 left-9 rounded-full shadow-md p-2 cursor-pointer z-20 transition-all duration-500 ${
            darkMode ? "bg-[#2c2c30] text-white" : "bg-white text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        {/* MAPA */}
        <div
          className={`relative h-[380px] w-[90%] mt-4 rounded-2xl overflow-hidden shadow-md z-0 ${
            darkMode ? "border border-gray-700" : ""
          }`}
        >
          {isClient && (
            <MapContainer
              center={[10.995, -74.805]}
              zoom={15}
              scrollWheelZoom={true}
              zoomControl={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url={
                  darkMode
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
              />
              <Polyline
                positions={route}
                color={darkMode ? "#facc15" : "orange"}
                weight={5}
              />
              <Marker position={route[0]} icon={startIcon}>
                <Popup>Inicio</Popup>
              </Marker>
              <Marker position={route[route.length - 1]} icon={endIcon}>
                <Popup>Destino</Popup>
              </Marker>
            </MapContainer>
          )}
          <div
            className={`absolute bottom-4 left-4 font-semibold px-4 py-2 rounded-lg shadow-md z-[9999] ${
              darkMode ? "bg-yellow-400 text-black" : "bg-yellow-400 text-black"
            }`}
          >
            2.03 Km
          </div>
        </div>

        {/* Running Section */}
        <div
          className={`w-[90%] rounded-4xl mt-6 px-6 py-5 shadow-md transition-all duration-500 ${
            darkMode ? "bg-[#242428] text-gray-100" : "bg-black text-white"
          }`}
        >
          <div className="flex items-center">
            <div className="px-2 flex justify-center w-[30%]">
              <div
                className={`p-3 rounded-full transition-all duration-500 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    darkMode ? "text-yellow-400" : "text-black"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM6 9l6-1.5L17 9m-4 0l3 7m-6.5-6L8 17m9 0h2m-8 0H7"
                  />
                </svg>
              </div>
            </div>

            <div className="w-[65%]">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-yellow-400" : "text-white"
                }`}
              >
                Running
              </p>
              <p
                className={`text-xs mb-2 ${
                  darkMode ? "text-gray-400" : "text-gray-300"
                }`}
              >
                3000 meters per day
              </p>
              <div
                className={`h-2 rounded-full w-full ${
                  darkMode ? "bg-gray-700" : "bg-gray-500"
                }`}
              >
                <div className="bg-yellow-400 h-2 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div
          className={`rounded-4xl p-4 mt-4 grid grid-cols-3 gap-4 shadow-md scale-90 transition-all duration-500 ${
            darkMode ? "bg-[#1f1f23] text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <p
            className={`col-span-3 text-lg font-semibold mb-1 ${
              darkMode ? "text-yellow-400" : "text-gray-800"
            }`}
          >
            Today
          </p>

          {/* Kilometers */}
          <div
            className={`rounded-xl flex flex-col items-center justify-center py-3 px-3 shadow-sm border transition-all duration-500 ${
              darkMode
                ? "bg-[#2b2b31] border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <FaRoad
              className={`text-2xl mb-1 ${
                darkMode ? "text-yellow-400" : "text-blue-500"
              }`}
            />
            <p
              className={`text-base font-semibold ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              2.03
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Kilometer
            </p>
          </div>

          {/* Minutes */}
          <div
            className={`rounded-xl flex flex-col items-center justify-center py-3 px-3 shadow-sm border transition-all duration-500 ${
              darkMode
                ? "bg-[#2b2b31] border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <FaClock
              className={`text-2xl mb-1 ${
                darkMode ? "text-yellow-400" : "text-yellow-500"
              }`}
            />
            <p
              className={`text-base font-semibold ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              15
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Minutes
            </p>
          </div>

          {/* Calories */}
          <div
            className={`rounded-xl flex flex-col items-center justify-center py-3 px-3 shadow-sm border transition-all duration-500 ${
              darkMode
                ? "bg-[#2b2b31] border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <FaFireFlameCurved
              className={`text-2xl mb-1 ${
                darkMode ? "text-yellow-400" : "text-orange-500"
              }`}
            />
            <p
              className={`text-base font-semibold ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              75
            </p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Calories
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
