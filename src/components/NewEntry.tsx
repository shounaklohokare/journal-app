import { useState } from "react";
import { Entry, putEntry } from "../store/features/entrySlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RichTextEditor from './RichTextEditor';

import { useAppDispatch } from "../store/store";
import { displayToast, getIstDate } from "../utils/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const NewEntry: React.FC = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useAppDispatch();

    const navigate = useNavigate()

    const user_id = useSelector((state) => state.entry.user_id);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const entry: Entry = {
            entry_id: "-1",
            user_id:user_id,
            title: title,
            content: content,
            created: getIstDate(),
            updated: getIstDate()
        };

        dispatch(putEntry(entry)).then((result) => {
            if (putEntry.fulfilled.match(result)) {
                (document.activeElement as HTMLElement).blur();
                displayToast('Journal Entry Created Successfully, redirecting to home page!')
                navigate("/home")
            } else if (putEntry.rejected.match(result)) {
                displayToast('An error occurred: Unable to create entry', true)
            }
        }).catch((error) => {
            console.log(error)
            displayToast('An error occurred: Unable to create entry', true)
        });


    };


    return (
        <div className='flex-grow mx-36 space-y-4 mt-32'>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-slate-600 focus:border-black"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <RichTextEditor value={content} onChange={setContent}/>
                </div>
                <button
                    type="submit"
                    className="w-1/3 mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#8f6116] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default NewEntry;