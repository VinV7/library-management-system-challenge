// Main Imports
import { useState } from "react";

// Components import
import BookCard from "../BookCard"

function CatalogPanel() {
    const [panelOpen, setPanelOpen] = useState();

    return (
        <div className="flex flex-1 w-full min-h-0">
            <div
                className={`grid gap-3 px-4 py-10 bg-white flex-1 overflow-y-auto min-h-0 ${
                    panelOpen
                        ? "grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                }`}
            >
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
            </div>

            <div
                className={`w-96 bg-white transition-all duration-300 min-h-0 overflow-y-auto ${
                    panelOpen ? "block" : "hidden"
                }`}
            >
                {/* panel content */}
            </div>
        </div>
    );
}

export default CatalogPanel;