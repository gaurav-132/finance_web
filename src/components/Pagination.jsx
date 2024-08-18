import React from 'react'
import Button from './Button'

const Pagination = ({
    total,
    page,
    handlePageChange,
    limit
}) => {
    return (
        <div className="pagination flex justify-between my-2 items-center">
            <div>
                <p className='text-sm'>Total : {total}</p>
            </div>
            <div className='text-right'>
                <Button
                    disabled={page === 1}
                    className='text-sm bg-red-700 py-1'
                    onClick={() => handlePageChange(page - 1)}>
                    Previous
                </Button>
                <span className='text-sm mx-4'>Page {page} of {Math.ceil(total / limit)}</span>
                <Button
                    className='text-sm bg-red-700 py-1'
                    disabled={page * limit >= total}
                    onClick={() => handlePageChange(page + 1)}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default Pagination   