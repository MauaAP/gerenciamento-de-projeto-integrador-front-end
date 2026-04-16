import { FaCalendarPlus } from "react-icons/fa";
import CreationCard from "../creationCard";

type PresentationCreationCardProps = {
    loading: boolean;
    totalReadyPresentations: number;
    totalGroups: number;
    totalBoards: number;
    totalClassrooms: number;
    onAction: () => void;
};

type Option = {
    id: string;
    label: string;
};

type PresentationCreationStepContentProps = {
    presentationStep: number;
    presentationGroupId: string;
    setPresentationGroupId: (value: string) => void;
    presentationBoardId: string;
    setPresentationBoardId: (value: string) => void;
    presentationDate: string;
    setPresentationDate: (value: string) => void;
    presentationClassroomId: string;
    setPresentationClassroomId: (value: string) => void;
    groups: Option[];
    boards: Option[];
    classrooms: Option[];
    selectedPresentationGroup?: Option;
    selectedPresentationBoard?: Option;
};

export function PresentationCreationStepContent({
    presentationStep,
    presentationGroupId,
    setPresentationGroupId,
    presentationBoardId,
    setPresentationBoardId,
    presentationDate,
    setPresentationDate,
    presentationClassroomId,
    setPresentationClassroomId,
    groups,
    boards,
    classrooms,
    selectedPresentationGroup,
    selectedPresentationBoard
}: PresentationCreationStepContentProps) {
    if (presentationStep === 1) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-gray-700">
                    Grupo
                    <select
                        value={presentationGroupId}
                        onChange={(event) => setPresentationGroupId(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="">Selecione um grupo</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="text-sm font-medium text-gray-700">
                    Banca examinadora
                    <select
                        value={presentationBoardId}
                        onChange={(event) => setPresentationBoardId(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="">Selecione uma banca</option>
                        {boards.map((board) => (
                            <option key={board.id} value={board.id}>
                                {board.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        );
    }

    if (presentationStep === 2) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-gray-700">
                    Data e horário
                    <input
                        type="datetime-local"
                        value={presentationDate}
                        onChange={(event) => setPresentationDate(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </label>

                <label className="text-sm font-medium text-gray-700">
                    Sala
                    <select
                        value={presentationClassroomId}
                        onChange={(event) => setPresentationClassroomId(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="">Selecione uma sala</option>
                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-lg font-bold text-gray-900">Resumo da Apresentação</h3>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Grupo:</strong> {selectedPresentationGroup?.label || "Não selecionado"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Banca:</strong> {selectedPresentationBoard?.label || "Não selecionada"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Data:</strong> {presentationDate || "Não informada"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Sala:</strong> {classrooms.find((item) => item.id === presentationClassroomId)?.label || "Não selecionada"}
            </p>
        </div>
    );
}

export default function PresentationCreationCard({
    loading,
    totalReadyPresentations,
    totalGroups,
    totalBoards,
    totalClassrooms,
    onAction
}: PresentationCreationCardProps) {
    return (
        <CreationCard
            title="Criar Apresentação"
            description="Conecte grupo + banca e agende data, horário e sala."
            icon={<FaCalendarPlus className="text-3xl text-blue-900/70" />}
            actionLabel="Adicionar Apresentação"
            onAction={onAction}
            loading={loading}
            totalLabel="Apresentações prontas para criar"
            totalValue={totalReadyPresentations}
            highlightText={`Grupos: ${totalGroups} | Bancas: ${totalBoards} | Salas: ${totalClassrooms}`}
            emptyStateText="Sem combinação de grupo e banca para agendar."
        />
    );
}
