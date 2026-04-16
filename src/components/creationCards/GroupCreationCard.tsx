import { type RefObject } from "react";
import { FaUsers } from "react-icons/fa";
import CreationCard from "../creationCard";

type GroupCreationCardProps = {
    loading: boolean;
    totalGroups: number;
    totalProjects: number;
    totalCourses: number;
    onAction: () => void;
};

type Option = {
    id: string;
    label: string;
};

type StudentOption = Option & {
    email: string;
};

type GroupCreationStepContentProps = {
    groupStep: number;
    groupProjectId: string;
    setGroupProjectId: (value: string) => void;
    groupCourseId: string;
    setGroupCourseId: (value: string) => void;
    groupCodSubj: string;
    setGroupCodSubj: (value: string) => void;
    groupYearSem: string;
    setGroupYearSem: (value: string) => void;
    projects: Option[];
    courses: Option[];
    groupStudentInputRef: RefObject<HTMLInputElement | null>;
    groupStudentQuery: string;
    setGroupStudentQuery: (value: string) => void;
    filteredStudents: StudentOption[];
    groupStudentIds: string[];
    toggleSelectedId: (id: string, list: string[], setter: (next: string[]) => void) => void;
    setGroupStudentIds: (next: string[]) => void;
    studentUsers: StudentOption[];
};

export function GroupCreationStepContent({
    groupStep,
    groupProjectId,
    setGroupProjectId,
    groupCourseId,
    setGroupCourseId,
    groupCodSubj,
    setGroupCodSubj,
    groupYearSem,
    setGroupYearSem,
    projects,
    courses,
    groupStudentInputRef,
    groupStudentQuery,
    setGroupStudentQuery,
    filteredStudents,
    groupStudentIds,
    toggleSelectedId,
    setGroupStudentIds,
    studentUsers
}: GroupCreationStepContentProps) {
    if (groupStep === 1) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-gray-700">
                    Projeto
                    <select
                        value={groupProjectId}
                        onChange={(event) => setGroupProjectId(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="">Selecione um projeto</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="text-sm font-medium text-gray-700">
                    Curso
                    <select
                        value={groupCourseId}
                        onChange={(event) => setGroupCourseId(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="">Selecione um curso</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="text-sm font-medium text-gray-700">
                    Código da matéria
                    <input
                        value={groupCodSubj}
                        onChange={(event) => setGroupCodSubj(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="Ex.: TTI101"
                    />
                </label>

                <label className="text-sm font-medium text-gray-700">
                    Ano/Semestre
                    <input
                        value={groupYearSem}
                        onChange={(event) => setGroupYearSem(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="Ex.: 202601"
                    />
                </label>
            </div>
        );
    }

    if (groupStep === 2) {
        return (
            <div>
                <label className="text-sm font-medium text-gray-700">
                    Buscar aluno por nome ou email
                    <input
                        ref={groupStudentInputRef}
                        value={groupStudentQuery}
                        onChange={(event) => setGroupStudentQuery(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="Digite para filtrar"
                    />
                </label>

                <div className="mt-3 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2">
                    {filteredStudents.map((student) => (
                        <button
                            key={student.id}
                            type="button"
                            onClick={() => toggleSelectedId(student.id, groupStudentIds, setGroupStudentIds)}
                            className={`mb-2 w-full rounded-lg border px-3 py-2 text-left transition-all last:mb-0 ${groupStudentIds.includes(student.id)
                                ? "border-green-300 bg-green-50"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                                }`}
                        >
                            <p className="font-semibold text-gray-800">{student.label}</p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                        </button>
                    ))}
                </div>

                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <h3 className="font-bold text-blue-900/80">Alunos selecionados</h3>
                    {groupStudentIds.length === 0 ? (
                        <div className="mt-3 flex items-center justify-between rounded-lg border border-dashed border-gray-300 bg-white p-3">
                            <p className="text-sm text-gray-500">Nenhum aluno selecionado.</p>
                            <button
                                type="button"
                                onClick={() => groupStudentInputRef.current?.focus()}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
                            >
                                Adicionar Aluno
                            </button>
                        </div>
                    ) : (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {groupStudentIds.map((studentId) => {
                                const student = studentUsers.find((item) => item.id === studentId);
                                return (
                                    <span
                                        key={studentId}
                                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-900"
                                    >
                                        {student?.label || studentId}
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
            <h3 className="text-lg font-bold text-gray-900">Resumo do Grupo</h3>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Projeto:</strong> {projects.find((item) => item.id === groupProjectId)?.label || "Não selecionado"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Curso:</strong> {courses.find((item) => item.id === groupCourseId)?.label || "Não selecionado"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Código:</strong> {groupCodSubj || "Não informado"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Ano/Semestre:</strong> {groupYearSem || "Não informado"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
                <strong>Alunos:</strong> {groupStudentIds.length}
            </p>
        </div>
    );
}

export default function GroupCreationCard({ loading, totalGroups, totalProjects, totalCourses, onAction }: GroupCreationCardProps) {
    return (
        <CreationCard
            title="Criar Grupo"
            description="Selecione projeto, curso e alunos com busca dinâmica."
            icon={<FaUsers className="text-3xl text-blue-900/70" />}
            actionLabel="Adicionar Grupo"
            onAction={onAction}
            loading={loading}
            totalLabel="Grupos cadastrados"
            totalValue={totalGroups}
            highlightText={`Projetos: ${totalProjects} | Cursos: ${totalCourses}`}
            emptyStateText="Nenhum grupo criado ainda."
        />
    );
}
