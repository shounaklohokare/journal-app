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

  }, [])

  const entries: Entry[] = useAppSelector((state) => state.entry.entries)

  console.log("entries in home page")
  console.log(entries)

  const lastEntryIdx = currentPage * ENTRIES_PER_PAGE;
  const firstEntryIdx = lastEntryIdx - ENTRIES_PER_PAGE;
  const totalEntries = entries?.length;

  const entriesOnPage = entries?.slice(firstEntryIdx, lastEntryIdx);


  return (entries.length === 0) ? <EmptyJournalMessage/> : <div className="flex-grow">
    <JournalDiv data={entriesOnPage} />
    {totalEntries > ENTRIES_PER_PAGE && <Pagination totalEntries={totalEntries} setCurrentPage={setCurrentPage} currentPage={currentPage} />}
  </div> 

}

const EmptyJournalMessage = () => {

  return <div className="flex-grow"><h1 className="text-[1.4rem] text-center mt-36 font-mono">There are no journal entries. Click on the 'New Entry' option to add entries here.</h1></div> 

}

export default Home;


