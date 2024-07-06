import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import axios from 'axios';
import '../src/Landing.css';
import Forms from './Forms';

const TireLanding  = () => {
    const [textToCopy, setTextToCopy] = useState('');
    const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [truckId, setTruckId] = useState("");

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    const sendTextToBackend = async () => {
        try {  
            const result = await axios.post('http://127.0.0.1:5000/api/generate-tire-info', { text: `${transcript} Truck id is ${truckId}` });
            setResponse(result.data);
            console.log(result.data);
            navigate('/TireForms', { state: { response: result.data } });
        } catch (error) {
            console.error('Error sending text to backend:', error);
            setResponse({ error: 'Error sending text to backend' });
        }
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        sendTextToBackend();
    };

    return (
        <>
            <div className="container">
                <br />
                <input 
                    type="text" 
                    value={truckId} 
                    onChange={(e) => setTruckId(e.target.value)} 
                    placeholder="Enter Truck ID"
                />
                <p>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                <div className="main-content" onClick={() => setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">
                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={handleStopListening}>Stop Listening</button>
                </div>
            </div>
        </>
    );
};

export default TireLanding;
