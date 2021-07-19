import React from 'react';

export const LoadingCircle = ({size = '50px', color = '#db4437'}) => <div style={{width: size, height: size}}
                                                                   className="preloader-wrapper active">
    <div style={{borderColor: color}} className="spinner-layer">
        <div className="circle-clipper left">
            <div className="circle"/>
        </div>
        <div className="gap-patch">
            <div className="circle"/>
        </div>
        <div className="circle-clipper right">
            <div className="circle"/>
        </div>
    </div>
</div>

