import { UserRolesEnum } from "@modules/auth/auth.types";

import { IGetUser } from "./users.types";

export const MOCK_USERS: IGetUser[] = [
  {
    id: 1,
    first_name: "Marko",
    last_name: "Petrovic",
    email: "marko.petrovic@example.com",
    phone_number: "+381601234567",
    date_of_birth: "1990-05-12",
    is_active: true,
    roles: [UserRolesEnum.ADMIN],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
    w_id: "1",
    company_id: 1,
  },
  {
    id: 2,
    first_name: "Milan",
    last_name: "Jovanovic",
    email: "milan.jovanovic@example.com",
    phone_number: "+381607654321",
    date_of_birth: "1998-08-23",
    is_active: true,
    roles: [UserRolesEnum.PLAYER],
    createdAt: "2026-02-10T08:30:00Z",
    updatedAt: "2026-02-10T08:30:00Z",
    w_id: "2",
    company_id: 1,
  },
  {
    id: 3,
    first_name: "Ana",
    last_name: "Nikolic",
    email: "ana.nikolic@example.com",
    phone_number: "+381609876543",
    date_of_birth: "1985-11-30",
    is_active: false,
    roles: [UserRolesEnum.COACH],
    createdAt: "2026-03-01T14:00:00Z",
    updatedAt: "2026-03-01T14:00:00Z",
    w_id: "3",
    company_id: 1,
  },
];
