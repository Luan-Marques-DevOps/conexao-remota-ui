// src/app/settings/network/dialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface ProxyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProxyDialog({ open, onOpenChange }: ProxyDialogProps) {
  const [enabled, setEnabled] = useState(false);
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");

  const handleSave = () => {
    console.log("Salvar configurações:", { enabled, ip, port });
    onOpenChange(false); // Fecha o modal após salvar
  };

  const handleCancel = () => {
    onOpenChange(false); // Fecha o modal ao cancelar
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Proxy</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ativar Proxy</Label>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>
          <div>
            <Label htmlFor="ip">IP</Label>
            <Input
              id="ip"
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.0.1"
              disabled={!enabled}
            />
          </div>
         <div>
            <Label htmlFor="port">Porta</Label>
            <Input
              id="port"
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="8080"
              disabled={!enabled}
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            className="bg-transparent hover:bg-gray-100 text-gray-800"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
            disabled={!enabled || !ip || !port}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
}
