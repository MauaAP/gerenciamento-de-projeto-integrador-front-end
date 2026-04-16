export type CreationCategoryKey =
    | "user"
    | "partner"
    | "project"
    | "group"
    | "board"
    | "presentation";

export type CreationCategoryConfig = {
    title: string;
    subtitle: string;
    steps?: string[];
};

export const creationCategoryConfig: Record<CreationCategoryKey, CreationCategoryConfig> = {
    user: {
        title: "Criar Usuário",
        subtitle: "Preencha os dados de acesso do novo usuário."
    },
    partner: {
        title: "Criar Parceiro",
        subtitle: "Cadastre o parceiro antes de vinculá-lo a projetos."
    },
    project: {
        title: "Wizard: Criar Projeto",
        subtitle: "Passo a passo para garantir consistência de dados.",
        steps: ["Dados do Projeto", "Revisão", "Conclusão"]
    },
    group: {
        title: "Wizard: Criar Grupo",
        subtitle: "Comece pelo projeto e selecione os alunos com busca dinâmica.",
        steps: ["Base do Grupo", "Selecionar Alunos", "Revisão"]
    },
    board: {
        title: "Wizard: Criar Banca Examinadora",
        subtitle: "Selecione um grupo opcionalmente e adicione professores por busca dinâmica.",
        steps: ["Vincular Grupo", "Selecionar Professores", "Revisão"]
    },
    presentation: {
        title: "Wizard: Criar Apresentação",
        subtitle: "Selecione grupo e banca juntos para manter o vínculo completo.",
        steps: ["Grupo + Banca", "Data e Sala", "Revisão"]
    }
};
