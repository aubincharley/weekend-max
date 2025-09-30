import { useNavigate } from "react-router"

export default function Header() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    return ( 
        <div className="text-2xl font-bold mb-4 p-2 w-full max-w-md mb-4">
            <div>Bienvenue sur Weekend-MAX</div>
            <button className="hover:bg-gray-300 p-2 border " onClick={handleHomeClick}>Home</button>
            {/* Inclure logo */}``
        </div>
    )
}