import React from 'react';
import { useSelector } from 'react-redux';
import { deviceSelector } from 'client/selectors/meta';

const Page = ({ data }) => {
    const platform = useSelector(deviceSelector);

    return (
        <div>
            Data from server: <br /> ip - {data.ip}, <br /> faviconLang -{' '}
            {data.faviconLang}, <br /> user agent - {data.userAgent} <br />{' '}
            platform - {platform}
        </div>
    );
};

export default Page;
