import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { DeleteEntryInput, Entry, putEntry, deleteEntry, EntryState } from "../store/features/entrySlice";
import {  useAppDispatch, useAppSelector } from "../store/store";
import { displayToast, formatDate, getIstDate } from "../utils/utils";
import { FaEdit } from "react-icons/fa";
import { ToastContainer } from "react-toastify";



const EntryDetails: FC = () => {
    const { id } = useParams();

    const entries = useAppSelector((state  ) => (state as unknown as { entry: EntryState }).entry.entries)

    const [entry] = useState<Entry>( () => {
        const pageEntry  = entries.find((entry: Entry) => entry.entry_id === id)

        if (!pageEntry) {
            throw new Error(`No entry found with id ${id}`);
        }
        return pageEntry
    })

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const deleteJournalEntry = () => {

        const deleteEntryInput: DeleteEntryInput = {
            entry_id: entry.entry_id,
            user_id : entry.user_id
        };

        dispatch(deleteEntry(deleteEntryInput)).then((result) => {
            if (deleteEntry.fulfilled.match(result)) {
                displayToast('Journal Entry deleted successfully, Redirecting to home page!')
                setTimeout(() => {
                    navigate("/home")
                }, 3000);

            } else if (deleteEntry.rejected.match(result)) {
                displayToast('An error occurred: Unable to delete entry', true)
            }
        }).catch((error) => {
            console.log(error)
            displayToast('An error occurred: Unable to delete entry', true)
        });



    }

  

    const updateEntry = () => {

        const updateEntry: Entry = {
            entry_id: entry?.entry_id,
            user_id: entry?.user_id,
            title: title,
            content: content,
            created: getIstDate(),
            updated: getIstDate()
        };

        dispatch(putEntry(updateEntry)).then((result) => {
            if (putEntry.fulfilled.match(result)) {
                setIsEditing(false)
                displayToast('Journal Entry Updated Successfully!')
            } else if (putEntry.rejected.match(result)) {
                displayToast('An error occurred: Unable to update entry', true)
            }
        }).catch((error) => {
            console.log(error)
            displayToast('An error occurred: Unable to update entry', true)
        });

    }

    useEffect(() => {

        setContent(entry.content)
        setTitle(entry.title)

    }, [entry])

    const handleEdit = () => {

        setIsEditing(!isEditing)
    }

    const handleCancel = () => {
        handleEdit()
        setContent(entry.content)
        setTitle(entry.title)
    }



    return <div className="w-3/4 text-[0.95rem] md:text-[1.2rem] text-wrap flex flex-col mt-36 mx-auto flex-grow">
        <div className="flex justify-between md:space-x-0 space-x-2 text-nowrap">
            {
                isEditing ?
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="focus:outline-none border border-gray-800 rounded-md"
                    /> : <div className="w-[60%] text-wrap font-semibold">{title}</div>
            }

            <div className="font-semibold  mb-8 mr-[4.35rem]">{formatDate(entry.created)}</div>
        </div>

        {
            isEditing ?
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="focus:outline-none border border-gray-800 rounded-md"
                /> : <div className="text-[0.988rem] md:text-[1.2rem]">{content}</div>
        }



        {isEditing ? <div className="md:text-[0.9rem] text-[0.78rem] flex mx-auto space-x-4 mt-72 cursor-pointer">
            <button onClick={updateEntry} className="px-4 py-2 font-sans font-bold text-white rounded-md bg-amber-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg hover:-translate-y-0.5 duration-150">Update</button>
            <button onClick={deleteJournalEntry} className="px-4 py-2 font-sans font-bold text-white rounded-md bg-amber-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg hover:-translate-y-0.5 duration-150">Delete</button>
            <button onClick={handleCancel} className="px-4 py-2font-sans font-bold text-white rounded-md  bg-amber-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg hover:-translate-y-0.5 duration-150">Cancel</button>
        </div> : <div className="flex mx-auto font-sans space-x-4 mt-72 cursor-pointer" onClick={handleEdit}>
            <h2 className="font-bold md:text-2xl text-[1.26rem]">Edit</h2>
            <FaEdit className="md:text-3xl md:pt-0 pt-1 text-2xl" />
        </div>}
        <ToastContainer />
    </div>

}



export default EntryDetails;