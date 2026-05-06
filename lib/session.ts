export interface TesterProfile {
  session_id: string;
  name: string;
  email: string;
  phone: string;
  os: "ios" | "android";
}

const SESSION_KEY = "manito_session_id";
const PROFILE_KEY = "manito_tester_profile";
const ROLE_KEY = "manito_role";
const SURVEY_KEY = "manito_survey_done";

export function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getProfile(): TesterProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? (JSON.parse(raw) as TesterProfile) : null;
}

export function saveProfile(
  data: Omit<TesterProfile, "session_id">
): TesterProfile {
  const session_id = getOrCreateSessionId();
  const profile: TesterProfile = { ...data, session_id };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  return profile;
}

export function getRole(): "cliente" | "maestro" | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ROLE_KEY) as "cliente" | "maestro" | null;
}

export function setRole(role: "cliente" | "maestro"): void {
  localStorage.setItem(ROLE_KEY, role);
}

export function isSurveyDone(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(SURVEY_KEY);
}

export function markSurveyDone(): void {
  localStorage.setItem(SURVEY_KEY, "1");
}
