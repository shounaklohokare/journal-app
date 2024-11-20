import { FC, useEffect, useState } from "react"
import JournalDiv from "./JournalsDiv";
import { Entry, EntryState, fetchEntry } from "../store/features/entrySlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { ENTRIES_PER_PAGE } from "../utils/constants";
import Pagination from "./Pagination";
import { sortEntriesByLastUpdate} from "../utils/utils";

const Home: FC = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);


  const dispatch = useAppDispatch()


  useEffect(() => {

    dispatch(fetchEntry())

  }, [])

  const entries: Entry[] = sortEntriesByLastUpdate(useAppSelector((state) => (state as unknown as { entry: EntryState }).entry.entries))


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

  return <div className="flex-grow"><h1 className="md:text-[1.3rem] text-md text-center mt-28 font-mono">There are no journal entries. Click on the 'New Entry' option to add entries here.</h1></div> 

}

export default Home;


