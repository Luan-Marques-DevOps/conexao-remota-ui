"use client";

import { Settings, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-4xl flex flex-col md:flex-row gap-10">
        {/* Lado esquerdo - ID e Senha */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {/* Texto de alerta */}
          <div>
            <h2 className="text-lg font-bold">SEU COMPUTADOR</h2>
            <p className="text-sm text-gray-300 mt-1">
              <strong className="text-red-400">CUIDADO!</strong> Qualquer pessoa
              pode conectar no seu computador
              e ter acesso se souber o seu ID e
              Senha.
            </p>
          </div>

          {/* Campo ID */}
          <div>
            <label className="block text-sm font-semibold mb-1">ID:</label>
            <input
              type="text"
              value="1 356 023 142"
              readOnly
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <label className="block text-sm font-semibold mb-1">SENHA:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value="senhaSecreta123"
                readOnly
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Botão de configurações */}
          <div className="mt-auto flex justify-end">
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => router.push("/configuracoes")}
            >
              <Settings size={24} />
            </button>
          </div>
        </div>

        {/* Lado direito - Conectar por IP */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <label className="text-sm font-semibold">CONTROLE REMOTO POR IP:</label>
          <input
            type="text"
            placeholder="192.168.7.111"
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow text-white self-start">
            CONECTAR
          </button>
        </div>
      </div>
    </div>
  );
}
