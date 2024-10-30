import { FC } from "react";
import { ENTRIES_PER_PAGE } from "../utils/constants";

interface PaginationProps {
    totalEntries: number
    setCurrentPage: (arg: number) => void
    currentPage: number
}

const Pagination: FC<PaginationProps> = ({ totalEntries, setCurrentPage, currentPage }) => {

    const pages = [];

    for (let i = 1; i <= Math.ceil(totalEntries / ENTRIES_PER_PAGE); i++) {
        pages.push(i)
    }

    return <div className="fixed left-1/2 bottom-24 mb-5 flex items-center justify-center md:space-x-3 space-x-1 md:py-1 py-4 md:my-1 my-1 ">
        {
            pages.map((page, index) => {
                return <button key={index} className={`page-btn ${page === currentPage ? 'bg-slate-100 border-2 underline border-slate-950 italic' : ''} `} onClick={() => { setCurrentPage(page) }}>{page}</button>
            })
        }
    </div>

}

export default Pagination;