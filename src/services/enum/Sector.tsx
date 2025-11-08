export function enumSector(sector?: string): string | null {
    switch (sector) {
        case "Educacional":
            return "EDUCACIONAL";

        case "Governamental":
            return "GOVERNAMENTAL";

        case "Industrial":
            return "INDUSTRIAL";

        case "Saúde":
            return "SAÚDE";

        case "ONG":
            return "ONG";

        case "Ambiental":
            return "AMBIENTAL";

        case "Financeiro":
            return "FINANCEIRO";

        default:
            return null;
    }
}