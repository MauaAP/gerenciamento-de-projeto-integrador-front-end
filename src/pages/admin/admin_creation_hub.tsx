import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import {
    FaTimes,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";
import UserCreationCard from "../../components/creationCards/UserCreationCard";
import PartnerCreationCard from "../../components/creationCards/PartnerCreationCard";
import ProjectCreationCard, { ProjectCreationStepContent } from "../../components/creationCards/ProjectCreationCard";
import GroupCreationCard, { GroupCreationStepContent } from "../../components/creationCards/GroupCreationCard";
import BoardCreationCard, { BoardCreationStepContent } from "../../components/creationCards/BoardCreationCard";
import PresentationCreationCard, { PresentationCreationStepContent } from "../../components/creationCards/PresentationCreationCard";
import NavBar from "../../components/navBar";
import { SlideBarContextProvider } from "../../contexts/slideBarContext";
import type { MenuItems } from "../../services/menuItems";
import { creationCategoryConfig, type CreationCategoryKey } from "../../services/interface/CreationCategory";
import { createUser } from "../../api/repository/user/createUser";
import { createPartner } from "../../api/repository/partner/createPartner";
import { createProject } from "../../api/repository/project/createProject";
import { createGroup } from "../../api/repository/group/createGroup";
import { createExaminationBoard } from "../../api/repository/examinationBoard/createExaminationBoard";
import { createPresentation } from "../../api/repository/presentation/createPresentation";
import { getAllUsers, type GetAllUserSchema } from "../../api/repository/user/getAllUsers";
import { getAllPartners, type GetAllPartnerSchema } from "../../api/repository/partner/getAllPartners";
import { getAllProjects, type GetAllProjectsSchema } from "../../api/repository/project/getAllProjects";
import { getAllGroups } from "../../api/repository/group/getAllGroups";
import { getAllExaminationBoards, type GetAllExaminationBoardsSchema } from "../../api/repository/examinationBoard/getAllExaminationBoards";
import { getAllClassrooms } from "../../api/repository/classroom/getAllClassrooms";
import { getAllCourses } from "../../api/repository/course/getAllCourses";

type Option = {
    id: string;
    label: string;
};

type UserOption = Option & {
    role: string;
    email: string;
};

type GroupOption = Option & {
    userNameList: string[];
};

type BoardOption = Option & {
    professorNameList: string[];
};

type ModalType = CreationCategoryKey | null;

type ModalShellProps = {
    title: string;
    subtitle: string;
    onClose: () => void;
    children: ReactNode;
};

function ModalShell({ title, subtitle, onClose, children }: ModalShellProps) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-3xl rounded-2xl border border-blue-100 bg-white shadow-2xl">
                <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-900/80">{title}</h2>
                        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
            </div>
        </div>
    );
}

type WizardHeaderProps = {
    currentStep: number;
    steps: string[];
};

function WizardHeader({ currentStep, steps }: WizardHeaderProps) {
    return (
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isDone = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                    <div
                        key={step}
                        className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${isCurrent
                            ? "border-blue-300 bg-blue-50 text-blue-900"
                            : isDone
                                ? "border-green-200 bg-green-50 text-green-800"
                                : "border-gray-200 bg-gray-50 text-gray-500"
                            }`}
                    >
                        <span className="mr-2 rounded-full bg-white px-2 py-1 text-xs font-bold">{stepNumber}</span>
                        {step}
                    </div>
                );
            })}
        </div>
    );
}

function toOption(item: Record<string, unknown>): Option {
    const id = String(item.id ?? "");
    const name = item.name;
    const title = item.title;
    const codSubj = item.codSubj;
    const classroomName = item.classroomName;

    let label = "Não identificado";

    if (typeof name === "string" && name.trim()) label = name;
    else if (typeof title === "string" && title.trim()) label = title;
    else if (typeof codSubj === "string" && codSubj.trim()) label = codSubj;
    else if (typeof classroomName === "string" && classroomName.trim()) label = classroomName;
    else if (id) label = id;

    return { id, label };
}

function normalizeUser(item: Record<string, unknown>): UserOption {
    const base = toOption(item);
    const role = String(item.role ?? "");
    const email = String(item.email ?? "");

    return {
        ...base,
        role,
        email
    };
}

function normalizeProject(item: GetAllProjectsSchema): Option {
    const projectId = item.id ?? "";
    const projectTitle = item.title?.trim() ?? "Sem projeto";
    const partnerName = item.partnerName?.trim() ?? "";

    return {
        id: projectId,
        label: partnerName ? `${projectTitle} (${partnerName})` : projectTitle
    };
}

function normalizeGroup(item: Record<string, unknown>): GroupOption {
    const base = toOption(item);
    const project = item.project as Record<string, unknown> | undefined;
    const title = typeof project?.title === "string" ? project.title : "Sem projeto";
    const codSubj = typeof item.codSubj === "string" ? item.codSubj : "Sem código";
    const userNameList = Array.isArray(item.userNameList)
        ? item.userNameList.filter((value): value is string => typeof value === "string")
        : [];

    return {
        ...base,
        label: `${codSubj} - ${title}`,
        userNameList
    };
}

function normalizeBoard(item: GetAllExaminationBoardsSchema): BoardOption {
    const boardId: string = String(item.id ?? "");
    const professorNameList = item.ProfessorNameList ?? []

    return {
        id: boardId,
        label: professorNameList.length > 0 ? `Banca com ${professorNameList.length} professor(es)` : "Banca sem professor",
        professorNameList
    };
}

function normalizePartner(item: GetAllPartnerSchema): Option {
    const partnerId = item.partnerId ?? "";
    const partnerName = item.name?.trim() ?? "";
    const partnerSector = item.sector?.trim() ?? "";

    return {
        id: partnerId,
        label: partnerSector ? `${partnerName} (${partnerSector})` : partnerName
    };
}

export default function AdminCreationHub({ menuItems }: { menuItems: MenuItems[] }) {
    const [users, setUsers] = useState<UserOption[]>([]);
    const [partners, setPartners] = useState<Option[]>([]);
    const [projects, setProjects] = useState<Option[]>([]);
    const [groups, setGroups] = useState<GroupOption[]>([]);
    const [boards, setBoards] = useState<BoardOption[]>([]);
    const [classrooms, setClassrooms] = useState<Option[]>([]);
    const [courses, setCourses] = useState<Option[]>([]);
    const [isLoadingLookups, setIsLoadingLookups] = useState(false);
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const [isSaving, setIsSaving] = useState(false);

    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("Estudante");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [partnerName, setPartnerName] = useState("");
    const [partnerSector, setPartnerSector] = useState("Educacional");

    const [projectStep, setProjectStep] = useState(1);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectPartnerId, setProjectPartnerId] = useState("");
    const [projectExtensionHours, setProjectExtensionHours] = useState("");

    const [groupStep, setGroupStep] = useState(1);
    const [groupProjectId, setGroupProjectId] = useState("");
    const [groupCourseId, setGroupCourseId] = useState("");
    const [groupCodSubj, setGroupCodSubj] = useState("");
    const [groupYearSem, setGroupYearSem] = useState("");
    const [groupStudentQuery, setGroupStudentQuery] = useState("");
    const [groupStudentIds, setGroupStudentIds] = useState<string[]>([]);

    const [boardStep, setBoardStep] = useState(1);
    const [boardLinkedGroupId, setBoardLinkedGroupId] = useState("");
    const [boardProfessorQuery, setBoardProfessorQuery] = useState("");
    const [boardProfessorIds, setBoardProfessorIds] = useState<string[]>([]);

    const [presentationStep, setPresentationStep] = useState(1);
    const [presentationGroupId, setPresentationGroupId] = useState("");
    const [presentationBoardId, setPresentationBoardId] = useState("");
    const [presentationDate, setPresentationDate] = useState("");
    const [presentationClassroomId, setPresentationClassroomId] = useState("");

    const groupStudentInputRef = useRef<HTMLInputElement>(null);
    const boardProfessorInputRef = useRef<HTMLInputElement>(null);

    const studentUsers = useMemo(() => users.filter((item) => item.role === "STUDENT"), [users]);
    const professorUsers = useMemo(() => users.filter((item) => item.role === "PROFESSOR"), [users]);

    const filteredStudents = useMemo(() => {
        const query = groupStudentQuery.trim().toLowerCase();

        if (!query) return studentUsers;

        return studentUsers.filter((item) => {
            return item.label.toLowerCase().includes(query) || item.email.toLowerCase().includes(query);
        });
    }, [studentUsers, groupStudentQuery]);

    const filteredProfessors = useMemo(() => {
        const query = boardProfessorQuery.trim().toLowerCase();

        if (!query) return professorUsers;

        return professorUsers.filter((item) => {
            return item.label.toLowerCase().includes(query) || item.email.toLowerCase().includes(query);
        });
    }, [professorUsers, boardProfessorQuery]);

    const selectedLinkedGroup = useMemo(
        () => groups.find((item) => item.id === boardLinkedGroupId),
        [groups, boardLinkedGroupId]
    );

    const selectedPresentationGroup = useMemo(
        () => groups.find((item) => item.id === presentationGroupId),
        [groups, presentationGroupId]
    );

    const selectedPresentationBoard = useMemo(
        () => boards.find((item) => item.id === presentationBoardId),
        [boards, presentationBoardId]
    );

    const refreshUsers = useCallback(async () => {
        const usersData = await getAllUsers();
        setUsers(Array.isArray(usersData) ? usersData.map((item) => normalizeUser(item as GetAllUserSchema)) : []);
    }, []);

    const refreshPartners = useCallback(async () => {
        const partnersData = await getAllPartners();
        setPartners(
            Array.isArray(partnersData)
                ? partnersData.map((item) => normalizePartner(item as GetAllPartnerSchema))
                : []
        );
    }, []);

    const refreshProjects = useCallback(async () => {
        const projectsData = await getAllProjects();
        setProjects(
            Array.isArray(projectsData)
                ? projectsData.map((item) => normalizeProject(item as GetAllProjectsSchema))
                : []
        );
    }, []);

    const refreshGroups = useCallback(async () => {
        const groupsData = await getAllGroups();
        setGroups(Array.isArray(groupsData) ? groupsData.map((item) => normalizeGroup(item as Record<string, unknown>)) : []);
    }, []);

    const refreshBoards = useCallback(async () => {
        const boardsData = await getAllExaminationBoards();
        setBoards(
            Array.isArray(boardsData)
                ? boardsData.map((item) => normalizeBoard(item as GetAllExaminationBoardsSchema))
                : []
        );
    }, []);

    const refreshClassrooms = useCallback(async () => {
        const classroomsData = await getAllClassrooms();
        setClassrooms(Array.isArray(classroomsData) ? classroomsData.map((item) => toOption(item as Record<string, unknown>)) : []);
    }, []);

    const refreshCourses = useCallback(async () => {
        const coursesData = await getAllCourses();
        setCourses(Array.isArray(coursesData) ? coursesData.map((item) => toOption(item as Record<string, unknown>)) : []);
    }, []);

    const refreshLookups = useCallback(async () => {
        setIsLoadingLookups(true);

        try {
            const [
                // usersData,
                // partnersData,
                projectsData,
                // groupsData,
                // boardsData,
                // classroomsData,
                // coursesData
            ] = await Promise.all([
                // getAllUsers(),
                // getAllPartners(),
                getAllProjects(),
                // getAllGroups(),
                // getAllExaminationBoards(),
                // getAllClassrooms(),
                // getAllCourses()
            ]);

            // setUsers(Array.isArray(usersData) ? usersData.map((item) => normalizeUser(item as GetAllUserSchema)) : []);
            // setPartners(
            //     Array.isArray(partnersData)
            //         ? partnersData
            //             .map((item) => normalizePartner(item as GetAllPartnerSchema))
            //         : []
            // );
            setProjects(
                Array.isArray(projectsData)
                    ? projectsData
                        .map((item) => normalizeProject(item as GetAllProjectsSchema)) : []);
            // setGroups(Array.isArray(groupsData) ? groupsData.map((item) => normalizeGroup(item as Record<string, unknown>)) : []);
            // setBoards(
            //     Array.isArray(boardsData) 
            //         ? boardsData
            //         .map((item) => normalizeBoard(item as GetAllExaminationBoardsSchema)) : []);
            // setClassrooms(Array.isArray(classroomsData) ? classroomsData.map((item) => toOption(item as Record<string, unknown>)) : []);
            // setCourses(Array.isArray(coursesData) ? coursesData.map((item) => toOption(item as Record<string, unknown>)) : []);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            toast.error("Não foi possível carregar os dados de apoio.");
        } finally {
            setIsLoadingLookups(false);
        }
    }, []);

    useEffect(() => {
        void refreshLookups();
        void refreshCourses();
    }, [refreshLookups, refreshCourses]);

    const openModal = (modal: Exclude<ModalType, null>) => {
        setActiveModal(modal);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const resetSimpleForms = () => {
        setUserName("");
        setUserRole("Estudante");
        setUserEmail("");
        setUserPassword("");
        setPartnerName("");
        setPartnerSector("Educacional");
    };

    const resetProjectForm = () => {
        setProjectStep(1);
        setProjectTitle("");
        setProjectPartnerId("");
        setProjectExtensionHours("");
    };

    const resetGroupForm = () => {
        setGroupStep(1);
        setGroupProjectId("");
        setGroupCourseId("");
        setGroupCodSubj("");
        setGroupYearSem("");
        setGroupStudentQuery("");
        setGroupStudentIds([]);
    };

    const resetBoardForm = () => {
        setBoardStep(1);
        setBoardLinkedGroupId("");
        setBoardProfessorQuery("");
        setBoardProfessorIds([]);
    };

    const resetPresentationForm = () => {
        setPresentationStep(1);
        setPresentationGroupId("");
        setPresentationBoardId("");
        setPresentationDate("");
        setPresentationClassroomId("");
    };

    const handleCreateUser = async () => {
        if (!userName || !userEmail || !userPassword) {
            toast.warning("Preencha nome, email e senha para criar o usuário.");
            return;
        }

        setIsSaving(true);
        try {
            await createUser({
                name: userName,
                role: userRole as "Admin" | "Moderador" | "Professor" | "Estudante",
                email: userEmail,
                password: userPassword
            });

            toast.success("Usuário criado com sucesso.");
            closeModal();
            resetSimpleForms();
            await refreshUsers();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar usuário.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreatePartner = async () => {
        if (!partnerName) {
            toast.warning("Informe o nome do parceiro.");
            return;
        }

        setIsSaving(true);
        try {
            await createPartner({
                name: partnerName,
                sector: partnerSector as "Educacional" | "Governamental" | "Industrial" | "Saúde" | "ONG" | "Ambiental" | "Financeiro"
            });

            toast.success("Parceiro criado com sucesso.");
            closeModal();
            setPartnerName("");
            setPartnerSector("Educacional");
            await refreshPartners();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar parceiro.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateProject = async () => {
        if (!projectTitle || !projectPartnerId) {
            toast.warning("Preencha título e parceiro.");
            return;
        }

        setIsSaving(true);

        try {
            await createProject({
                title: projectTitle,
                partnerId: projectPartnerId,
                extensionHours: projectExtensionHours ? Number(projectExtensionHours) : undefined
            });

            toast.success("Projeto criado com sucesso.");
            closeModal();
            resetProjectForm();
            await refreshProjects();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar projeto.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateGroup = async () => {
        if (!groupProjectId || !groupCourseId || !groupCodSubj || !groupYearSem || groupStudentIds.length === 0) {
            toast.warning("Complete os passos do wizard e selecione ao menos um aluno.");
            return;
        }

        setIsSaving(true);

        try {
            await createGroup({
                codSubj: groupCodSubj,
                userIdList: groupStudentIds,
                yearSem: Number(groupYearSem),
                projectId: groupProjectId,
                courseId: groupCourseId
            });

            toast.success("Grupo criado com sucesso.");
            closeModal();
            resetGroupForm();
            await refreshGroups();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar grupo.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateBoard = async () => {
        if (boardProfessorIds.length === 0) {
            toast.warning("Selecione ao menos um professor.");
            return;
        }

        setIsSaving(true);

        try {
            await createExaminationBoard({ professorIdList: boardProfessorIds });
            toast.success("Banca criada com sucesso.");
            closeModal();
            resetBoardForm();
            await refreshBoards();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar banca examinadora.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreatePresentation = async () => {
        if (!presentationDate || !presentationClassroomId || !presentationGroupId || !presentationBoardId) {
            toast.warning("Selecione grupo e banca, e informe data/sala.");
            return;
        }

        setIsSaving(true);

        try {
            await createPresentation({
                date: new Date(presentationDate).getTime(),
                groupId: presentationGroupId,
                examinationBoardId: presentationBoardId,
                classRoomId: presentationClassroomId
            });

            toast.success("Apresentação criada com sucesso.");
            closeModal();
            resetPresentationForm();
            await refreshClassrooms();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar apresentação.");
        } finally {
            setIsSaving(false);
        }
    };

    const toggleSelectedId = (id: string, list: string[], setter: (next: string[]) => void) => {
        if (list.includes(id)) {
            setter(list.filter((value) => value !== id));
            return;
        }

        setter([...list, id]);
    };

    return (
        <SlideBarContextProvider>
            <main className="flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/30">
                <NavBar menuItems={menuItems} />

                <section className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto w-full max-w-7xl">
                        <div className="mb-8 rounded-2xl border border-blue-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                            <h1 className="text-3xl font-bold text-blue-900/80">Creation Hub</h1>
                            <p className="mt-2 text-gray-600">
                                Crie entidades-chave do sistema com fluxos guiados, busca dinâmica e vínculos hierárquicos.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            <UserCreationCard
                                loading={isLoadingLookups}
                                totalUsers={users.length}
                                totalProfessors={professorUsers.length}
                                totalStudents={studentUsers.length}
                                onAction={() => openModal("user")}
                            />

                            <PartnerCreationCard
                                loading={isLoadingLookups}
                                totalPartners={partners.length}
                                latestPartnerName={partners[0]?.label}
                                onAction={() => openModal("partner")}
                            />

                            <ProjectCreationCard
                                loading={isLoadingLookups}
                                totalProjects={projects.length}
                                totalPartners={partners.length}
                                onAction={() => openModal("project")}
                            />

                            <GroupCreationCard
                                loading={isLoadingLookups}
                                totalGroups={groups.length}
                                totalProjects={projects.length}
                                totalCourses={courses.length}
                                onAction={() => openModal("group")}
                            />

                            <BoardCreationCard
                                loading={isLoadingLookups}
                                totalBoards={boards.length}
                                totalProfessors={professorUsers.length}
                                onAction={() => openModal("board")}
                            />

                            <PresentationCreationCard
                                loading={isLoadingLookups}
                                totalReadyPresentations={Math.min(groups.length, boards.length)}
                                totalGroups={groups.length}
                                totalBoards={boards.length}
                                totalClassrooms={classrooms.length}
                                onAction={() => openModal("presentation")}
                            />
                        </div>
                    </div>
                </section>
            </main>

            {activeModal === "user" && (
                <ModalShell
                    title={creationCategoryConfig.user.title}
                    subtitle={creationCategoryConfig.user.subtitle}
                    onClose={() => {
                        closeModal();
                        resetSimpleForms();
                    }}
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-gray-700">
                            Nome
                            <input
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                                placeholder="Nome completo"
                            />
                        </label>

                        <label className="text-sm font-medium text-gray-700">
                            Papel
                            <select
                                value={userRole}
                                onChange={(event) => setUserRole(event.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                            >
                                <option>Admin</option>
                                <option>Moderador</option>
                                <option>Professor</option>
                                <option>Estudante</option>
                            </select>
                        </label>

                        <label className="text-sm font-medium text-gray-700 md:col-span-2">
                            Email
                            <input
                                value={userEmail}
                                onChange={(event) => setUserEmail(event.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                                placeholder="email@dominio.com"
                            />
                        </label>

                        <label className="text-sm font-medium text-gray-700 md:col-span-2">
                            Senha temporária
                            <input
                                value={userPassword}
                                onChange={(event) => setUserPassword(event.target.value)}
                                type="password"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                                placeholder="Mínimo de 6 caracteres"
                            />
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={handleCreateUser}
                            disabled={isSaving}
                            className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-semibold text-white transition-all hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Criando..." : "Criar Usuário"}
                        </button>
                    </div>
                </ModalShell>
            )}

            {activeModal === "partner" && (
                <ModalShell
                    title={creationCategoryConfig.partner.title}
                    subtitle={creationCategoryConfig.partner.subtitle}
                    onClose={() => {
                        closeModal();
                        setPartnerName("");
                        setPartnerSector("Educacional");
                    }}
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-gray-700 md:col-span-2">
                            Nome do parceiro
                            <input
                                value={partnerName}
                                onChange={(event) => setPartnerName(event.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                                placeholder="Ex.: Instituto Mauá"
                            />
                        </label>

                        <label className="text-sm font-medium text-gray-700 md:col-span-2">
                            Setor
                            <select
                                value={partnerSector}
                                onChange={(event) => setPartnerSector(event.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                            >
                                <option>Educacional</option>
                                <option>Governamental</option>
                                <option>Industrial</option>
                                <option>Saúde</option>
                                <option>ONG</option>
                                <option>Ambiental</option>
                                <option>Financeiro</option>
                            </select>
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={handleCreatePartner}
                            disabled={isSaving}
                            className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-semibold text-white transition-all hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "Criando..." : "Criar Parceiro"}
                        </button>
                    </div>
                </ModalShell>
            )}

            {activeModal === "project" && (
                <ModalShell
                    title={creationCategoryConfig.project.title}
                    subtitle={creationCategoryConfig.project.subtitle}
                    onClose={() => {
                        closeModal();
                        resetProjectForm();
                    }}
                >
                    <WizardHeader
                        currentStep={projectStep}
                        steps={creationCategoryConfig.project.steps ?? []}
                    />

                    <ProjectCreationStepContent
                        projectStep={projectStep}
                        projectTitle={projectTitle}
                        setProjectTitle={setProjectTitle}
                        projectPartnerId={projectPartnerId}
                        setProjectPartnerId={setProjectPartnerId}
                        projectExtensionHours={projectExtensionHours}
                        setProjectExtensionHours={setProjectExtensionHours}
                        partners={partners}
                    />

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setProjectStep((current) => Math.max(1, current - 1))}
                            disabled={projectStep === 1 || isSaving}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed"
                        >
                            <FaChevronLeft /> Voltar
                        </button>

                        {projectStep < (creationCategoryConfig.project.steps?.length ?? 0) ? (
                            <button
                                type="button"
                                onClick={() =>
                                    setProjectStep((current) => Math.min(creationCategoryConfig.project.steps?.length ?? 1, current + 1))
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-900/70 px-4 py-2 text-sm font-semibold text-white"
                            >
                                Próximo <FaChevronRight />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCreateProject}
                                disabled={isSaving}
                                className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-semibold text-white transition-all hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Criando..." : "Finalizar Projeto"}
                            </button>
                        )}
                    </div>
                </ModalShell>
            )}

            {activeModal === "group" && (
                <ModalShell
                    title={creationCategoryConfig.group.title}
                    subtitle={creationCategoryConfig.group.subtitle}
                    onClose={() => {
                        closeModal();
                        resetGroupForm();
                    }}
                >
                    <WizardHeader
                        currentStep={groupStep}
                        steps={creationCategoryConfig.group.steps ?? []}
                    />

                    <GroupCreationStepContent
                        groupStep={groupStep}
                        groupProjectId={groupProjectId}
                        setGroupProjectId={setGroupProjectId}
                        groupCourseId={groupCourseId}
                        setGroupCourseId={setGroupCourseId}
                        groupCodSubj={groupCodSubj}
                        setGroupCodSubj={setGroupCodSubj}
                        groupYearSem={groupYearSem}
                        setGroupYearSem={setGroupYearSem}
                        projects={projects}
                        courses={courses}
                        groupStudentInputRef={groupStudentInputRef}
                        groupStudentQuery={groupStudentQuery}
                        setGroupStudentQuery={setGroupStudentQuery}
                        filteredStudents={filteredStudents}
                        groupStudentIds={groupStudentIds}
                        toggleSelectedId={toggleSelectedId}
                        setGroupStudentIds={setGroupStudentIds}
                        studentUsers={studentUsers}
                    />

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setGroupStep((current) => Math.max(1, current - 1))}
                            disabled={groupStep === 1 || isSaving}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed"
                        >
                            <FaChevronLeft /> Voltar
                        </button>

                        {groupStep < (creationCategoryConfig.group.steps?.length ?? 0) ? (
                            <button
                                type="button"
                                onClick={() =>
                                    setGroupStep((current) => Math.min(creationCategoryConfig.group.steps?.length ?? 1, current + 1))
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-900/70 px-4 py-2 text-sm font-semibold text-white"
                            >
                                Próximo <FaChevronRight />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCreateGroup}
                                disabled={isSaving}
                                className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-semibold text-white transition-all hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Criando..." : "Finalizar Grupo"}
                            </button>
                        )}
                    </div>
                </ModalShell>
            )}

            {activeModal === "board" && (
                <ModalShell
                    title={creationCategoryConfig.board.title}
                    subtitle={creationCategoryConfig.board.subtitle}
                    onClose={() => {
                        closeModal();
                        resetBoardForm();
                    }}
                >
                    <WizardHeader
                        currentStep={boardStep}
                        steps={creationCategoryConfig.board.steps ?? []}
                    />

                    <BoardCreationStepContent
                        boardStep={boardStep}
                        boardLinkedGroupId={boardLinkedGroupId}
                        setBoardLinkedGroupId={setBoardLinkedGroupId}
                        groups={groups}
                        selectedLinkedGroup={selectedLinkedGroup}
                        boardProfessorInputRef={boardProfessorInputRef}
                        boardProfessorQuery={boardProfessorQuery}
                        setBoardProfessorQuery={setBoardProfessorQuery}
                        filteredProfessors={filteredProfessors}
                        boardProfessorIds={boardProfessorIds}
                        toggleSelectedId={toggleSelectedId}
                        setBoardProfessorIds={setBoardProfessorIds}
                        professorUsers={professorUsers}
                    />

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setBoardStep((current) => Math.max(1, current - 1))}
                            disabled={boardStep === 1 || isSaving}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed"
                        >
                            <FaChevronLeft /> Voltar
                        </button>

                        {boardStep < (creationCategoryConfig.board.steps?.length ?? 0) ? (
                            <button
                                type="button"
                                onClick={() =>
                                    setBoardStep((current) => Math.min(creationCategoryConfig.board.steps?.length ?? 1, current + 1))
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-900/70 px-4 py-2 text-sm font-semibold text-white"
                            >
                                Próximo <FaChevronRight />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCreateBoard}
                                disabled={isSaving}
                                className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-semibold text-white transition-all hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Criando..." : "Finalizar Banca"}
                            </button>
                        )}
                    </div>
                </ModalShell>
            )}

            {activeModal === "presentation" && (
                <ModalShell
                    title={creationCategoryConfig.presentation.title}
                    subtitle={creationCategoryConfig.presentation.subtitle}
                    onClose={() => {
                        closeModal();
                        resetPresentationForm();
                    }}
                >
                    <WizardHeader
                        currentStep={presentationStep}
                        steps={creationCategoryConfig.presentation.steps ?? []}
                    />

                    <PresentationCreationStepContent
                        presentationStep={presentationStep}
                        presentationGroupId={presentationGroupId}
                        setPresentationGroupId={setPresentationGroupId}
                        presentationBoardId={presentationBoardId}
                        setPresentationBoardId={setPresentationBoardId}
                        presentationDate={presentationDate}
                        setPresentationDate={setPresentationDate}
                        presentationClassroomId={presentationClassroomId}
                        setPresentationClassroomId={setPresentationClassroomId}
                        groups={groups}
                        boards={boards}
                        classrooms={classrooms}
                        selectedPresentationGroup={selectedPresentationGroup}
                        selectedPresentationBoard={selectedPresentationBoard}
                    />

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setPresentationStep((current) => Math.max(1, current - 1))}
                            disabled={presentationStep === 1 || isSaving}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed"
                        >
                            <FaChevronLeft /> Voltar
                        </button>

                        {presentationStep < (creationCategoryConfig.presentation.steps?.length ?? 0) ? (
                            <button
                                type="button"
                                onClick={() =>
                                    setPresentationStep((current) => Math.min(creationCategoryConfig.presentation.steps?.length ?? 1, current + 1))
                                }
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-900/70 px-4 py-2 text-sm font-semibold text-white"
                            >
                                Próximo <FaChevronRight />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCreatePresentation}
                                disabled={isSaving}
                                className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-semibold text-white transition-all hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Criando..." : "Finalizar Apresentação"}
                            </button>
                        )}
                    </div>
                </ModalShell>
            )}

        </SlideBarContextProvider>
    );
}
