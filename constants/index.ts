import { ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";

export const PrincipalStadistic = [
  {
    title: "Gasto mensual",
    value: 4500,
    icon: "ri-money-dollar-box-line",
  },

  {
    title: "Ingresos Mensuales",
    value: 1500,
    icon: "ri-shopping-cart-2-line",
  },
  {
    title: "Ahorros Neto",
    value: 1500,
    icon: "ri-money-dollar-box-line",
  },
  {
    title: "Total Entregadas",
    value: 45,
    icon: "ri-money-dollar-box-line",
  },
];

export const data = [
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    isActive: true,
  },
  {
    title: "Drafts",
    url: "#",
    icon: File,
    isActive: false,
  },
  {
    title: "Sent",
    url: "#",
    icon: Send,
    isActive: false,
  },
  {
    title: "Junk",
    url: "#",
    icon: ArchiveX,
    isActive: false,
  },
  {
    title: "Trash",
    url: "#",
    icon: Trash2,
    isActive: false,
  },
];

export const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export const SpotifyAccounts = [
  {
    id: "user123",
    email: "correo@gmail.com",
    password: "password",
    isFamily: true,
    type: "Spotify",
    renewalDate: "2023-01-01",
    paymentValue: 7500,
    independent: true,
    dependsOnAccount: "",
    status: "Active",
    icon: "ri-spotify-fill",
    Tenant: {
      name: "Fake Tenant",
      contact: "fake@tenant.com",
      note: "fake tenant note",
    },
  },

  {
    id: "user12345",
    email: "correo@gmail.com",
    password: "password",
    isFamily: false,
    type: "Spotify",
    renewalDate: "2023-01-01",
    paymentValue: 3500,
    independent: false,
    dependsOnAccount: "user123",
    status: "Active",
    icon: "ri-spotify-fill",
    Tenant: {
      name: "Fake Tenant",
      contact: "fake@tenant.com",
      note: "fake tenant note",
    },
  },
];
