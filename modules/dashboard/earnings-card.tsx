"use client"

import { useState } from "react"
import { ArrowUpRight, CreditCard, DollarSign, TrendingUp, Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function EarningsCard() {
  const [period, setPeriod] = useState("monthly")

  // Datos simulados para el gráfico
  const chartData = {
    monthly: [10800, 11500, 12200, 13100, 14200, 14900],
    yearly: [98000, 120000, 145000, 168000, 179000],
  }

  return (
    <Card className="w-full max-w-lg bg-gradient-to-br from-zinc-900/50 to-zinc-950 text-white border-zinc-800 shadow-xl ">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-zinc-100 text-xl font-medium">Ganancias Mensuales</CardTitle>
          <CardDescription className="text-zinc-400">Resumen financiero</CardDescription>
        </div>
        <div className="bg-zinc-800/50 p-2 rounded-full">
          <CreditCard className="h-5 w-5 text-emerald-400" />
        </div>
      </CardHeader>

      <CardContent className="pb-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-bold tracking-tight">$14.900</span>
          <Badge variant="outline" className="bg-emerald-950/30 text-emerald-400 border-emerald-800 font-medium">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            2.5%
          </Badge>
        </div>
        <p className="text-sm text-zinc-400 mb-6">respecto al mes anterior</p>

        <div className="relative h-24 mb-4">
          {/* Gráfico simplificado */}
          <div className="absolute inset-0 flex items-end justify-between gap-1">
            {chartData.monthly.map((value, i) => (
              <div
                key={i}
                className={`w-full rounded-t-sm ${
                  i === chartData.monthly.length - 1 ? "bg-emerald-500" : "bg-zinc-700"
                }`}
                style={{
                  height: `${(value / 15000) * 100}%`,
                  opacity: i === chartData.monthly.length - 1 ? 1 : 0.5 + i * 0.1,
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-zinc-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
              <TrendingUp className="h-3 w-3" />
              <span>Promedio</span>
            </div>
            <p className="text-lg font-medium">$12.783</p>
          </div>
          <div className="bg-zinc-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
              <DollarSign className="h-3 w-3" />
              <span>Anual</span>
            </div>
            <p className="text-lg font-medium">$179.000</p>
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
          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 p-0"
        >
          <span className="text-sm">Ver detalles</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
