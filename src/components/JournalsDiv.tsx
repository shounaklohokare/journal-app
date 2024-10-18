import { FC } from "react"
import JournalEntry from "./JournalEntry";
import { Entry } from "../store/features/entrySlice";

interface JournalsDivProps {
    data: Entry[]
}

const JournalDiv: FC<JournalsDivProps> = ({ data }) => {


    return <div className="flex flex-col mt-36">
        {data.map((dataItem) => (

            <JournalEntry id={dataItem.id} key={dataItem.id} created_at={dataItem.created_at} updated_at={dataItem.updated_at} title={dataItem.title} content={dataItem.content} />
        ))}
    </div>

}

export default JournalDiv;