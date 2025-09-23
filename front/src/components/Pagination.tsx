// src/components/Pagination.tsx
import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "../hooks/types";

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	// Logique pour n'afficher qu'un sous-ensemble de pages si elles sont nombreuses
	const getPageNumbers = () => {
		const pageNumbers = [];
		const pagesToShow = 5; // Nombre de boutons de page à afficher au maximum
		const halfPages = Math.floor(pagesToShow / 2);

		if (totalPages <= pagesToShow) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			let startPage = Math.max(1, currentPage - halfPages);
			let endPage = Math.min(totalPages, currentPage + halfPages);

			if (currentPage <= halfPages) {
				endPage = pagesToShow;
			}
			if (currentPage + halfPages >= totalPages) {
				startPage = totalPages - pagesToShow + 1;
			}

			if (startPage > 1) {
				pageNumbers.push(1);
				if (startPage > 2) {
					pageNumbers.push("...");
				}
			}

			for (let i = startPage; i <= endPage; i++) {
				pageNumbers.push(i);
			}

			if (endPage < totalPages) {
				if (endPage < totalPages - 1) {
					pageNumbers.push("...");
				}
				pageNumbers.push(totalPages);
			}
		}

		return pageNumbers;
	};

	const pageNumbers = getPageNumbers();

	if (totalPages <= 1) {
		return null; // Ne rien afficher si une seule page ou moins
	}

	return (
		<nav
			className="flex items-center justify-center gap-2"
			aria-label="Pagination"
		>
			<button
				type="button"
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<ChevronLeft className="w-4 h-4 mr-1" /> Précédent
			</button>

			{pageNumbers.map((page, index) =>
				typeof page === "number" ? (
					<button
						key={`${page}-${page}`}
						type="button"
						onClick={() => onPageChange(page)}
						className={`flex items-center justify-center px-3 h-8 text-sm font-medium border rounded-md ${
							currentPage === page
								? "btn-dark border-gray-300 text-white z-10"
								: "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
						}`}
					>
						{page}
					</button>
				) : (
					<span
						key={`ellipsis-${index}`}
						className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-700"
					>
						...
					</span>
				),
			)}

			<button
				type="button"
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Suivant <ChevronRight className="w-4 h-4 ml-1" />
			</button>
		</nav>
	);
};

export default Pagination;
