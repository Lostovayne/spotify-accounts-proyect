"use client"

import { useState, useEffect } from "react"
import { Check, CreditCard, DollarSign, Info, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import type { AccountData, StreamingService, AccountType } from "./accounts-card"

// Servicios disponibles
const availableServices = [
  { id: "netflix", name: "Netflix", color: "bg-red-600" },
  { id: "disney", name: "Disney+", color: "bg-blue-600" },
  { id: "hbo", name: "HBO Max", color: "bg-purple-700" },
  { id: "prime", name: "Prime Video", color: "bg-blue-500" },
  { id: "spotify", name: "Spotify", color: "bg-green-600" },
  { id: "apple", name: "Apple TV+", color: "bg-gray-800" },
  { id: "youtube", name: "YouTube Premium", color: "bg-red-700" },
  { id: "paramount", name: "Paramount+", color: "bg-blue-800" },
]

// Planes por servicio (ejemplo)
const servicePlans = {
  netflix: [
    { id: "basic", name: "Básico", price: 2500, maxMembers: 1 },
    { id: "standard", name: "Estándar", price: 3200, maxMembers: 2 },
    { id: "premium", name: "Premium", price: 4500, maxMembers: 5 },
  ],
  disney: [
    { id: "monthly", name: "Mensual", price: 1800, maxMembers: 4 },
    { id: "annual", name: "Anual", price: 18000, maxMembers: 4 },
  ],
  hbo: [
    { id: "mobile", name: "Móvil", price: 1200, maxMembers: 1 },
    { id: "standard", name: "Estándar", price: 1800, maxMembers: 3 },
  ],
  prime: [
    { id: "monthly", name: "Mensual", price: 900, maxMembers: 2 },
    { id: "annual", name: "Anual", price: 9000, maxMembers: 2 },
  ],
  spotify: [
    { id: "individual", name: "Individual", price: 1200, maxMembers: 1 },
    { id: "duo", name: "Dúo", price: 1600, maxMembers: 2 },
    { id: "family", name: "Familiar", price: 2000, maxMembers: 6 },
  ],
  apple: [
    { id: "monthly", name: "Mensual", price: 1100, maxMembers: 6 },
    { id: "annual", name: "Anual", price: 11000, maxMembers: 6 },
  ],
  youtube: [
    { id: "individual", name: "Individual", price: 1100, maxMembers: 1 },
    { id: "family", name: "Familiar", price: 1800, maxMembers: 5 },
  ],
  paramount: [
    { id: "monthly", name: "Mensual", price: 800, maxMembers: 3 },
    { id: "annual", name: "Anual", price: 8000, maxMembers: 3 },
  ],
}

// Cuentas familiares existentes (ejemplo)
const existingFamilyAccounts = [
  { id: "fam1", name: "Netflix Premium - Familia García", service: "netflix", availableSlots: 2 },
  { id: "fam2", name: "Disney+ - Familia Rodríguez", service: "disney", availableSlots: 1 },
  { id: "fam3", name: "Spotify Familiar - Familia López", service: "spotify", availableSlots: 3 },
]

interface AddAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddAccount: (account: Partial<AccountData>) => void
  existingAccounts?: AccountData[]
}

export default function AddAccountModal({
  open,
  onOpenChange,
  onAddAccount,
  existingAccounts = [],
}: AddAccountModalProps) {
  // Estado del formulario
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState<Partial<AccountData>>({
    service: undefined,
    type: "individual",
    status: "new",
    monthlyCost: 0,
    monthlyRevenue: 0,
    currentMonthRevenue: 0,
    email: "",
    password: "",
    createdAt: new Date().toISOString(),
    lastRenewal: new Date().toISOString(),
    renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
  })

  // Estados adicionales
  const [selectedPlan, setSelectedPlan] = useState("")
  const [isPartOfFamily, setIsPartOfFamily] = useState(false)
  const [parentAccount, setParentAccount] = useState("")
  const [suggestedPrice, setSuggestedPrice] = useState(0)
  const [customPrice, setCustomPrice] = useState(false)

  // Resetear el formulario cuando se cierra el modal
  useEffect(() => {
    if (!open) {
      setFormStep(0)
      setFormData({
        service: undefined,
        type: "individual",
        status: "new",
        monthlyCost: 0,
        monthlyRevenue: 0,
        currentMonthRevenue: 0,
        email: "",
        password: "",
        createdAt: new Date().toISOString(),
        lastRenewal: new Date().toISOString(),
        renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
      })
      setSelectedPlan("")
      setIsPartOfFamily(false)
      setParentAccount("")
      setSuggestedPrice(0)
      setCustomPrice(false)
    }
  }, [open])

  // Actualizar el costo mensual cuando cambia el plan
  useEffect(() => {
    if (formData.service && selectedPlan) {
      const plans = servicePlans[formData.service as keyof typeof servicePlans]
      const plan = plans.find((p) => p.id === selectedPlan)
      if (plan) {
        setFormData((prev) => ({
          ...prev,
          monthlyCost: plan.price,
          maxMembers: plan.maxMembers,
          members: formData.type === "family" ? 0 : undefined,
        }))

        // Sugerir un precio de venta (ejemplo: 40% de margen)
        const suggestedPrice = Math.round(plan.price * 1.4)
        setSuggestedPrice(suggestedPrice)
        setFormData((prev) => ({
          ...prev,
          monthlyRevenue: suggestedPrice,
          currentMonthRevenue: suggestedPrice,
        }))
      }
    }
  }, [formData.service, selectedPlan, formData.type])

  // Filtrar cuentas familiares disponibles según el servicio seleccionado
  const filteredFamilyAccounts = existingFamilyAccounts.filter(
    (account) => !formData.service || account.service === formData.service,
  )

  // Manejar cambio de servicio
  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value as StreamingService,
    }))
    setSelectedPlan("")
  }

  // Manejar cambio de tipo de cuenta
  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value as AccountType,
      members: value === "family" ? 0 : undefined,
    }))
    setIsPartOfFamily(false)
  }

  // Manejar cambio de plan
  const handlePlanChange = (value: string) => {
    setSelectedPlan(value)
  }

  // Manejar cambio de precio personalizado
  const handleCustomPriceChange = (checked: boolean) => {
    setCustomPrice(checked)
    if (!checked) {
      setFormData((prev) => ({
        ...prev,
        monthlyRevenue: suggestedPrice,
        currentMonthRevenue: suggestedPrice,
      }))
    }
  }

  // Manejar cambio de cuenta familiar padre
  const handleParentAccountChange = (value: string) => {
    setParentAccount(value)
    // Aquí se podría actualizar más información basada en la cuenta padre
  }

  // Manejar envío del formulario
  const handleSubmit = () => {
    // Crear objeto de cuenta final
    const newAccount: Partial<AccountData> = {
      ...formData,
      id: `acc-${Date.now()}`, // Generar ID único
    }

    // Si es parte de una cuenta familiar, actualizar información
    if (isPartOfFamily && parentAccount) {
      // Aquí se actualizaría la relación con la cuenta familiar
    }

    onAddAccount(newAccount)
    onOpenChange(false)
  }

  // Avanzar al siguiente paso
  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  // Retroceder al paso anterior
  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  // Verificar si se puede avanzar al siguiente paso
  const canProceed = () => {
    if (formStep === 0) {
      return !!formData.service && !!selectedPlan
    }
    if (formStep === 1) {
      return !!formData.email && !!formData.password
    }
    return true
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-zinc-900 text-white border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Agregar Nueva Cuenta</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Completa la información para registrar una nueva cuenta de streaming.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={formStep.toString()} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="0" disabled className="data-[state=active]:bg-zinc-800">
              Servicio
            </TabsTrigger>
            <TabsTrigger value="1" disabled className="data-[state=active]:bg-zinc-800">
              Credenciales
            </TabsTrigger>
            <TabsTrigger value="2" disabled className="data-[state=active]:bg-zinc-800">
              Configuración
            </TabsTrigger>
          </TabsList>

          {/* Paso 1: Selección de servicio y plan */}
          <TabsContent value="0" className="space-y-4 mt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="service">Servicio de Streaming</Label>
                <Select value={formData.service} onValueChange={handleServiceChange}>
                  <SelectTrigger id="service" className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectGroup>
                      <SelectLabel>Servicios disponibles</SelectLabel>
                      {availableServices.map((service) => (
                        <SelectItem key={service.id} value={service.id} className="cursor-pointer">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${service.color}`}></div>
                            <span>{service.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Cuenta</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={handleTypeChange}
                  className="flex space-x-2"
                  defaultValue="individual"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" className="text-emerald-500" />
                    <Label htmlFor="individual" className="cursor-pointer">
                      Individual
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="family" id="family" className="text-emerald-500" />
                    <Label htmlFor="family" className="cursor-pointer">
                      Familiar
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="available" id="available" className="text-emerald-500" />
                    <Label htmlFor="available" className="cursor-pointer">
                      Disponible
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.service && (
                <div className="space-y-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Select value={selectedPlan} onValueChange={handlePlanChange}>
                    <SelectTrigger id="plan" className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Selecciona un plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      <SelectGroup>
                        <SelectLabel>Planes disponibles</SelectLabel>
                        {servicePlans[formData.service as keyof typeof servicePlans]?.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id} className="cursor-pointer">
                            <div className="flex items-center justify-between w-full">
                              <span>{plan.name}</span>
                              <span className="text-zinc-400">${plan.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.type === "individual" && formData.service && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isPartOfFamily" className="cursor-pointer">
                      ¿Es parte de una cuenta familiar?
                    </Label>
                    <Switch
                      id="isPartOfFamily"
                      checked={isPartOfFamily}
                      onCheckedChange={setIsPartOfFamily}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>

                  {isPartOfFamily && (
                    <div className="pt-2">
                      <Label htmlFor="parentAccount">Cuenta Familiar</Label>
                      <Select value={parentAccount} onValueChange={handleParentAccountChange}>
                        <SelectTrigger id="parentAccount" className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Selecciona una cuenta familiar" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectGroup>
                            <SelectLabel>Cuentas familiares disponibles</SelectLabel>
                            {filteredFamilyAccounts.length > 0 ? (
                              filteredFamilyAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id} className="cursor-pointer">
                                  <div className="flex items-center justify-between w-full">
                                    <span>{account.name}</span>
                                    <span className="text-zinc-400">{account.availableSlots} espacios</span>
                                  </div>
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                No hay cuentas familiares disponibles
                              </SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Paso 2: Credenciales */}
          <TabsContent value="1" className="space-y-4 mt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="bg-zinc-800 border-zinc-700"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="Contraseña segura"
                  className="bg-zinc-800 border-zinc-700"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                />
              </div>

              {formData.service !== "spotify" && (
                <div className="space-y-2">
                  <Label htmlFor="profileName">Nombre de Perfil (opcional)</Label>
                  <Input
                    id="profileName"
                    type="text"
                    placeholder="Nombre del perfil"
                    className="bg-zinc-800 border-zinc-700"
                    value={formData.profileName || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, profileName: e.target.value }))}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="renewalDate">Fecha de Renovación</Label>
                <Input
                  id="renewalDate"
                  type="date"
                  className="bg-zinc-800 border-zinc-700"
                  value={formData.renewalDate?.split("T")[0]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      renewalDate: new Date(e.target.value).toISOString(),
                    }))
                  }
                />
              </div>
            </div>
          </TabsContent>

          {/* Paso 3: Configuración financiera */}
          <TabsContent value="2" className="space-y-4 mt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="monthlyCost" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" /> Costo Mensual
                  </Label>
                  <span className="text-zinc-400 text-sm">${formData.monthlyCost}</span>
                </div>
                <Input
                  id="monthlyCost"
                  type="number"
                  className="bg-zinc-800 border-zinc-700"
                  value={formData.monthlyCost}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, monthlyCost: Number.parseInt(e.target.value) || 0 }))
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="customPrice" className="cursor-pointer">
                    Precio personalizado
                  </Label>
                  <Switch
                    id="customPrice"
                    checked={customPrice}
                    onCheckedChange={handleCustomPriceChange}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="monthlyRevenue" className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> Precio de Venta
                  </Label>
                  {!customPrice && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 text-zinc-400 text-sm cursor-help">
                            <Info className="h-3 w-3" />
                            Sugerido: ${suggestedPrice}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-zinc-800 border-zinc-700">
                          <p>Precio sugerido con un margen del 40%</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <Input
                  id="monthlyRevenue"
                  type="number"
                  className="bg-zinc-800 border-zinc-700"
                  value={formData.monthlyRevenue}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value) || 0
                    setFormData((prev) => ({
                      ...prev,
                      monthlyRevenue: value,
                      currentMonthRevenue: value,
                    }))
                  }}
                  disabled={!customPrice}
                />
              </div>

              {formData.type === "family" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="members" className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> Miembros Iniciales
                    </Label>
                    <span className="text-zinc-400 text-sm">
                      {formData.members || 0}/{formData.maxMembers || 0}
                    </span>
                  </div>
                  <Input
                    id="members"
                    type="number"
                    min="0"
                    max={formData.maxMembers}
                    className="bg-zinc-800 border-zinc-700"
                    value={formData.members || 0}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value) || 0
                      const max = formData.maxMembers || 0
                      setFormData((prev) => ({
                        ...prev,
                        members: Math.min(value, max),
                      }))
                    }}
                  />
                </div>
              )}

              <div className="pt-2 space-y-2">
                <Label>Resumen Financiero</Label>
                <div className="bg-zinc-800/50 rounded-md p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Costo mensual:</span>
                    <span>${formData.monthlyCost}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Ingreso mensual:</span>
                    <span>${formData.monthlyRevenue}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-zinc-300">Ganancia mensual:</span>
                    <span
                      className={formData.monthlyRevenue - formData.monthlyCost > 0 ? "text-green-400" : "text-red-400"}
                    >
                      ${formData.monthlyRevenue - formData.monthlyCost}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Margen:</span>
                    <span
                      className={
                        formData.monthlyCost > 0 &&
                        ((formData.monthlyRevenue - formData.monthlyCost) / formData.monthlyCost) * 100 > 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {formData.monthlyCost > 0
                        ? `${(((formData.monthlyRevenue - formData.monthlyCost) / formData.monthlyCost) * 100).toFixed(
                            1,
                          )}%`
                        : "0%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          {formStep > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
            >
              Anterior
            </Button>
          ) : (
            <div></div>
          )}

          {formStep < 2 ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Siguiente
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
              <Check className="mr-2 h-4 w-4" /> Crear Cuenta
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
