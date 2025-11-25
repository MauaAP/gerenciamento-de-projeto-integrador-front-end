import type { PresentationInterface } from "../services/interface/PresentationInterface";
import { formatTimestamp } from "./functions/formatTimestamp";

export default function PricipalScheduled({presentation}: {presentation: PresentationInterface}){
    const formattedTimestamp= formatTimestamp(presentation.date);

    return (
        <section className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 w-1/3 rounded-2xl border-gray-100">
            <div className="flex flex-col gap-3 px-5 py-7">
                <div className="flex items-center flex-col gap-y-3">
                    <h2 className="text-xl">{presentation.group.project.title}</h2>
                    <h3 className="text-l">Projeto Integrador -{presentation.group.codSubj}</h3>
                    <h3>{formattedTimestamp[0]}</h3>
                    <h1 className="text-2xl font-bold">{formattedTimestamp[1]}</h1>
                    <h3>Sala {presentation.classroomName}</h3>
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