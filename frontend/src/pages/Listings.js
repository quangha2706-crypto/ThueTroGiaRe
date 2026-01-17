import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import FilterSidebar from '../components/FilterSidebar';
import { listingsAPI } from '../services/api';
import './Listings.css';

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    // Initialize filters from URL params
    const initialFilters = {
      min_price: searchParams.get('min_price') || '',
      max_price: searchParams.get('max_price') || '',
      min_area: searchParams.get('min_area') || '',
      max_area: searchParams.get('max_area') || '',
      amenities: searchParams.getAll('amenities[]').map(Number).filter(Boolean),
      environments: searchParams.getAll('environments[]').map(Number).filter(Boolean),
      audiences: searchParams.getAll('audiences[]').map(Number).filter(Boolean),
      has_review: searchParams.get('has_review') || '',
      has_video_review: searchParams.get('has_video_review') || '',
    };
    setFilters(initialFilters);
  }, []);

  useEffect(() => {
    fetchListings();
  }, [searchParams, currentPage]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams);
      const response = await listingsAPI.getListings({ ...params, page: currentPage, limit: 12 });
      setListings(response.data.data.listings);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Clear old filter params
    ['min_price', 'max_price', 'min_area', 'max_area', 'has_review', 'has_video_review'].forEach(key => {
      params.delete(key);
    });
    params.delete('amenities[]');
    params.delete('environments[]');
    params.delete('audiences[]');

    // Add new filter params
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => params.append(`${key}[]`, v));
      } else if (value && !Array.isArray(value)) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
    setCurrentPage(1);
    setShowMobileFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({
      min_price: '',
      max_price: '',
      min_area: '',
      max_area: '',
      amenities: [],
      environments: [],
      audiences: [],
      has_review: '',
      has_video_review: '',
    });
    
    const params = new URLSearchParams(searchParams);
    ['min_price', 'max_price', 'min_area', 'max_area', 'has_review', 'has_video_review', 'amenities[]', 'environments[]', 'audiences[]'].forEach(key => {
      params.delete(key);
    });
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="listings-page">
      <div className="container">
        <h1 className="page-title">Tìm Kiếm Phòng Trọ</h1>
        <SearchBar />

        <div className="listings-layout">
          {/* Mobile filter toggle */}
          <button 
            className="btn-toggle-filters mobile-only"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span>🔍</span> Bộ Lọc
          </button>

          {/* Filter Sidebar */}
          <aside className={`filter-sidebar-wrapper ${showMobileFilters ? 'open' : ''}`}>
            {showMobileFilters && (
              <div className="mobile-filter-overlay" onClick={() => setShowMobileFilters(false)} />
            )}
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          </aside>

          {/* Listings Content */}
          <main className="listings-content">
            {loading ? (
              <div className="loading">Đang tải...</div>
            ) : (
              <>
                <div className="listings-header">
                  <h2>Kết quả tìm kiếm</h2>
                  <p>Tìm thấy {pagination.total || 0} kết quả</p>
                </div>

                {listings.length > 0 ? (
                  <>
                    <div className="listings-grid">
                      {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>

                    {pagination.totalPages > 1 && (
                      <div className="pagination">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="btn btn-outline"
                        >
                          Trước
                        </button>
                        <span className="page-info">
                          Trang {currentPage} / {pagination.totalPages}
                        </span>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === pagination.totalPages}
                          className="btn btn-outline"
                        >
                          Sau
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-listings">
                    <p>Không tìm thấy kết quả phù hợp</p>
                    <p>Vui lòng thử lại với các tiêu chí khác</p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Listings;
