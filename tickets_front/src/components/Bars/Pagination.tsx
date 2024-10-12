import React from 'react'

const Pagination = () => {
    return (
        <>
            <nav
                className="flex items-center justify-between border-t px-4 py-3 sm:px-6"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-200">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">20</span> results
                    </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500"
                    >
                        Next
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Pagination