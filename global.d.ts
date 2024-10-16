// types/global.d.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // Allow undefined for dev environments
}

declare module "bcrypt" {
  export function genSaltSync(rounds?: number): string;
  export function hashSync(
    data: string | Buffer,
    salt: string | number
  ): string;
  export function compareSync(
    data: string | Buffer,
    encrypted: string
  ): boolean;
  export function genSalt(rounds?: number): Promise<string>;
  export function hash(
    data: string | Buffer,
    salt: string | number
  ): Promise<string>;
  export function compare(
    data: string | Buffer,
    encrypted: string
  ): Promise<boolean>;
}

export {};
