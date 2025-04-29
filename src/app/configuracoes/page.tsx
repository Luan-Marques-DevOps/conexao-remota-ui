"use client";

import {
  Settings,
  Lock,
  Globe,
  Monitor,
  User,
  Info,
  Eye,
  EyeOff
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const sidebarOptions = [
  { label: "Geral", icon: <Settings size={18} />, key: "geral" },
  { label: "Segurança", icon: <Lock size={18} />, key: "seguranca" },
  { label: "Rede", icon: <Globe size={18} />, key: "rede" },
  { label: "Display", icon: <Monitor size={18} />, key: "display" },
  { label: "Conta", icon: <User size={18} />, key: "conta" },
  { label: "Sobre", icon: <Info size={18} />, key: "sobre" }
];

export default function Configuracoes() {
  const [active, setActive] = useState("geral");
  const [idioma, setIdioma] = useState("padrao");
  const [tema, setTema] = useState("sistema");
  const [permissoes, setPermissoes] = useState<string[]>([]);
  const [tipoSenha, setTipoSenha] = useState<"unica" | "permanente" | "">("");
  const [showPassword, setShowPassword] = useState(false);

  // Proxy
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [proxyIP, setProxyIP] = useState("");
  const [proxyPort, setProxyPort] = useState("");

  const togglePermissao = (permissao: string) => {
    setPermissoes(prev =>
      prev.includes(permissao) ? prev.filter(p => p !== permissao) : [...prev, permissao]
    );
  };

  const handleSaveProxy = () => {
    console.log("Proxy Enabled:", proxyEnabled);
    console.log("Proxy IP:", proxyIP);
    console.log("Proxy Port:", proxyPort);
  };

  const renderContent = () => {
    if (active === "geral") {
      return (
        <div className="flex flex-col gap-6 text-white">
          <h2 className="text-lg font-bold">Serviço</h2>
          <Button type="button" className="w-fit px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm">
            Parar
          </Button>
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
              {["claro", "escuro", "sistema"].map(opcao => (
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

    if (active === "seguranca") {
      const permissoesDisponiveis = [
        "Habilitar teclado/mouse",
        "Habilitar Área de Transferência",
        "Habilitar Transferência de Arquivos",
        "Habilitar áudio",
        "Habilitar Tunelamento TCP",
        "Habilitar Reinicialização Remota",
        "Habilitar gravação de sessão",
        "Habilitar bloqueio da entrada do usuário",
        "Habilitar modificações de configuração remotas"
      ];

      return (
        <div className="flex flex-col gap-6 text-white">
          <h2 className="text-lg font-bold">Permissões</h2>
          <div className="flex flex-col gap-2">
            {permissoesDisponiveis.map(permissao => (
              <label key={permissao} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={permissoes.includes(permissao)}
                  onChange={() => togglePermissao(permissao)}
                  className="h-4 w-4 accent-blue-500"
                />
                {permissao}
              </label>
            ))}
          </div>

          <hr className="border-t border-blue-500 my-4" />

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Senha</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="senha"
                value="unica"
                checked={tipoSenha === "unica"}
                onChange={() => setTipoSenha("unica")}
                className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-500"
              />
              Usar senha de uso único
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="senha"
                value="permanente"
                checked={tipoSenha === "permanente"}
                onChange={() => setTipoSenha("permanente")}
                className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-blue-500"
              />
              Utilizar senha permanente
            </label>
            {tipoSenha === "permanente" && (
              <Button className="w-fit px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm">
                Configurar senha permanente
              </Button>
            )}
          </div>

          <hr className="border-t border-blue-500 my-4" />

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Segurança</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 accent-blue-500" />
              Habilitar compartilhamento de sessão RDP
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 accent-blue-500" />
              Negar descoberta da LAN
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 accent-blue-500" />
              Utilizar lista de IPs confiáveis
            </label>
          </div>
        </div>
      );
    }

    if (active === "rede") {
      return (
        <div className="text-white">
          <h2 className="text-lg font-bold mb-4">Proxy</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1">
                Configurar Proxy
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white border border-gray-600 rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-white text-lg mb-4">Configurar Proxy</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="flex items-center justify-between">
                  <Label>Ativar Proxy</Label>
                  <Switch checked={proxyEnabled} onCheckedChange={setProxyEnabled} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proxy-ip">IP do Proxy</Label>
                  <Input
                    id="proxy-ip"
                    placeholder="Ex: 192.168.0.1"
                    value={proxyIP}
                    onChange={(e) => setProxyIP(e.target.value)}
                    disabled={!proxyEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proxy-port">Porta</Label>
                  <Input
                    id="proxy-port"
                    placeholder="Ex: 8080"
                    value={proxyPort}
                    onChange={(e) => setProxyPort(e.target.value)}
                    disabled={!proxyEnabled}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="ghost">Cancelar</Button>
                <Button onClick={handleSaveProxy}>Salvar</Button>
              </div>

            </DialogContent>
          </Dialog>
        </div>
      );
    }

    if (active === "conta") {
      return (
        <div className="text-white">
          <h2 className="text-lg font-bold mb-4">Conta</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1">
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white border border-gray-600 rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-white text-lg mb-4">Login</DialogTitle>
              </DialogHeader>
              <div className="mb-4 relative">
                <Label className="block mb-1">Nome de usuário</Label>
                <div className="flex items-center bg-gray-700 text-white border border-gray-600 rounded px-3">
                  <User className="mr-2" size={16} />
                  <input
                    type="text"
                    placeholder="Digite seu nome de usuário"
                    className="bg-transparent outline-none py-2 w-full"
                  />
                </div>
              </div>
              <div className="mb-6 relative">
                <Label className="block mb-1">Senha</Label>
                <div className="flex items-center bg-gray-700 text-white border border-gray-600 rounded px-3">
                  <Lock className="mr-2" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="bg-transparent outline-none py-2 w-full"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm">Entrar</Button>
                <Button variant="ghost" className="text-white px-4 py-1 text-sm">Cancelar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    }

    return <p className="text-white text-sm">Conteúdo da aba &quot;{active}&quot; ainda não implementado.</p>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
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
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}