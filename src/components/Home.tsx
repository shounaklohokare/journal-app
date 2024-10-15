import { FC, useEffect, useState } from "react"
import Navbar from "./Navbar";
import JournalDiv from "./JournalsDiv";
import journalData from '../data/data.json'
import { Entry } from "../store/features/entrySlice";

const Home: FC = () => {

  const [data, setData] = useState<Entry[]>([])

  useEffect(() => {

    setData(journalData)
  }, [])

  return <div>
    <Navbar />
    <JournalDiv data={data} />
  </div>

}

export default Home;