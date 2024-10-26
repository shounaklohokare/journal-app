import { useState } from "react";
import { Entry, putEntry } from "../store/features/entrySlice";
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";


const NewEntry: React.FC = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const entry: Entry = {
            id: "-1",
            title: title,
            content: content,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        const res = dispatch(putEntry(entry))

        console.log(res)


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

        </div>
    );
};

export default NewEntry;
function dispatch(arg0: AsyncThunkAction<number, Entry, { state?: unknown; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
    throw new Error("Function not implemented.");
}

