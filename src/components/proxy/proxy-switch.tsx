// src/components/proxy/proxy-switch.tsx
"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ProxySwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center space-x-3">
      <Label htmlFor="proxy-switch" className="text-white text-sm">
        Ativar Proxy
      </Label>
      <Switch
        id="proxy-switch"
        checked={enabled}
        onCheckedChange={onChange}
      />
    </div>
  );
}
