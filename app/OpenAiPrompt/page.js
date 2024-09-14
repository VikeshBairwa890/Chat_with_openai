"use client"
import { useState } from 'react';

const OpenAiPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('/api/generateText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResult(data.text || 'No result found');
    } catch (err) {
      console.error('Error:', err);
      setError('Error occurred while fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Vikesh Generate Text with OpenAI</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          rows={4}
          className="w-full border p-3 mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <h2 className="text-lg font-semibold mb-2">Generated Text:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAiPrompt;
