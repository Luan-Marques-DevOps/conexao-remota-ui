"use client";

import {
  Settings,
  Lock,
  Globe,
  Monitor,
  User,
  Info,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const sidebarOptions = [
  { label: "Geral", icon: <Settings size={18} />, key: "geral" },
  { label: "Segurança", icon: <Lock size={18} />, key: "seguranca" },
  { label: "Rede", icon: <Globe size={18} />, key: "rede" },
  { label: "Display", icon: <Monitor size={18} />, key: "display" },
  { label: "Conta", icon: <User size={18} />, key: "conta" },
  { label: "Sobre", icon: <Info size={18} />, key: "sobre" },
];

export default function Configuracoes() {
  const [active, setActive] = useState("geral");
  const [idioma, setIdioma] = useState("padrao");
  const [tema, setTema] = useState("sistema");

  const renderContent = () => {
    if (active === "geral") {
      return (
        <div className="flex flex-col gap-6 text-white">
          <div>
            <h2 className="text-lg font-bold">Serviço</h2>
            <Button type="button" className="mt-2 bg-red-600 hover:bg-red-700 text-white">
              Parar
            </Button>
          </div>

          <hr className="border-t border-blue-500" />

          <div>
            <h2 className="text-lg font-bold">Idioma</h2>
            <Select value={idioma} onValueChange={setIdioma}>
              <SelectTrigger className="mt-2 bg-gray-700 text-white border border-gray-600">
                <SelectValue placeholder="Padrão (Sistema)" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectItem value="es">Espanhol</SelectItem>
                <SelectItem value="en">Inglês</SelectItem>
                <SelectItem value="padrao">Padrão (Sistema)</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <hr className="border-t border-blue-500" />

          <div>
            <h2 className="text-lg font-bold mb-2">Tema</h2>
            <div className="flex flex-col gap-2 text-white">
          {["claro", "escuro", "sistema"].map((opcao) => (
            <label key={opcao} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="tema"
                value={opcao}
                checked={tema === opcao}
                onChange={() => setTema(opcao)}
                className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-500"
              />
              {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
            </label>
          ))}
        </div>

          </div>
        </div>
      );
    }

    return (
      <p className="text-white text-sm">
        Conteúdo da aba "{active}" ainda não implementado.
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6">
        <h2 className="text-2xl font-bold mb-4">Configurações</h2>
        <nav className="flex flex-col gap-3">
          {sidebarOptions.map(({ label, icon, key }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                active === key ? "bg-blue-600 text-white" : "hover:text-blue-400"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}