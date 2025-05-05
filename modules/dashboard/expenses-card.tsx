"use client"

import { ArrowDownRight, Receipt, Wallet, PieChart, TrendingDown, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function ExpensesCard() {
  // Datos simulados para gastos
  const expenses = [
    { category: "Suscripciones", amount: 8200, percentage: 65, color: "bg-orange-500" },
    { category: "Servidores", amount: 1500, percentage: 12, color: "bg-orange-400" },
    { category: "Marketing", amount: 1800, percentage: 14, color: "bg-orange-300" },
    { category: "Otros", amount: 1100, percentage: 9, color: "bg-orange-200" },
  ]

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className="w-full max-w-lg bg-gradient-to-br from-zinc-900/50 to-zinc-950 text-white border-zinc-800 shadow-xl">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-zinc-100 text-xl font-medium">Gastos Mensuales</CardTitle>
          <CardDescription className="text-zinc-400">Desglose de costos</CardDescription>
        </div>
        <div className="bg-zinc-800/50 p-2 rounded-full">
          <Receipt className="h-5 w-5 text-orange-400" />
        </div>
      </CardHeader>

      <CardContent className="pb-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-bold tracking-tight">$12.600</span>
          <Badge variant="outline" className="bg-orange-950/30 text-orange-400 border-orange-800 font-medium">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            1.8%
          </Badge>
        </div>
        <p className="text-sm text-zinc-400 mb-6">respecto al mes anterior</p>

        <div className="space-y-4">
          {expenses.map((expense, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-300">{expense.category}</span>
                <span className="font-medium">${expense.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={expense.percentage} className="h-2" indicatorClassName={expense.color} />
                <span className="text-xs text-zinc-400">{expense.percentage}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
          <div className="bg-zinc-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
              <Wallet className="h-3 w-3" />
              <span>Costo por cuenta</span>
            </div>
            <p className="text-lg font-medium">$420</p>
          </div>
          <div className="bg-zinc-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
              <TrendingDown className="h-3 w-3" />
              <span>Margen</span>
            </div>
            <p className="text-lg font-medium">15.4%</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-1 text-zinc-400 text-xs">
          <Calendar className="h-3 w-3" />
          <span>Actualizado: Mayo 2025</span>
        </div>
        <Button variant="ghost" size="sm" className="text-orange-400 hover:text-orange-300 hover:bg-orange-950/20 p-0">
          <span className="text-sm">Optimizar gastos</span>
          <PieChart className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
