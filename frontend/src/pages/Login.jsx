// File Import
import logo from "../assets/library_logo.png"
import form_picture from "../assets/man_reading.png"

function Login() {
    return (
        <div className="flex flex-col h-screen">
            <nav className="flex w-full h-20 px-16 bg-taupe-800 justify-center items-center shadow-sm border-b border-taupe-700/50">
                <a href="/">
                    <img src={logo} className="w-auto h-[4.5rem]" />
                </a>
            </nav>
            <div className="flex-1 w-full px-8 md:px-16 py-12 bg-yellow-50 flex items-center justify-center relative overflow-hidden">
                <div className="flex w-full max-w-4xl h-[30rem] bg-white shadow-xl overflow-hidden">
                    <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-taupe-100">
                        <img src={form_picture} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-10 py-8">
                        <h1 className="text-2xl font-lustria text-taupe-800 mb-1">
                            Log Into Your Account
                        </h1>
                        <p className="text-sm text-taupe-500 mb-6">
                            Enter your account information and start reading!
                        </p>

                        <form action="" className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="username" className="text-sm font-medium text-taupe-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="bookworm42"
                                    className="w-full px-4 py-2 rounded-lg border border-taupe-200 bg-yellow-50/50 text-taupe-800 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" className="text-sm font-medium text-taupe-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 rounded-lg border border-taupe-200 bg-yellow-50/50 text-taupe-800 placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 w-full py-2.5 rounded-lg bg-taupe-800 text-white font-lustria tracking-wide hover:bg-taupe-700 hover:scale-[1.02] transition-all duration-200 shadow-md"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-sm text-taupe-500 mt-5 text-center">
                            Don't have an account yet?{" "}
                            <a href="/register" className="text-orange-600 font-medium hover:underline">
                                Register Here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login