
interface InputProps {
    index: number,
    
}

export const ControlViewInput = () => {
    return (
        <div className="inputBox">
            <div className="inputId"></div>
            <input type="text" className="input" />
            <div className="deleteBtn"></div>
        </div>
    )
}