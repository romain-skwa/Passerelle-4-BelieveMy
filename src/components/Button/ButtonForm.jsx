export default function ButtonForm({children, onClick, withoutMarginTop, formButton, disabled}) {
    return (
        <button className="bg-green-500 p-3 mx-auto w-40 rounded-2xl m-2">
            {children}
        </button>
    )}