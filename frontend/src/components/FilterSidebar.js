import React, { useState, useEffect } from 'react';
import { filtersAPI } from '../services/api';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, onApply, onClear }) => {
  const [amenities, setAmenities] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [audiences, setAudiences] = useState([]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const [amenitiesRes, environmentsRes, audiencesRes] = await Promise.all([
        filtersAPI.getAmenities(),
        filtersAPI.getEnvironments(),
        filtersAPI.getAudiences(),
      ]);
      setAmenities(amenitiesRes.data.data.amenities);
      setEnvironments(environmentsRes.data.data.environments);
      setAudiences(audiencesRes.data.data.audiences);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handleCheckboxChange = (filterType, id) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(id)
      ? currentValues.filter((v) => v !== id)
      : [...currentValues, id];
    onFilterChange(filterType, newValues);
  };

  const handleInputChange = (key, value) => {
    onFilterChange(key, value);
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Bộ Lọc Tìm Kiếm</h3>
        <button onClick={onClear} className="btn-clear-filters">
          Xóa bộ lọc
        </button>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h4>Khoảng Giá (VNĐ)</h4>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Tối thiểu"
            value={filters.min_price || ''}
            onChange={(e) => handleInputChange('min_price', e.target.value)}
            className="form-control"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Tối đa"
            value={filters.max_price || ''}
            onChange={(e) => handleInputChange('max_price', e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      {/* Area Range */}
      <div className="filter-section">
        <h4>Diện Tích (m²)</h4>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Tối thiểu"
            value={filters.min_area || ''}
            onChange={(e) => handleInputChange('min_area', e.target.value)}
            className="form-control"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Tối đa"
            value={filters.max_area || ''}
            onChange={(e) => handleInputChange('max_area', e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      {/* Amenities */}
      <div className="filter-section">
        <h4>Tiện Nghi</h4>
        <div className="checkbox-group">
          {amenities.map((amenity) => (
            <label key={amenity.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={(filters.amenities || []).includes(amenity.id)}
                onChange={() => handleCheckboxChange('amenities', amenity.id)}
              />
              <span>{amenity.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Environment Tags */}
      <div className="filter-section">
        <h4>Môi Trường Xung Quanh</h4>
        <div className="checkbox-group">
          {environments.map((env) => (
            <label key={env.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={(filters.environments || []).includes(env.id)}
                onChange={() => handleCheckboxChange('environments', env.id)}
              />
              <span>{env.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Target Audiences */}
      <div className="filter-section">
        <h4>Đối Tượng Phù Hợp</h4>
        <div className="checkbox-group">
          {audiences.map((audience) => (
            <label key={audience.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={(filters.audiences || []).includes(audience.id)}
                onChange={() => handleCheckboxChange('audiences', audience.id)}
              />
              <span>{audience.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="filter-section">
        <h4>Review</h4>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.has_review === 'true'}
              onChange={(e) => handleInputChange('has_review', e.target.checked ? 'true' : '')}
            />
            <span>Có review</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.has_video_review === 'true'}
              onChange={(e) => handleInputChange('has_video_review', e.target.checked ? 'true' : '')}
            />
            <span>Có video review</span>
          </label>
        </div>
      </div>

      <button onClick={onApply} className="btn btn-primary btn-apply-filters">
        Áp Dụng Bộ Lọc
      </button>
    </div>
  );
};

export default FilterSidebar;
