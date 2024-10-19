import { FC } from "react"

import { formatDate } from "../utils/utils";
import { Entry } from "../store/features/entrySlice";
import { useNavigate } from "react-router-dom";

const JournalEntry: FC<Entry> = ({ id, created_at, title, content, updated_at }) => {

    const navigate = useNavigate();

    return <div className="mx-auto my-5 cursor-pointer" onClick={() => { navigate(`entry/${id}`) }}>
        <div className="flex justify-between">
            <div className="font-semibold">{title}</div>
            <div className="font-semibold">{formatDate(created_at)}</div>
        </div>
        <div>{content}</div>
    </div>

}

export default JournalEntry;