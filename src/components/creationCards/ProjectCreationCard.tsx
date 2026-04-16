import { FaLightbulb } from "react-icons/fa";
import CreationCard from "../creationCard";

type ProjectCreationCardProps = {
    loading: boolean;
    totalProjects: number;
    totalPartners: number;
    onAction: () => void;
};

type Option = {
    id: string;
    label: string;
};

type ProjectCreationStepContentProps = {
    projectStep: number;
    projectTitle: string;
    setProjectTitle: (value: string) => void;
    projectPartnerId: string;
    setProjectPartnerId: (value: string) => void;
    projectExtensionHours: string;
    setProjectExtensionHours: (value: string) => void;
    partners: Option[];
};

export function ProjectCreationStepContent({
    projectStep,
    projectTitle,
    setProjectTitle,
    projectPartnerId,
    setProjectPartnerId,
    projectExtensionHours,
    setProjectExtensionHours,
    partners
}: ProjectCreationStepContentProps) {
    if (projectStep === 1) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-gray-700 md:col-span-2">
                    Título do projeto
                    <input
                        value={projectTitle}
                        onChange={(event) => setProjectTitle(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="Ex.: Plataforma de Gestão de Banca"
                    />
                </label>

                <label className="text-sm font-medium text-gray-700 md:col-span-2">
                    Parceiro
                    <select
                        value={projectPartnerId}
                        onChange={(event) => setProjectPartnerId(event.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="">Selecione um parceiro</option>
                        {partners.map((partner) => (
                            <option key={partner.id} value={partner.id}>
                                {partner.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="text-sm font-medium text-gray-700 md:col-span-2">
                    Horas de extensão (opcional)
                    <input
                        value={projectExtensionHours}
                        onChange={(event) => setProjectExtensionHours(event.target.value)}
                        type="number"
                        min={0}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="Ex.: 40"
                    />
                </label>
            </div>
        );
    }

    if (projectStep === 2) {
        return (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="text-lg font-bold text-gray-900">Resumo do Projeto</h3>
                <p className="mt-2 text-sm text-gray-600">
                    <strong>Título:</strong> {projectTitle || "Não informado"}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                    <strong>Parceiro:</strong> {partners.find((item) => item.id === projectPartnerId)?.label || "Não selecionado"}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                    <strong>Horas:</strong> {projectExtensionHours || "Não informado"}
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
            Revise os dados e clique em finalizar para concluir o cadastro do projeto.
        </div>
    );
}

export default function ProjectCreationCard({ loading, totalProjects, totalPartners, onAction }: ProjectCreationCardProps) {
    return (
        <CreationCard
            title="Criar Projeto"
            description="Vincule um projeto a um parceiro com horas de extensão."
            icon={<FaLightbulb className="text-3xl text-blue-900/70" />}
            actionLabel="Adicionar Projeto"
            onAction={onAction}
            loading={loading}
            totalLabel="Projetos cadastrados"
            totalValue={totalProjects}
            highlightText={`Parceiros disponíveis para vínculo: ${totalPartners}`}
            emptyStateText="Nenhum projeto cadastrado."
        />
    );
}
