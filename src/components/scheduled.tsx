import type { PresentationInterface } from "../services/interface/PresentationInterface";

export default function Scheduled({presentation}: {presentation: PresentationInterface}){
    const date= new Date(presentation.date);

    // constructing the presentation hour to be shown
    const minutes= date.getMinutes();

    const formattedHour= `${date.getHours()}:${minutes < 10 ? '0'+minutes : minutes}`;

    // constructing the presentation date to be shown
    const possibleDays= ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const possibleMonths= ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const formattedDate= `${possibleDays[date.getDay()]}, ${possibleMonths[date.getMonth()]} ${date.getFullYear()}`;

    return (
        <section className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 w-1/3 rounded-2xl border-gray-100">
            <div className="flex flex-col gap-3 px-5 py-7">
                <div className="flex items-center flex-col gap-y-3">
                    <h2 className="text-xl">{presentation.group.project.title}</h2>
                    <h3 className="text-l">Projeto Integrador -{presentation.group.codSubj}</h3>
                    <h3>{formattedDate}</h3>
                    <h1 className="text-2xl font-bold">{formattedHour}</h1>
                    <h3>Sala {presentation.classRoomName}</h3>
                </div>
                <div className="flex text-md text-blue-900/60 mt-3 justify-around flex-col md:flex-row gap-">
                    <div className="w-1/4">
                        <div className="flex justify-center text-md">
                            Banca
                        </div>
                        <div className="flex text-black text-sm gap-x-2 justify-around flex-wrap mt-1 bg-gray-50 rounded-lg p-2">
                            {presentation.examinationBoard.professorNameList.map((professor, index) => (
                                <ul key={index}>{professor}</ul>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="flex justify-center text-md">
                            Grupo
                        </div>
                        <div className="flex text-black text-sm gap-x-2 justify-around flex-wrap mt-1 bg-gray-50 rounded-lg p-2">
                            {presentation.group.userNameList.map((student, index) => (
                                <ul key={index}>{student}</ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>            
        </section>
    )
}