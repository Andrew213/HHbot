import React from 'react';

const Page = ({ data }) => {
    console.log(`page props `, data);
    return (
        <div>
            Data from server: <br /> ip - {data.ip}, <br /> faviconLang -{' '}
            {data.faviconLang}, <br /> user agent - {data.userAgent}
        </div>
    );
};

export default Page;
