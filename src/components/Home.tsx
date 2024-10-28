import { FC, useEffect } from "react"
import JournalDiv from "./JournalsDiv";

import { Entry, fetchEntry } from "../store/features/entrySlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const Home: FC = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEntry());
  })

  const entries: Entry[] = useAppSelector((state) => state.entry.entries)

  return <div>
    <JournalDiv data={entries} />
  </div>

}

export default Home;


