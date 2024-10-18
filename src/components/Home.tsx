import { FC, useEffect, useState } from "react"
import Navbar from "./Navbar";
import JournalDiv from "./JournalsDiv";
import journalData from '../data/data.json'
import { Entry, fetchEntry } from "../store/features/entrySlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const Home: FC = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEntry());
  })

  const entries = useAppSelector((state) => state.entry.entries)

  return <div>
    <Navbar />
    <JournalDiv data={entries} />
  </div>

}

export default Home;


