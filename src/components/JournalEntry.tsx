import { FC } from "react"

import { formatDate } from "../utils/utils";
import { Entry } from "../store/features/entrySlice";
import { useNavigate } from "react-router-dom";

const JournalEntry: FC<Entry> = ({ entry_id, created, title, content, updated }) => {

    const navigate = useNavigate();

    return <div className="mx-auto my-5 space-y-1 cursor-pointer" onClick={() => { navigate(`/entry/${entry_id}`) }}>
        <div className="flex space-x-80">
            <div className="font-semibold">{title}</div>
            <div className="font-semibold">{formatDate(created)}</div>
        </div>
        <div className="w-full">{content}</div>
    </div>

}

export default JournalEntry;