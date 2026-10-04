import { CONFIG } from "./config";

const PIN_PATTERN = /^\d{4}$/;

export function isPinConfigValid(): boolean {
  return PIN_PATTERN.test(CONFIG.accessPin);
}

export function pinMatches(entry: string): boolean {
  return isPinConfigValid() && entry === CONFIG.accessPin;
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function grantAccess(): void {
  localStorage.setItem("auditory_interference_access", "granted");
}
