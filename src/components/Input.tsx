import { FC } from "react"


interface InputProps {
    text: string
    setText: (val: string) => void
    labelText?: string
}

const Input:FC<InputProps> = ({text, setText, labelText}) => {

    return  <div className="relative">
                <input type="text" id="email" value={text} onChange={(e) => { setText(e.target.value)}} className="email-ip peer" placeholder=" " />
                <label htmlFor="email" className="email-lbl">{labelText ? labelText : 'Email'}</label>
            </div>


}

export default Input;