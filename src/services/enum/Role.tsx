export function enumRole(role?: string): string| null {
    switch (role) {
      case "Admin":
          return "ADMIN";

      case "Moderador":
          return "MODERATOR";

      case "Professor":
          return "PROFESSOR";

      case "Estudante":
          return "STUDENT";
          
      default:
          return null;
  }
}