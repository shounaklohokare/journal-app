import { ChangeEvent, FC, useState } from "react";
import { Entry, EntryState, putEntry } from "../store/features/entrySlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../store/store";
import { displayToast, getIstDate } from "../utils/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const NewEntry: React.FC = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
      };
    

    const dispatch = useAppDispatch();

    const navigate = useNavigate()

    const user_id = useSelector((state) => (state as unknown as { entry: EntryState }).entry.user_id);

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
                        className="mt-1 px-3 py-1 block w-full text-gray-700 bg-white border border-gray-300 
                        rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        hover:border-gray-400 resize-none shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <EntryContent text={content} setText={handleChange}/>
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


interface EntryContentProps {
    text : string 
    setText : (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const EntryContent:FC<EntryContentProps> = ({text, setText}) => {

    const charCount = text.length;

    return <div className="w-full mt-1">
       
            
            <div className="relative">
            <textarea
                value={text}
                onChange={setText}
                rows={6}
                maxLength={5000}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 
                        rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        hover:border-gray-400 transition-colors duration-200
                      resize-none shadow-sm"
            />
            
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {charCount}/{5000}
            </div>
            </div>
            
            <div className="h-1 w-full bg-gray-200 rounded-full mt-2">
            <div 
                className="h-1 bg-blue-500 rounded-full transition-all duration-200"
                style={{ width: `${(charCount / 5000) * 100}%` }}
            />
            </div>
        </div>

}

export default NewEntry;