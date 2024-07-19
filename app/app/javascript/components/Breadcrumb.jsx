import React from 'react';
import {Link} from 'react-router-dom';

const Breadcrumb = ({paths}) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {paths.map((path, index) => (
                    <li
                        key={index}
                        className={`breadcrumb-item${index === paths.length - 1 ? ' active' : ''}`}
                        aria-current={index === paths.length - 1 ? 'page' : undefined}
                    >
                        {index < paths.length - 1 ? (
                            <Link to={path.href}>{path.name}</Link>
                        ) : (
                            path.name
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
