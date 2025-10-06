import React, { useState } from 'react';
import axios from 'axios';

const InitialAssessment = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    project_type: 'Mangrove Restoration',
    location: '',
    area: '',
    start_date: '',
    end_date: '',
    description: '',
    latitude: '',
    longitude: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [projectId, setProjectId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create project
      const projectFormData = new FormData();
      Object.keys(formData).forEach(key => {
        projectFormData.append(key, formData[key]);
      });

      const projectResponse = await axios.post('/api/projects', projectFormData);
      const newProjectId = projectResponse.data.id;
      setProjectId(newProjectId);

      // Upload and analyze image if provided
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);

        await axios.post(`/api/analysis/site-image/${newProjectId}`, imageFormData);
      }

      // Perform satellite analysis
      const satelliteResponse = await axios.post(`/api/analysis/satellite/${newProjectId}`);
      setAnalysis(satelliteResponse.data);

      // Complete the step
      onComplete({
        projectId: newProjectId,
        projectData: projectResponse.data,
        analysis: satelliteResponse.data
      });

    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (analysis) {
    return (
      <div className="card">
        <h2>🛰️ Satellite Analysis Complete</h2>
        <div className="grid">
          <div className="metric-card">
            <div className="metric-value">{analysis.satellite_analysis.vegetation_index}</div>
            <div className="metric-label">Vegetation Index (NDVI)</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{analysis.carbon_calculation.total_carbon_tons}</div>
            <div className="metric-label">Carbon Credits (tons CO₂)</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{analysis.satellite_analysis.vegetation_health}</div>
            <div className="metric-label">Vegetation Health</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{analysis.carbon_calculation.biodiversity_score}</div>
            <div className="metric-label">Biodiversity Score</div>
          </div>
        </div>
        
        <div className="success">
          ✅ Project created successfully! Satellite analysis shows excellent potential for carbon sequestration.
        </div>
        
        <button className="btn btn-primary" onClick={() => onComplete({})}>
          Continue to Verification →
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🌱 Initial Carbon Credit Assessment</h2>
      <p>Create a new blue carbon project and analyze its potential for carbon sequestration.</p>

      <form onSubmit={handleSubmit}>
        <div className="grid">
          <div className="form-group">
            <label>Project Type</label>
            <select
              name="project_type"
              value={formData.project_type}
              onChange={handleInputChange}
              required
            >
              <option value="Mangrove Restoration">Mangrove Restoration</option>
              <option value="Coastal Restoration">Coastal Restoration</option>
              <option value="Wetland Restoration">Wetland Restoration</option>
              <option value="Forest Restoration">Forest Restoration</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Sundarbans, West Bengal"
              required
            />
          </div>

          <div className="form-group">
            <label>Area (hectares)</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              step="0.1"
              min="0.1"
              placeholder="e.g., 1.5"
              required
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Latitude (optional)</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              step="0.000001"
              placeholder="e.g., 22.5726"
            />
          </div>

          <div className="form-group">
            <label>Longitude (optional)</label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              step="0.000001"
              placeholder="e.g., 88.3639"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your mangrove restoration project..."
            required
          />
        </div>

        <div className="form-group">
          <label>Site Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <small>Upload a photo of the project site for AI analysis</small>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Analyzing...' : 'Create Project & Analyze'}
        </button>
      </form>

      {loading && (
        <div className="loading">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
          <p>🔍 Performing satellite analysis and carbon calculations...</p>
        </div>
      )}
    </div>
  );
};

export default InitialAssessment;
