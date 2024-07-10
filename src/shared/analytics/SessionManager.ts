const SESSION_KEY = "session_number";

export class SessionManager {
  static getSessionNumber(userId?: string | null): number {
    return JSON.parse(localStorage.getItem(SESSION_KEY + ":" + userId) || "0");
  }

  static incrementSessionNumber(userId?: string | null): void {
    const currentSessionNumber = this.getSessionNumber();
    localStorage.setItem(
      SESSION_KEY + ":" + userId,
      JSON.stringify(currentSessionNumber + 1)
    );
  }
}
