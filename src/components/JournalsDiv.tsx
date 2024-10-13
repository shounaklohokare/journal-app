import { FC } from "react"
import { JournalEntryType } from "../utils/types";
import JournalEntry from "./JournalEntry";

interface JournalsDivProps {
    data: JournalEntryType[]
}

const JournalDiv: FC<JournalsDivProps> = ({ data }) => {


    return <div className="flex flex-col mt-36">
        {data.map((dataItem) => (

            <JournalEntry id={dataItem.id} created_at={dataItem.created_at} updated_at={dataItem.updated_at} title={dataItem.title} content={dataItem.content} />
        ))}
    </div>

}

export default JournalDiv;