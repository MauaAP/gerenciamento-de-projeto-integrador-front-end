export function formatTimestamp(timestamp: number): string[] {
    const date= new Date(timestamp);

    // constructing the presentation hour to be shown
    const minutes= date.getMinutes();

    const formattedHour= `${date.getHours()}:${minutes < 10 ? '0'+minutes : minutes}`;

    
    // constructing the presentation date to be shown
    const day= date.getDate()
    const formattedDay= `${day < 10 ? '0'+day : day}`;
    
    const possibleDays= ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const possibleMonths= ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const formattedDate= `${possibleDays[date.getDay()]}, ${formattedDay} ${possibleMonths[date.getMonth()]} ${date.getFullYear()}`;

    return [formattedDate, formattedHour];
}