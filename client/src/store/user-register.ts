// store/emailStore.ts
import { create } from 'zustand';

// Define the interface for the store state and actions
interface EmailState {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

// Create the store with TypeScript
export const useEmailStore = create<EmailState>((set) => ({
  email: '', // Initial state

  // Action to set email
  setEmail: (email: string) => set({ email }),

  // Action to clear email
  clearEmail: () => set({ email: '' }),
}));