
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss'

const Pagination = ({currentPage, onChangeCurrentPage}) => {
  return (
    <ReactPaginate
      className={styles.root}
    breakLabel="..."
    nextLabel=" >"
    onPageChange={(event => onChangeCurrentPage(event.selected + 1))}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage - 1 }
    previousLabel="< "
    renderOnZeroPageCount={null}
  />
  )
};

export default Pagination;
