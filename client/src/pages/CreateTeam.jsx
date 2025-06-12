import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
  const [name, setName] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreateTeam = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error('Failed to create team');

      const data = await res.json();
      console.log('Team created:', data);
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Error:', err);
      alert('Could not create team');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Your Team</h2>
      <input
        type="text"
        placeholder="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleCreateTeam}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Create Team
      </button>
    </div>
  );
}

export default CreateTeam;
