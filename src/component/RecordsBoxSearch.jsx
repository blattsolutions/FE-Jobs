import  {useState} from 'react'

const RecipesBoxSearch = ({onSearch}) => {
    const [keyWord, setKeyWord] = useState('');
    const handleSearch = () => {
        onSearch?.(keyWord)
    };
    return (
        <div className="container px-4 mx-auto pt-12 flex flex-col lg:flex-row gap-2 justify-around">
            <div className="w-full">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-white">Job search</label>
                <input
                    type="text"
                    id="first_name"
                    className="italic bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Search job, position ..."
                    required
                    value={keyWord}
                    onChange={(e) => setKeyWord(e.target.value)}
                />
            </div>
            <div className="">
                <button type="button"
                        className="mt-7 min-w-[160px] text-white bg-green-500 hover:bg-gradient-to-br shadow-lg shadow-green-500/50 px-5 py-2 text-center me-2 mb-2 hover:bg-green-600 transition-all ease-in-out duration-500"
                        onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
}
export default RecipesBoxSearch