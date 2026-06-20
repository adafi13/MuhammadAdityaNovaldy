import { useEffect, useRef, useState } from 'react';

const API_URL = import.meta.env.VITE_CHAT_API_URL;

const SUGGESTED_QUESTIONS = [
  'Apa pengalaman magangnya?',
  'Skill jaringan paling kuat apa?',
  'Lagi cari posisi seperti apa?',
];

export default function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const nextMessages = [...messages, { role: 'user', content: text.trim() }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      if (!API_URL) throw new Error('Chat AI belum dikonfigurasi di situs ini.');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal mendapat balasan.');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat">
      <div className="ai-chat__messages">
        {messages.length === 0 && (
          <div className="ai-chat__intro">
            <p className="muted">
              Tanya apa saja soal pengalaman, skill, atau proyek Aditya — dijawab otomatis oleh AI
              berdasarkan data di portofolio ini.
            </p>
            <div className="ai-chat__suggestions">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button key={q} type="button" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`ai-chat__bubble ai-chat__bubble--${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="ai-chat__bubble ai-chat__bubble--assistant ai-chat__bubble--loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {error && <p className="tool-error">{error}</p>}
        <div ref={bottomRef} />
      </div>
      <form
        className="ai-chat__form"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pertanyaan..."
          disabled={loading}
        />
        <button type="submit" className="btn btn--small" disabled={loading || !input.trim()}>
          Kirim
        </button>
      </form>
    </div>
  );
}
