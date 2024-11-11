import { FC } from "react"
import JournalEntry from "./JournalEntry";
import { Entry } from "../store/features/entrySlice";

interface JournalsDivProps {
    data: Entry[]
}

const JournalDiv: FC<JournalsDivProps> = ({ data }) => {


    return <div className="flex flex-col mt-28">
        {data.map((dataItem) => (

            <JournalEntry entry_id={dataItem.entry_id} key={dataItem.entry_id + dataItem.title} created={dataItem.created} updated={dataItem.updated} title={dataItem.title} content={dataItem.content} user_id={dataItem.user_id} />
        ))}
    </div>

}

export default JournalDiv;