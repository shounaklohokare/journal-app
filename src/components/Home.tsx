import { FC, useEffect, useState } from "react"
import JournalDiv from "./JournalsDiv";
import { Entry, fetchEntry } from "../store/features/entrySlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { ENTRIES_PER_PAGE } from "../utils/constants";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

const Home: FC = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);


  const dispatch = useAppDispatch()

  const userid = useSelector((state) => state.entry.user_id);
 

  useEffect(() => {

 
    console.log(userid)
        
      dispatch(fetchEntry(userid)).then((result) => {
        if (fetchEntry.fulfilled.match(result)) {
            console.log("Fetched data")
        } 
    }).catch((error) => {
        console.log(error)
  
    });

      
  
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


