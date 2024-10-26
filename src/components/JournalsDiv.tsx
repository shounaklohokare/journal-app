import { FC } from "react"
import JournalEntry from "./JournalEntry";
import { Entry } from "../store/features/entrySlice";

interface JournalsDivProps {
    data: Entry[]
}

const JournalDiv: FC<JournalsDivProps> = ({ data }) => {


    return <div className="flex flex-col mt-36 flex-grow">
        {data.map((dataItem) => (

            <JournalEntry id={dataItem.id} key={dataItem.id} created={dataItem.created} updated={dataItem.updated} title={dataItem.title} content={dataItem.content} />
        ))}
    </div>

}

export default JournalDiv;