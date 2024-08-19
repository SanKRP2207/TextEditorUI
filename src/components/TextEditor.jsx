import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Navbar from './Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const BackLink = process.env.REACT_APP_API_URL;


function TextEditor() {
    const [text, setText] = useState('');
    const [contents, setContents] = useState([]);
    const [id, setEditingContentId] = useState(null);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const decoded = jwtDecode(token);
                const user_id = decoded.user.id;
                const response = await axios.get(`${BackLink}/user/${user_id}/contents`);
                setContents(response.data);
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
        };
        fetchContents();
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const decoded = jwtDecode(token);
            const user_id = decoded.user.id;

            if (id) {
                await axios.put(`${BackLink}/content/${id}`, { user_id, text });
                alert('Content updated successfully');
            } else {
                const response = await axios.post(`${BackLink}/savecontent`, { user_id, content: text });
                setContents([...contents, response.data]); 
                alert('Content saved successfully');
            }

            const refreshedContents = await axios.get(`${BackLink}/user/${user_id}/contents`);
            setContents(refreshedContents.data);

            setEditingContentId(null);
            setText('');
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`${BackLink}/content/${id}`);
            setText(response.data.text); 
            setEditingContentId(id);
        } catch (error) {
            console.error('Error loading content:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className='w-full' >
                    <JoditEditor
                        value={text}
                        onChange={(newContent) => setText(newContent)}
                    />
                    <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">
                        {id ? 'Update Content' : 'Save Content'}
                    </button>
                    <div className="w-full p-4 border-r md:border-r-0">
                        <h3 className="font-bold text-lg mb-4">Saved Contents</h3>
                        <ul className="space-y-2">
                            {contents.map(content => (
                                <li key={content.id} className="flex items-center">
                                    <button
                                        onClick={() => handleEdit(content.id)}
                                        className="flex-1 text-left p-2 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition"
                                    >
                                        {content.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TextEditor;
