import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { Entry, putEntry } from "../store/features/entrySlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { displayToast, formatDate, getIstDate } from "../utils/utils";
import { FaEdit } from "react-icons/fa";

const EntryDetails: FC = () => {
    const { id } = useParams();

    const [entry, setEntry] = useState<Entry>([])
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const dispatch = useAppDispatch()


    const entries = useAppSelector((state) => state.entry.entries)

    useEffect(() => {

        const pageEntry = entries.find((entry: Entry) => entry.id == id)
        setEntry(pageEntry)
        setContent(entry.content)
        setTitle(entry.title)


    }, [entry, content, title])

    const handleEdit = () => {

        setIsEditing(!isEditing)


    }

    return <div className="flex flex-col mt-36 mx-36 flex-grow">
        <div className="flex justify-between">
            {
                isEditing ?
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="focus:outline-none p-0 m-0 border border-gray-800 rounded-md"
                    /> : <div>{title}</div>
            }

            <div className="text-[1.25rem] font-semibold mb-8 mr-[4.35rem]">{formatDate(entry.created)}</div>
        </div>

        {
            isEditing ?
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="focus:outline-none border border-gray-800 rounded-md"
                /> : <div>{content}</div>
        }



        <div className="flex mx-auto space-x-4 mt-72 cursor-pointer" onClick={handleEdit}>
            <h2 className="font-bold text-2xl">Edit</h2>
            <FaEdit size={36} />
        </div>
    </div>

}






export default EntryDetails;