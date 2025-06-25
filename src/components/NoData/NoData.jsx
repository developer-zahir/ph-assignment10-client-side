import React from 'react';

const NoData = () => {
    return (
        <>
           <div className="col-span-4 bg-green-100 dark:bg-[#64636310] rounded-lg p-4 h-[200px] items-center flex justify-center flex-col">
            <span className='text-3xl mb-2'>😥</span>
            <h2 className='text-center text-black dark:text-white capitalize'> no data found</h2>
           </div>
        </>
    );
};

export default NoData;