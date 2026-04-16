import { FaUserPlus } from "react-icons/fa";
import CreationCard from "../creationCard";

type UserCreationCardProps = {
    loading: boolean;
    totalUsers: number;
    totalProfessors: number;
    totalStudents: number;
    onAction: () => void;
};

export default function UserCreationCard({ loading, totalUsers, totalProfessors, totalStudents, onAction }: UserCreationCardProps) {
    return (
        <CreationCard
            title="Criar Usuário"
            description="Cadastro de acesso para admin, moderador, professor e estudante."
            icon={<FaUserPlus className="text-3xl text-blue-900/70" />}
            actionLabel="Adicionar Usuário"
            onAction={onAction}
            loading={loading}
            totalLabel="Usuários cadastrados"
            totalValue={totalUsers}
            highlightText={`Professores: ${totalProfessors} | Estudantes: ${totalStudents}`}
            emptyStateText="Nenhum usuário cadastrado ainda."
        />
    );
}
