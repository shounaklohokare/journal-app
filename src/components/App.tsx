import { FC, useEffect, useState } from "react"
import Navbar from "./Navbar";
import JournalDiv from "./JournalsDiv";
import journalData from '../data/data.json'
import { JournalEntryType } from "../utils/types";


const App: FC = () => {

  const [data, setData] = useState<JournalEntryType[]>([])

  useEffect(() => {

    setData(journalData)
  }, [])

  return <div>
    <Navbar />
    <JournalDiv data={data} />
  </div>

}

export default App;