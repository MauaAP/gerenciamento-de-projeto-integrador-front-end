import { type RefObject } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import CreationCard from "../creationCard";

type BoardCreationCardProps = {
    loading: boolean;
    totalBoards: number;
    totalProfessors: number;
    onAction: () => void;
};

type Option = {
    id: string;
    label: string;
};

type BoardOption = Option & {
    userNameList?: string[];
};

type ProfessorOption = Option & {
    email: string;
};

type BoardCreationStepContentProps = {
    boardStep: number;
    boardLinkedGroupId: string;
    setBoardLinkedGroupId: (value: string) => void;
    groups: BoardOption[];
    selectedLinkedGroup?: BoardOption;
    boardProfessorInputRef: RefObject<HTMLInputElement | null>;
    boardProfessorQuery: string;
    setBoardProfessorQuery: (value: string) => void;
    filteredProfessors: ProfessorOption[];
    boardProfessorIds: string[];
    toggleSelectedId: (id: string, list: string[], setter: (next: string[]) => void) => void;
    setBoardProfessorIds: (next: string[]) => void;
    professorUsers: ProfessorOption[];
};

export function BoardCreationStepContent({
    boardStep,
    boardLinkedGroupId,
    setBoardLinkedGroupId,
    groups,
    selectedLinkedGroup,
    boardProfessorInputRef,
    boardProfessorQuery,
    setBoardProfessorQuery,
    filteredProfessors,
    boardProfessorIds,
    toggleSelectedId,
    setBoardProfessorIds,
    professorUsers
}: BoardCreationStepContentProps) {
    if (boardStep === 1) {
        return (
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                    Grupo (opcional, para contexto)
                    <select
                        value={boardLinkedGroupId}
                        onChange={(event) => setBoardLinkedGroupId(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="">Sem vínculo</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.label}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900/80">
                    {selectedLinkedGroup ? (
                        <>
                            <p className="font-semibold">Grupo selecionado: {selectedLinkedGroup.label}</p>
                            <p className="mt-2">
                                Alunos carregados automaticamente para contexto: {selectedLinkedGroup.userNameList?.join(", ") || "Nenhum aluno"}
                            </p>
                        </>
                    ) : (
                        <p>Nenhum grupo vinculado ainda. Você pode seguir mesmo assim.</p>
                    )}
                </div>
            </div>
        );
    }

    if (boardStep === 2) {
        return (
            <div>
                <label className="text-sm font-medium text-gray-700">
                    Buscar professor por nome ou email
                    <input
                        ref={boardProfessorInputRef}
                        value={boardProfessorQuery}
                        onChange={(event) => setBoardProfessorQuery(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="Digite para filtrar"
                    />
                </label>

                <div className="mt-3 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2">
                    {filteredProfessors.map((professor) => (
                        <button
                            key={professor.id}
                            type="button"
                            onClick={() => toggleSelectedId(professor.id, boardProfessorIds, setBoardProfessorIds)}
                            className={`mb-2 w-full rounded-lg border px-3 py-2 text-left transition-all last:mb-0 ${boardProfessorIds.includes(professor.id)
                                ? "border-green-300 bg-green-50"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                                }`}
                        >
                            <p className="font-semibold text-gray-800">{professor.label}</p>
                            <p className="text-xs text-gray-500">{professor.email}</p>
                        </button>
                    ))}
                </div>

                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <h3 className="font-bold text-blue-900/80">Professores selecionados</h3>
                    {boardProfessorIds.length === 0 ? (
                        <div className="mt-3 flex items-center justify-between rounded-lg border border-dashed border-gray-300 bg-white p-3">
                            <p className="text-sm text-gray-500">Nenhum professor selecionado.</p>
                            <button
                                type="button"
                                onClick={() => boardProfessorInputRef.current?.focus()}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
                            >
                                Adicionar Professor
                            </button>
                        </div>
                    ) : (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {boardProfessorIds.map((professorId) => {
                                const professor = professorUsers.find((item) => item.id === professorId);
                                return (
                                    <span
                                        key={professorId}
                                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-900"
                                    >
                                        {professor?.label || professorId}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-lg font-bold text-gray-900">Resumo da Banca</h3>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Grupo vinculado:</strong> {selectedLinkedGroup?.label || "Sem vínculo"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Professores:</strong> {boardProfessorIds.length}
            </p>
        </div>
    );
}

export default function BoardCreationCard({ loading, totalBoards, totalProfessors, onAction }: BoardCreationCardProps) {
    return (
        <CreationCard
            title="Criar Banca Examinadora"
            description="Busque professores e vincule uma banca a um grupo."
            icon={<FaChalkboardTeacher className="text-3xl text-blue-900/70" />}
            actionLabel="Adicionar Banca"
            onAction={onAction}
            loading={loading}
            totalLabel="Bancas cadastradas"
            totalValue={totalBoards}
            highlightText={`Professores disponíveis: ${totalProfessors}`}
            emptyStateText="Nenhuma banca criada."
        />
    );
}
