import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [papers, setPapers] = useState([]);
  const [filters, setFilters] = useState({ subject: '', semester: '', branch: '' });

  const fetchPapers = async () => {
    try {
      const response = await axios.get('/papers', { params: filters });
      setPapers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [filters]);

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchPapers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Previous Year Question Papers</h1>
      <form onSubmit={handleUpload}>
        <input type="text" name="subject" placeholder="Subject" required />
        <input type="text" name="semester" placeholder="Semester" required />
        <input type="text" name="branch" placeholder="Branch" required />
        <input type="file" name="file" required />
        <button type="submit">Upload</button>
      </form>

      <div>
        <h2>Filters</h2>
        <input
          type="text"
          placeholder="Subject"
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Semester"
          onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
        />
        <input
          type="text"
          placeholder="Branch"
          onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
        />
      </div>

      <div>
        <h2>Question Papers</h2>
        <ul>
          {papers.map((paper) => (
            <li key={paper._id}>
              <a href={paper.downloadUrl} target="_blank" rel="noopener noreferrer">
                {paper.subject} - {paper.semester} - {paper.branch}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
