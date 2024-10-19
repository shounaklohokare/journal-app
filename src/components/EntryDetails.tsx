import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Entry } from "../store/features/entrySlice";
import { useAppSelector } from "../store/store";
import { formatDate } from "../utils/utils";

const EntryDetails: FC = () => {
    const { id } = useParams();

    const [entry, setEntry] = useState<Entry>([])

    const entries = useAppSelector((state) => state.entry.entries)

    useEffect(() => {

        const pageEntry = entries.find((entry: Entry) => entry.id == id)

        setEntry(pageEntry)

    }, [])

    return <div className="flex flex-col mt-36 mx-36 flex-grow">
        <div className="flex justify-between">
            <div className="text-3xl font-semibold mb-8">{entry.title}</div>
            <div className="text-[1.25rem] font-semibold mb-8 mr-[4.35rem]">{formatDate(entry.created_at)}</div>
        </div>
        <div className="text-xl">{entry?.content}</div>
    </div>

}

export default EntryDetails;