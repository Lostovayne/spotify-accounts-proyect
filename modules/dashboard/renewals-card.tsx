"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, RefreshCw, UserMinus, UserPlus, Users } from "lucide-react";
import { useState } from "react";

export default function RenewalsCard() {
  const [period, setPeriod] = useState("monthly");

  // Datos de renovaciones
  const renewalRate = 78.5;
  const totalAccounts = 120;
  const newAccounts = 18;
  const canceledAccounts = 8;

  return (
    <Card className="w-full max-w-lg bg-gradient-to-br from-zinc-900/50 to-zinc-950 text-white border-zinc-800 shadow-xl">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-zinc-100 text-xl font-medium">
            Renovaciones
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Retención de cuentas
          </CardDescription>
        </div>
        <div className="bg-zinc-800/50 p-2 rounded-full">
          <RefreshCw className="h-5 w-5 text-purple-400" />
        </div>
      </CardHeader>

      <CardContent className="pb-0">
        <div className="flex flex-col items-center mb-4">
          <div className="relative flex items-center justify-center w-40 h-40 mb-2">
            {/* Gráfico circular */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Fondo del círculo */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3f3f46"
                strokeWidth="10"
              />
              {/* Arco de progreso */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#a855f7"
                strokeWidth="10"
                strokeDasharray={`${(2 * Math.PI * 40 * renewalRate) / 100} ${
                  (2 * Math.PI * 40 * (100 - renewalRate)) / 100
                }`}
                strokeDashoffset={(2 * Math.PI * 40 * 25) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{renewalRate}%</span>
              <span className="text-xs text-zinc-400">Renovaciones</span>
            </div>
          </div>

          <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-none">
            +3.2% vs mes anterior
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-zinc-800/30 rounded-lg p-3 flex flex-col items-center">
            <div className="flex items-center gap-1 text-zinc-400 text-xs mb-1">
              <Users className="h-3 w-3" />
              <span>Total</span>
            </div>
            <p className="text-lg font-medium">{totalAccounts}</p>
          </div>
          <div className="bg-zinc-800/30 rounded-lg p-3 flex flex-col items-center">
            <div className="flex items-center gap-1 text-green-400 text-xs mb-1">
              <UserPlus className="h-3 w-3" />
              <span>Nuevas</span>
            </div>
            <p className="text-lg font-medium">{newAccounts}</p>
          </div>
          <div className="bg-zinc-800/30 rounded-lg p-3 flex flex-col items-center">
            <div className="flex items-center gap-1 text-red-400 text-xs mb-1">
              <UserMinus className="h-3 w-3" />
              <span>Canceladas</span>
            </div>
            <p className="text-lg font-medium">{canceledAccounts}</p>
          </div>
        </div>

        <div className="bg-zinc-800/30 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-300">Servicios más renovados</span>
            <span className="text-xs text-zinc-500">% de renovación</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Netflix</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Disney+</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">HBO Max</span>
              <span className="text-sm font-medium">76%</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="monthly" className="w-full" onValueChange={setPeriod}>
          <TabsList className="grid grid-cols-3 bg-zinc-800/30">
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="yearly">Anual</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-1 text-zinc-400 text-xs">
          <Calendar className="h-3 w-3" />
          <span>Actualizado: Mayo 2025</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-950/20 p-0"
        >
          <span className="text-sm">Ver tendencias</span>
          <BarChart3 className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
