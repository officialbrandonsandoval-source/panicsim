export interface PrankStep {
  text: string;
  subtext?: string;
  duration: number; // ms
  effect: "shake" | "glitch" | "flash" | "static" | "none" | "pulse" | "matrix" | "melt";
  sound?: boolean;
  bgColor?: string;
}

export interface PrankDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  premium: boolean;
  steps: PrankStep[];
}

export const PRANKS: PrankDef[] = [
  // --- FREE PRANKS ---
  {
    id: "virus",
    name: "Virus Detected",
    description: "Fake virus scan with escalating threat count",
    icon: "🦠",
    premium: false,
    steps: [
      { text: "Initializing system scan...", duration: 2000, effect: "none", bgColor: "#0a0a0a" },
      { text: "Scanning files...", subtext: "C:\\Windows\\System32\\...", duration: 2500, effect: "none", bgColor: "#0a0a0a" },
      { text: "⚠️ 3 threats detected", subtext: "Quarantine failed", duration: 2000, effect: "pulse", bgColor: "#1a0a0a" },
      { text: "⚠️ 17 threats detected", subtext: "CRITICAL: Firewall compromised", duration: 2000, effect: "shake", bgColor: "#2a0a0a" },
      { text: "🔴 148 THREATS DETECTED", subtext: "SYSTEM INTEGRITY: COMPROMISED", duration: 2500, effect: "glitch", bgColor: "#3a0000" },
      { text: "💀 TOTAL SYSTEM FAILURE", subtext: "All personal data exposed", duration: 3000, effect: "flash", bgColor: "#ff0000" },
    ],
  },
  {
    id: "overheat",
    name: "System Overheating",
    description: "Device temperature rising to critical levels",
    icon: "🔥",
    premium: false,
    steps: [
      { text: "⚙️ System Monitor Active", subtext: "CPU Temperature: 72°C", duration: 2000, effect: "none", bgColor: "#0a0a0a" },
      { text: "⚠️ Temperature Rising", subtext: "CPU: 89°C — Throttling active", duration: 2500, effect: "none", bgColor: "#1a1000" },
      { text: "🟠 WARNING: 104°C", subtext: "Thermal paste failure detected", duration: 2000, effect: "pulse", bgColor: "#2a1500" },
      { text: "🔴 CRITICAL: 127°C", subtext: "Hardware damage imminent", duration: 2500, effect: "shake", bgColor: "#3a1000" },
      { text: "🔥 EMERGENCY SHUTDOWN", subtext: "Battery swelling detected — DO NOT TOUCH DEVICE", duration: 3000, effect: "flash", bgColor: "#ff3300" },
    ],
  },
  {
    id: "fbi",
    name: "FBI Warning",
    description: "Official-looking federal investigation notice",
    icon: "🔒",
    premium: false,
    steps: [
      { text: "Establishing secure connection...", subtext: "Protocol: TLS 1.3 | AES-256", duration: 2000, effect: "none", bgColor: "#000033" },
      { text: "⚠️ FEDERAL NOTICE", subtext: "This device has been flagged for review", duration: 3000, effect: "none", bgColor: "#000044" },
      { text: "🔒 DEVICE LOCKED", subtext: "FBI Case #2026-PX-48291\nYour IP address has been logged", duration: 3000, effect: "pulse", bgColor: "#000066" },
      { text: "📡 TRANSMITTING DATA", subtext: "Browsing history • Photos • Messages\nTransfer: 34%... 67%... 91%...", duration: 3500, effect: "glitch", bgColor: "#000088" },
      { text: "🚨 WARRANT ISSUED", subtext: "Federal agents have been dispatched to your location\nDO NOT CLOSE THIS WINDOW", duration: 3000, effect: "flash", bgColor: "#0000cc" },
    ],
  },
  // --- PREMIUM PRANKS ---
  {
    id: "matrix",
    name: "Matrix Breach",
    description: "Reality glitches — the simulation is breaking",
    icon: "🟢",
    premium: true,
    steps: [
      { text: "Wake up...", duration: 2500, effect: "none", bgColor: "#000a00" },
      { text: "The Matrix has you...", duration: 2500, effect: "matrix", bgColor: "#001a00" },
      { text: "Follow the white rabbit 🐇", subtext: "SYSTEM ANOMALY DETECTED", duration: 2500, effect: "glitch", bgColor: "#002a00" },
      { text: "REALITY INTEGRITY: 23%", subtext: "Simulation boundaries dissolving", duration: 3000, effect: "static", bgColor: "#003a00" },
      { text: "YOU ARE THE ANOMALY", subtext: "The system is rewriting itself around you", duration: 3000, effect: "melt", bgColor: "#00ff00" },
    ],
  },
  {
    id: "ransom",
    name: "Ransomware",
    description: "Files encrypted — pay to unlock countdown",
    icon: "💰",
    premium: true,
    steps: [
      { text: "🔐 Encrypting files...", subtext: "Documents: 100% | Photos: 43%...", duration: 2500, effect: "none", bgColor: "#1a0000" },
      { text: "📁 ALL FILES ENCRYPTED", subtext: "RSA-4096 | Decryption key required", duration: 2500, effect: "pulse", bgColor: "#2a0000" },
      { text: "💰 PAYMENT REQUIRED", subtext: "Send 0.5 BTC to unlock your files\nTime remaining: 23:59:47", duration: 3000, effect: "shake", bgColor: "#3a0000" },
      { text: "⏰ TIME RUNNING OUT", subtext: "Files will be permanently deleted\n00:05:23 remaining", duration: 3000, effect: "glitch", bgColor: "#4a0000" },
      { text: "💀 FILES DESTROYED", subtext: "Payment window expired\nAll data has been wiped", duration: 3000, effect: "flash", bgColor: "#ff0000" },
    ],
  },
  {
    id: "ghost",
    name: "Ghost in the Machine",
    description: "Someone else is controlling the device",
    icon: "👻",
    premium: true,
    steps: [
      { text: "...", subtext: "Someone is watching", duration: 2500, effect: "none", bgColor: "#0a0a0a" },
      { text: "I can see you.", subtext: "Camera access: GRANTED", duration: 2500, effect: "none", bgColor: "#0a0a1a" },
      { text: "Nice room.", subtext: "Accessing microphone...\nAccessing contacts...", duration: 3000, effect: "pulse", bgColor: "#0a0a2a" },
      { text: "I've been here for months.", subtext: "Reading messages... Accessing photos...\nYou really should change your passwords.", duration: 3000, effect: "glitch", bgColor: "#0a0a3a" },
      { text: "Say goodbye to your data 👋", subtext: "Initiating remote wipe...\n████████████░░░░ 78%", duration: 3500, effect: "flash", bgColor: "#1a0a3a" },
    ],
  },
];

export function getPrankById(id: string): PrankDef | undefined {
  return PRANKS.find((p) => p.id === id);
}

export function getFreePranks(): PrankDef[] {
  return PRANKS.filter((p) => !p.premium);
}

export function getPremiumPranks(): PrankDef[] {
  return PRANKS.filter((p) => p.premium);
}
