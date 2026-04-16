import { FaHandshake } from "react-icons/fa";
import CreationCard from "../creationCard";

type PartnerCreationCardProps = {
    loading: boolean;
    totalPartners: number;
    latestPartnerName?: string;
    onAction: () => void;
};

export default function PartnerCreationCard({ loading, totalPartners, latestPartnerName, onAction }: PartnerCreationCardProps) {
    return (
        <CreationCard
            title="Criar Parceiro"
            description="Registre uma organização parceira com setor de atuação."
            icon={<FaHandshake className="text-3xl text-blue-900/70" />}
            actionLabel="Adicionar Parceiro"
            onAction={onAction}
            loading={loading}
            totalLabel="Parceiros cadastrados"
            totalValue={totalPartners}
            highlightText={latestPartnerName ? `Último parceiro listado: ${latestPartnerName}` : undefined}
            emptyStateText="Nenhum parceiro disponível."
        />
    );
}
