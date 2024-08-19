import React from 'react';

function ContentList({ contents, onSelectContent }) {
    return (
        <div className="w-1/4 p-4 border-r">
            <h3 className="font-bold">Saved Contents</h3>
            <ul>
                {contents.map(content => (
                    <li key={content.id} className="mb-2">
                        <button
                            onClick={() => onSelectContent(content)}
                            className="text-blue-500 hover:underline"
                        >
                            {content.text?.substring(0, 30)}...
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContentList;
