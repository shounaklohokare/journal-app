import { FC, useEffect, useState } from "react"
import JournalDiv from "./JournalsDiv";
import { Entry, fetchEntry } from "../store/features/entrySlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { ENTRIES_PER_PAGE } from "../utils/constants";
import Pagination from "./Pagination";

const Home: FC = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);


  const dispatch = useAppDispatch()


  useEffect(() => {

    dispatch(fetchEntry())

  })

  const entries: Entry[] = useAppSelector((state) => state.entry.entries)

  const lastEntryIdx = currentPage * ENTRIES_PER_PAGE;
  const firstEntryIdx = lastEntryIdx - ENTRIES_PER_PAGE;
  const totalEntries = entries?.length;

  const entriesOnPage = entries?.slice(firstEntryIdx, lastEntryIdx);


  return <div className="flex-grow">
    <JournalDiv data={entriesOnPage} />
    {totalEntries > ENTRIES_PER_PAGE && <Pagination totalEntries={totalEntries} setCurrentPage={setCurrentPage} currentPage={currentPage} />}
  </div> 

}

export default Home;


