import { FC } from "react"
import { JournalEntryType } from "../utils/types"

const JournalEntry: FC<JournalEntryType> = ({ title, content }) => {

    return <div className="mx-auto my-5">
        <div>{title}</div>
        <div>{content}</div>
    </div>

}

export default JournalEntry;