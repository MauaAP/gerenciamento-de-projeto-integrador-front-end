import type { ReactNode } from "react";
import { FaPlus } from "react-icons/fa";

type CreationCardProps = {
    title: string;
    description: string;
    icon: ReactNode;
    actionLabel: string;
    onAction: () => void;
    loading?: boolean;
    totalLabel: string;
    totalValue: number;
    highlightText?: string;
    emptyStateText?: string;
};

export default function CreationCard({
    title,
    description,
    icon,
    actionLabel,
    onAction,
    loading = false,
    totalLabel,
    totalValue,
    highlightText,
    emptyStateText
}: CreationCardProps) {
    return (
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">{icon}</div>

            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{description}</p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
                {loading ? (
                    <p className="text-sm text-gray-500">Carregando dados...</p>
                ) : (
                    <>
                        <p className="text-sm font-semibold text-blue-900/80">
                            {totalLabel}: {totalValue}
                        </p>
                        {highlightText && <p className="mt-1 text-xs text-gray-600">{highlightText}</p>}
                        {totalValue === 0 && emptyStateText && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500">{emptyStateText}</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            <button
                type="button"
                onClick={onAction}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-green-700 hover:to-green-800"
            >
                <FaPlus className="text-xs" />
                {actionLabel}
            </button>
        </article>
    );
}
