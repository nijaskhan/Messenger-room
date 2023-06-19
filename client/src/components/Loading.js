import React from 'react';
import { DotSpinner } from '@uiball/loaders';

const Loading = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <DotSpinner
                size={40}
                speed={0.9}
                color="black"
            />
        </div>
    )
}

export default Loading;