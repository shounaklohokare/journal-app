import { FC, useEffect } from "react"
import JournalEntry from "./JournalEntry";
import { Entry } from "../store/features/entrySlice";

interface JournalsDivProps {
    data: Entry[]
}

const JournalDiv: FC<JournalsDivProps> = ({ data }) => {


    useEffect(() => {
        console.log(data)
    })

    return <div className="flex flex-col mt-36">
        {data.map((dataItem) => (

            <JournalEntry entry_id={dataItem.entry_id} key={dataItem.entry_id + dataItem.title} created={dataItem.created} updated={dataItem.updated} title={dataItem.title} content={dataItem.content} />
        ))}
    </div>

}

export default JournalDiv;