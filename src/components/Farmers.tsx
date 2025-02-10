import React, { useState } from 'react';
import { Search, MapPin, Star, MessageCircle, Filter } from 'lucide-react';

// Mock data for farmers/vendors
const farmers = [
  {
    id: '1',
    name: 'Green Valley Farm',
    image: 'https://images.unsplash.com/photo-1507103011901-e954d6c63201?auto=format&fit=crop&w=800&q=80',
    location: 'Burlington, VT',
    rating: 4.8,
    reviewCount: 156,
    description: 'Organic farm specializing in seasonal vegetables and fruits.',
    specialties: ['Organic Vegetables', 'Fruits', 'Herbs'],
    certifications: ['USDA Organic', 'Non-GMO'],
    isOnline: true
  },
  {
    id: '2',
    name: 'Sunshine Acres',
    image: 'https://images.unsplash.com/photo-1595456982104-14cc660c4d22?auto=format&fit=crop&w=800&q=80',
    location: 'Sacramento, CA',
    rating: 4.6,
    reviewCount: 98,
    description: 'Family-owned farm focusing on sustainable agriculture.',
    specialties: ['Tomatoes', 'Citrus', 'Berries'],
    certifications: ['Certified Naturally Grown'],
    isOnline: false
  },
  {
    id: '3',
    name: 'River Valley Gardens',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80',
    location: 'Portland, OR',
    rating: 4.9,
    reviewCount: 203,
    description: 'Hydroponic farm producing year-round fresh greens.',
    specialties: ['Lettuce', 'Microgreens', 'Herbs'],
    certifications: ['Organic', 'Hydroponic Certified'],
    isOnline: true
  },
  {
    id: '4',
    name: 'Highland Dairy',
    image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80',
    location: 'Madison, WI',
    rating: 4.7,
    reviewCount: 167,
    description: 'Artisanal dairy farm producing organic milk and cheese.',
    specialties: ['Dairy', 'Cheese', 'Yogurt'],
    certifications: ['Organic', 'Animal Welfare Approved'],
    isOnline: true
  }
];

interface Filters {
  search: string;
  certification: string;
  specialty: string;
  location: string;
}

export function Farmers() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    certification: '',
    specialty: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = 
      farmer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      farmer.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCertification = !filters.certification || 
      farmer.certifications.some(cert => 
        cert.toLowerCase().includes(filters.certification.toLowerCase())
      );
    const matchesSpecialty = !filters.specialty || 
      farmer.specialties.some(spec => 
        spec.toLowerCase().includes(filters.specialty.toLowerCase())
      );
    const matchesLocation = !filters.location || 
      farmer.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesCertification && matchesSpecialty && matchesLocation;
  });

  const handleContact = (farmerId: string) => {
    // TODO: Implement contact functionality
    alert('Contact functionality coming soon!');
  };

  const handleViewProfile = (farmerId: string) => {
    const event = new CustomEvent('navigate', { 
      detail: { path: '/vendor-profile' } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
          Our Farmers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with local farmers and discover fresh, sustainably grown produce direct from the source.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search farmers or products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification
              </label>
              <input
                type="text"
                placeholder="e.g., Organic"
                value={filters.certification}
                onChange={(e) => handleFilterChange('certification', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <input
                type="text"
                placeholder="e.g., Vegetables"
                value={filters.specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g., California"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={farmer.image}
                alt={farmer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`inline-flex h-3 w-3 rounded-full ${
                  farmer.isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-heading font-semibold">{farmer.name}</h2>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="ml-1 font-medium">{farmer.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({farmer.reviewCount})
                  </span>
                </div>
              </div>

              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {farmer.location}
              </div>

              <p className="text-gray-600 mb-4">{farmer.description}</p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {farmer.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary text-primary text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleViewProfile(farmer.id)}
                  className="flex-1 btn-primary"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleContact(farmer.id)}
                  className="btn-secondary"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFarmers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No farmers match your filters.</p>
          <button
            onClick={() => setFilters({ search: '', certification: '', specialty: '', location: '' })}
            className="mt-4 text-primary hover:text-primary/80"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}