"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import AccountCard, { type AccountData, type AccountType } from "./accounts-card";
import AddAccountModal from "./add-account-modal";

// Datos de ejemplo para las cuentas
const sampleAccounts: AccountData[] = [
  {
    id: "1",
    service: "netflix",
    type: "family",
    status: "active",
    monthlyCost: 3500,
    monthlyRevenue: 5600,
    currentMonthRevenue: 5600,
    renewalDate: "2025-06-15",
    members: 4,
    maxMembers: 5,
    email: "cuenta_netflix@ejemplo.com",
    password: "Contraseña123",
    profileName: "Usuario1",
    createdAt: "2024-01-10",
    lastRenewal: "2025-05-15",
  },
  {
    id: "2",
    service: "disney",
    type: "family",
    status: "expiring",
    monthlyCost: 1800,
    monthlyRevenue: 2700,
    currentMonthRevenue: 2700,
    renewalDate: "2025-05-08",
    members: 3,
    maxMembers: 4,
    email: "cuenta_disney@ejemplo.com",
    password: "Disney2023!",
    createdAt: "2024-02-15",
    lastRenewal: "2025-04-08",
  },
  {
    id: "3",
    service: "spotify",
    type: "family",
    status: "active",
    monthlyCost: 1200,
    monthlyRevenue: 2000,
    currentMonthRevenue: 1800,
    renewalDate: "2025-05-28",
    members: 6,
    maxMembers: 6,
    email: "cuenta_spotify@ejemplo.com",
    password: "SpotifyPremium!",
    createdAt: "2024-03-01",
    lastRenewal: "2025-04-28",
  },
  {
    id: "4",
    service: "hbo",
    type: "individual",
    status: "problem",
    monthlyCost: 1500,
    monthlyRevenue: 2200,
    currentMonthRevenue: 1100,
    renewalDate: "2025-05-10",
    email: "cuenta_hbo@ejemplo.com",
    password: "HBOmax2023",
    createdAt: "2024-02-20",
    lastRenewal: "2025-04-10",
  },
  {
    id: "5",
    service: "prime",
    type: "individual",
    status: "active",
    monthlyCost: 900,
    monthlyRevenue: 1500,
    currentMonthRevenue: 1500,
    renewalDate: "2025-06-05",
    email: "cuenta_prime@ejemplo.com",
    password: "AmazonPrime!",
    createdAt: "2024-01-05",
    lastRenewal: "2025-05-05",
  },
  {
    id: "6",
    service: "youtube",
    type: "available",
    status: "new",
    monthlyCost: 1100,
    monthlyRevenue: 0,
    currentMonthRevenue: 0,
    renewalDate: "2025-06-01",
    email: "cuenta_youtube@ejemplo.com",
    password: "YTPremium2023",
    createdAt: "2025-05-01",
    lastRenewal: "2025-05-01",
  },
];

export default function AccountsTabs() {
  const [activeTab, setActiveTab] = useState<AccountType>("family");
  const [accounts, setAccounts] = useState<AccountData[]>(sampleAccounts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filtrar cuentas por tipo
  const filteredAccounts = sampleAccounts.filter((account) => account.type === activeTab);

  // Manejadores de eventos
  const handleEdit = (id: string) => {
    console.log(`Editar cuenta ${id}`);
    // Implementar lógica para editar cuenta
  };

  const handleDelete = (id: string) => {
    console.log(`Eliminar cuenta ${id}`);
    // Implementar lógica para eliminar cuenta
  };

  const handleRenew = (id: string) => {
    console.log(`Renovar cuenta ${id}`);
    // Implementar lógica para renovar cuenta
  };

  const handleAddAccount = (newAccount: Partial<AccountData>) => {
    console.log("Nueva cuenta:", newAccount);
    // Añadir la nueva cuenta al estado
    setAccounts([...accounts, newAccount as AccountData]);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Gestión de Cuentas</h2>
        <Button onClick={() => setIsAddModalOpen(true)} variant={"outline"} size={"lg"}>
          <Plus className="h-4 w-4 mr-1" />
          Agregar Cuenta
        </Button>
      </div>

      <Tabs
        defaultValue="family"
        onValueChange={(value) => setActiveTab(value as AccountType)}
      >
        <TabsList className="bg-zinc-800 border-zinc-700 mb-6">
          <TabsTrigger value="family" className="data-[state=active]:bg-zinc-700">
            Familiares
          </TabsTrigger>
          <TabsTrigger value="individual" className="data-[state=active]:bg-zinc-700">
            Individuales
          </TabsTrigger>
          <TabsTrigger value="available" className="data-[state=active]:bg-zinc-700">
            Disponibles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="family" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRenew={handleRenew}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="individual" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
            {filteredAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRenew={handleRenew}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
            {filteredAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRenew={handleRenew}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <AddAccountModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddAccount={handleAddAccount}
        existingAccounts={accounts}
      />
    </div>
  );
}
