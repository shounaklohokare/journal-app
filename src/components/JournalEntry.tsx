import { FC } from "react"
import { JournalEntryType } from "../utils/types"
import { formatDate } from "../utils/utils";

const JournalEntry: FC<JournalEntryType> = ({ title, content, updated_at }) => {

    return <div className="mx-auto my-5">
        <div className="flex justify-between">
            <div className="font-semibold">{title}</div>
            <div className="font-semibold">{formatDate(updated_at)}</div>
        </div>
        <div>{content}</div>
    </div>

}

export default JournalEntry;