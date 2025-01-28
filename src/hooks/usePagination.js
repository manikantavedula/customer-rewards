import { useState } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const goToPreviousPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(maxPage);
  };

  const getCurrentData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const PaginationButtons = () => (
    <div id="pagination">
      <button onClick={goToFirstPage} disabled={currentPage === 1}>
        First
      </button>
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={goToNextPage} disabled={currentPage === maxPage}>
        Next
      </button>
      <button onClick={goToLastPage} disabled={currentPage === maxPage}>
        Last
      </button>
      <span>
        Page {currentPage} of {maxPage}
      </span>
    </div>
  );

  return {
    getCurrentData,
    PaginationButtons,
  };
};

export default usePagination;
