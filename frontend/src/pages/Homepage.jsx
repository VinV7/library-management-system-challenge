// File Import
import logo from "../assets/library_logo.png"
import picture_one from "../assets/women_at_library_second.png"
import picture_two from "../assets/reading_books.png"

function Homepage() {
    return (
        <div className="flex flex-col h-screen">
            <nav className="flex w-full h-24 px-16 bg-taupe-800 justify-between items-center shadow-sm border-b border-taupe-700/50">
                <a href="/" className="flex items-center">
                    <img src={logo} className="w-auto h-18" />
                </a>
                <div className="flex items-center gap-12">
                    <a href="/books" className="group relative text-xl text-taupe-100 font-lustria tracking-wide hover:text-white transition-colors duration-200">
                        Our Books
                        <span className="absolute left-0 -bottom-1 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                    </a>
                    <div className="flex items-center gap-4">
                        <a href="/login" className="group relative text-xl text-taupe-100 font-lustria tracking-wide hover:text-white transition-colors duration-200">
                            Login
                            <span className="absolute left-0 -bottom-1 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                        </a>
                        <span className="text-taupe-600">|</span>
                        <a href="/register" className="text-lg font-lustria tracking-wide px-5 py-2 rounded-full bg-white text-taupe-800 hover:bg-taupe-100 hover:scale-105 transition-all duration-200">
                            Register
                        </a>
                    </div>
                </div>
            </nav>

            <div className="flex-1 w-full px-24 pt-16 bg-yellow-50 flex items-center justify-between gap-16 relative overflow-hidden">
                <div className="absolute -top-20 right-32 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-xl relative z-10">
                    <p className="text-5xl font-lustria text-orange-600 tracking-[0.2em] uppercase mb-4">
                        For fellow book nerds
                    </p>
                    <h1 className="text-6xl font-lustria text-taupe-800 leading-tight">
                        Borrow with Us
                    </h1>
                    <p className="text-xl font-lustria text-taupe-600 mt-4 mb-8">
                        Your next great read is one click away.
                    </p>
                    <a
                        href="/books"
                        className="inline-block text-lg font-lustria tracking-wide px-8 py-3 rounded-full bg-taupe-800 text-white hover:bg-taupe-700 hover:scale-105 transition-all duration-200 shadow-md"
                    >
                        Browse our Catalog
                    </a>
                </div>

                <div className="flex-1 flex items-end gap-8 relative z-10">
                    <img
                        src={picture_one}
                        className="h-[22rem] w-auto object-cover rounded-3xl shadow-xl mb-10"
                    />
                    <img
                        src={picture_two}
                        className="h-[26rem] w-auto object-cover rounded-3xl shadow-xl"
                    />
                </div>
            </div>
        </div>
    )
}

export default Homepage