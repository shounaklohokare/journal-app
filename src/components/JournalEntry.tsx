import { FC } from "react"

import { formatDate } from "../utils/utils";
import { Entry } from "../store/features/entrySlice";
import { useNavigate } from "react-router-dom";

const JournalEntry: FC<Entry> = ({ entry_id, created, title, content, updated }) => {

    const navigate = useNavigate();

    return <div className="mx-auto my-5 space-y-2 cursor-pointer w-3/4 text-wrap" onClick={() => { navigate(`/entry/${entry_id}`) }}>
        <div className="flex justify-between">
            <div className="font-semibold w-2/3 truncate">{title}</div>
            <div className="font-semibold">{formatDate(created)}</div>
        </div>
        <div className="w-full truncate">{content}</div>
    </div>

}

export default JournalEntry;