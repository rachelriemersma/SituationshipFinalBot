import { useState } from 'react'
import axios from 'axios'

function App() {
    const [message, setMessage] = useState('')
    const [tone, setTone] = useState('gentle')
    const [reply, setReply] = useState('')

    const sendMessage = async () => {
        if (!message) return

        const res = await axios.post('http://localhost:5000/chat', {
            message,
            tone,
        })

        setReply(res.data.reply)
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-pink-50">
            <div className="flex flex-col items-center w-full max-w-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">SituationshipFinalBot 💔</h1>

                <div className="flex gap-2 mb-4">
                    {['gentle', 'blunt', 'therapist'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTone(t)}
                            className={`px-3 py-1 rounded-full border ${
                                tone === t ? 'bg-black text-white' : 'bg-white text-black'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <textarea
                    className="w-full border p-3 rounded-lg mb-4"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your situationship drama here..."
                />

                <button
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg"
                    onClick={sendMessage}
                >
                    Ask the bot 💌
                </button>

                {reply && (
                    <div className="mt-6 w-full bg-white p-4 rounded shadow">
                        <strong>Bot says:</strong>
                        <p>{reply}</p>
                    </div>
                )}
            </div>
        </div>
    )


}

export default App

