"use client"

import type React from "react"

import { useState } from "react"
import {
  Calendar,
  CreditCard,
  DollarSign,
  Edit,
  MoreVertical,
  RefreshCw,
  Trash2,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Tipos de servicios de streaming soportados
export type StreamingService = "netflix" | "disney" | "hbo" | "prime" | "spotify" | "apple" | "youtube" | "paramount"

// Tipo de cuenta
export type AccountType = "family" | "individual" | "available"

// Estado de la cuenta
export type AccountStatus = "active" | "expiring" | "problem" | "new"

// Interfaz para los datos de la cuenta
export interface AccountData {
  id: string
  service: StreamingService
  type: AccountType
  status: AccountStatus
  monthlyCost: number
  monthlyRevenue: number
  currentMonthRevenue: number
  renewalDate: string
  members?: number
  maxMembers?: number
  email: string
  password: string
  profileName?: string
  createdAt: string
  lastRenewal: string
}

// Configuración de colores y logos por servicio
const serviceConfig: Record<StreamingService, { color: string; logo: string; name: string }> = {
  netflix: {
    color: "bg-red-600",
    logo: "N",
    name: "Netflix",
  },
  disney: {
    color: "bg-blue-600",
    logo: "D+",
    name: "Disney+",
  },
  hbo: {
    color: "bg-purple-700",
    logo: "HBO",
    name: "HBO Max",
  },
  prime: {
    color: "bg-blue-500",
    logo: "P",
    name: "Prime Video",
  },
  spotify: {
    color: "bg-green-600",
    logo: "S",
    name: "Spotify",
  },
  apple: {
    color: "bg-gray-800",
    logo: "TV+",
    name: "Apple TV+",
  },
  youtube: {
    color: "bg-red-700",
    logo: "YT",
    name: "YouTube Premium",
  },
  paramount: {
    color: "bg-blue-800",
    logo: "P+",
    name: "Paramount+",
  },
}

// Configuración de estado
const statusConfig: Record<AccountStatus, { icon: React.ReactNode; color: string; text: string }> = {
  active: {
    icon: <CheckCircle className="h-4 w-4" />,
    color: "text-green-500",
    text: "Activa",
  },
  expiring: {
    icon: <Calendar className="h-4 w-4" />,
    color: "text-amber-500",
    text: "Próxima a renovar",
  },
  problem: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "text-red-500",
    text: "Problema",
  },
  new: {
    icon: <Shield className="h-4 w-4" />,
    color: "text-blue-500",
    text: "Nueva",
  },
}

interface AccountCardProps {
  account: AccountData
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onRenew?: (id: string) => void
}

export default function AccountCard({ account, onEdit, onDelete, onRenew }: AccountCardProps) {
  const [showCredentials, setShowCredentials] = useState(false)

  // Calcular días restantes para renovación
  const daysUntilRenewal = () => {
    const today = new Date()
    const renewal = new Date(account.renewalDate)
    const diffTime = renewal.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const remainingDays = daysUntilRenewal()
  const serviceInfo = serviceConfig[account.service]
  const statusInfo = statusConfig[account.status]

  // Calcular porcentaje de ocupación para cuentas familiares
  const occupancyPercentage =
    account.type === "family" && account.members && account.maxMembers
      ? (account.members / account.maxMembers) * 100
      : null

  // Calcular rentabilidad
  const profitability = ((account.monthlyRevenue - account.monthlyCost) / account.monthlyCost) * 100

  return (
    <Card className="w-full bg-zinc-900 border-zinc-800 text-white shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Cabecera con logo del servicio */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div
              className={`${serviceInfo.color} w-10 h-10 rounded-md flex items-center justify-center font-bold text-white`}
            >
              {serviceInfo.logo}
            </div>
            <div>
              <h3 className="font-medium">{serviceInfo.name}</h3>
              <div className="flex items-center gap-1 text-sm">
                <span className={statusInfo.color}>{statusInfo.icon}</span>
                <span className={`text-xs ${statusInfo.color}`}>{statusInfo.text}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-700 text-zinc-300">
              <DropdownMenuItem onClick={() => onEdit?.(account.id)} className="cursor-pointer hover:text-white">
                <Edit className="mr-2 h-4 w-4" />
                <span>Editar cuenta</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRenew?.(account.id)} className="cursor-pointer hover:text-white">
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Renovar ahora</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-700" />
              <DropdownMenuItem
                onClick={() => onDelete?.(account.id)}
                className="cursor-pointer text-red-500 hover:text-red-400 hover:bg-red-950/20"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Eliminar cuenta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Información financiera */}
        <div className="grid grid-cols-3 gap-2 p-4 border-b border-zinc-800">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <CreditCard className="h-3 w-3" /> Costo
            </span>
            <span className="font-medium">${account.monthlyCost}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <DollarSign className="h-3 w-3" /> Ingreso
            </span>
            <span className="font-medium">${account.monthlyRevenue}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <DollarSign className="h-3 w-3" /> Este mes
            </span>
            <span className="font-medium">${account.currentMonthRevenue}</span>
          </div>
        </div>

        {/* Información de renovación y miembros */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-zinc-400" />
              <span className="text-sm">Renovación:</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    className={`
                      ${
                        remainingDays <= 3
                          ? "bg-red-500/20 text-red-300"
                          : remainingDays <= 7
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-green-500/20 text-green-300"
                      } 
                      hover:bg-opacity-30
                    `}
                  >
                    {new Date(account.renewalDate).toLocaleDateString()}
                    {remainingDays > 0 ? ` (${remainingDays} días)` : " (Hoy)"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-800 border-zinc-700">
                  <p>Última renovación: {new Date(account.lastRenewal).toLocaleDateString()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Información de miembros para cuentas familiares */}
          {account.type === "family" && account.members !== undefined && account.maxMembers !== undefined && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm">Miembros:</span>
                </div>
                <span className="text-sm font-medium">
                  {account.members}/{account.maxMembers}
                </span>
              </div>
              <Progress
                value={occupancyPercentage || 0}
                className="h-1.5"
                indicatorClassName={
                  occupancyPercentage === 100
                    ? "bg-red-500"
                    : occupancyPercentage > 75
                      ? "bg-amber-500"
                      : "bg-green-500"
                }
              />
            </div>
          )}

          {/* Credenciales */}
          <div className="bg-zinc-800/50 rounded-md p-2 mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-zinc-400">Credenciales de acceso</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs px-2 text-zinc-400 hover:text-white"
                onClick={() => setShowCredentials(!showCredentials)}
              >
                {showCredentials ? "Ocultar" : "Mostrar"}
              </Button>
            </div>
            {showCredentials ? (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Email:</span>
                  <span className="font-medium">{account.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Contraseña:</span>
                  <span className="font-medium">{account.password}</span>
                </div>
                {account.profileName && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Perfil:</span>
                    <span className="font-medium">{account.profileName}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-zinc-500 text-sm py-1">••••••••••••••••••••</div>
            )}
          </div>

          {/* Rentabilidad */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-400">Rentabilidad:</span>
            <Badge
              className={`
                ${
                  profitability < 0
                    ? "bg-red-500/20 text-red-300"
                    : profitability < 20
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-green-500/20 text-green-300"
                } 
                hover:bg-opacity-30
              `}
            >
              {profitability.toFixed(1)}%
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-3 bg-zinc-800/30 border-t border-zinc-800">
        <span className="text-xs text-zinc-500">Creada: {new Date(account.createdAt).toLocaleDateString()}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs px-2 text-zinc-400 hover:text-white"
          onClick={() => onEdit?.(account.id)}
        >
          <Edit className="h-3 w-3 mr-1" />
          Gestionar
        </Button>
      </CardFooter>
    </Card>
  )
}
