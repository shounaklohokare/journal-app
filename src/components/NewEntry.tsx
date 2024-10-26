import { useState } from "react";
import { Entry, putEntry } from "../store/features/entrySlice";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch } from "../store/store";


const NewEntry: React.FC = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useAppDispatch()

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const entry: Entry = {
            id: "-1",
            title: title,
            content: content,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };

        dispatch(putEntry(entry)).then((result) => {
            if (putEntry.fulfilled.match(result)) {
                toast.success('Journal Entry Created Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } else if (putEntry.rejected.match(result)) {
                toast.error('An error occurred: Unable to create entry', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }).catch((error) => {
            toast.error('An error occurred: Unable to create entry', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
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
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-slate-600 focus:border-black"
                        rows='4'
                        required
                    ></textarea>
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