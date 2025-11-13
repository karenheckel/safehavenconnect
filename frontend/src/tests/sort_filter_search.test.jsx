import React, { useState, useMemo } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from "vitest";
import '@testing-library/jest-dom';

// Mock Data
const mockResources = [
  { id: 1, name: 'Downtown Community Shelter', location: '90001', service: 'Housing', distance: 5.2 },
  { id: 2, name: 'City Central Food Bank', location: '90002', service: 'Food', distance: 2.1 },
  { id: 3, name: 'Uptown Legal Aid', location: '90003', service: 'Legal', distance: 8.5 },
  { id: 4, name: 'Family First Housing', location: '90001', service: 'Housing', distance: 4.8 },
  { id: 5, name: 'Youth Services Center', location: '90004', service: 'Youth', distance: 1.2 },
];

// Mock Component
const ResourceDirectory = ({ resources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(new Set());
  const [sortOrder, setSortOrder] = useState('distance');

  const filteredAndSortedResources = useMemo(() => {
    let items = [...resources];

    // Filtering
    if (filters.size > 0) {
      items = items.filter(item => filters.has(item.service));
    }

    // Searching (by name or location)
    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.includes(searchTerm)
      );
    }

    // Sorting
    items.sort((a, b) => {
      if (sortOrder === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      // Default sort by distance
      return a.distance - b.distance;
    });

    return items;
  }, [resources, searchTerm, filters, sortOrder]);

  // Helper to toggle filters
  const handleFilterChange = (service) => {
    setFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(service)) {
        newFilters.delete(service);
      } else {
        newFilters.add(service);
      }
      return newFilters;
    });
  };

  return (
    <div>
      {/* Search Input */}
      <label htmlFor="search-input">Search by name or zip</label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or zip..."
      />

      {/* Filter Checkboxes */}
      <div>
        <label>
          <input type="checkbox" name="Housing" onChange={() => handleFilterChange('Housing')} />
          Housing
        </label>
        <label>
          <input type="checkbox" name="Food" onChange={() => handleFilterChange('Food')} />
          Food
        </label>
        <label>
          <input type="checkbox" name="Legal" onChange={() => handleFilterChange('Legal')} />
          Legal
        </label>
        <label>
          <input type="checkbox" name="Youth" onChange={() => handleFilterChange('Youth')} />
          Youth
        </label>
      </div>

      {/* Sort Dropdown */}
      <label htmlFor="sort-select">Sort by</label>
      <select id="sort-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="distance">Distance (Nearest)</option>
        <option value="name-asc">Name (A-Z)</option>
      </select>

      {/* Results List */}
      <ul>
        {filteredAndSortedResources.length > 0 ? (
          filteredAndSortedResources.map(resource => (
            <li key={resource.id}>
              {resource.name} ({resource.service}, {resource.distance}mi)
            </li>
          ))
        ) : (
          <p>No resources found.</p>
        )}
      </ul>
    </div>
  );
};


// Test Suite
describe('ResourceDirectory Sorting, Filtering, and Searching', () => {

  // Helper function to render the component before each test
  beforeEach(() => {
    render(<ResourceDirectory resources={mockResources} />);
  });

  // Search Test Cases

  test('1. [Search] filters results by name', () => {
    const searchInput = screen.getByLabelText(/Search by name or zip/i);
    fireEvent.change(searchInput, { target: { value: 'Food Bank' } });
    
    expect(screen.getByText(/City Central Food Bank/i)).toBeInTheDocument();
    expect(screen.queryByText(/Downtown Community Shelter/i)).not.toBeInTheDocument();
  });

  test('2. [Search] filters results by location', () => {
    const searchInput = screen.getByLabelText(/Search by name or zip/i);
    fireEvent.change(searchInput, { target: { value: '90001' } });

    expect(screen.getByText(/Downtown Community Shelter/i)).toBeInTheDocument();
    expect(screen.getByText(/Family First Housing/i)).toBeInTheDocument();
    expect(screen.queryByText(/City Central Food Bank/i)).not.toBeInTheDocument();
  });
  
  test('3. [Search] search is case-insensitive', () => {
    const searchInput = screen.getByLabelText(/Search by name or zip/i);
    fireEvent.change(searchInput, { target: { value: 'uptown legal' } });
    
    expect(screen.getByText(/Uptown Legal Aid/i)).toBeInTheDocument();
    expect(screen.queryByText(/City Central Food Bank/i)).not.toBeInTheDocument();
  });

  test('4. [Search] shows "no results" message for unmatched queries', () => {
    const searchInput = screen.getByLabelText(/Search by name or zip/i);
    fireEvent.change(searchInput, { target: { value: 'NonExistentPlace' } });

    expect(screen.getByText(/No resources found/i)).toBeInTheDocument();
  });

  // Filter Test Cases

  test('5. [Filter] filters results by a single service type (e.g., Housing)', () => {
    const housingCheckbox = screen.getByRole('checkbox', { name: /Housing/i });
    fireEvent.click(housingCheckbox);

    expect(screen.getByText(/Downtown Community Shelter/i)).toBeInTheDocument();
    expect(screen.getByText(/Family First Housing/i)).toBeInTheDocument();
    expect(screen.queryByText(/City Central Food Bank/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Uptown Legal Aid/i)).not.toBeInTheDocument();
  });

  test('6. [Filter] filters results by multiple service types (e.g., Food and Legal)', () => {
    fireEvent.click(screen.getByRole('checkbox', { name: /Food/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /Legal/i }));

    expect(screen.getByText(/City Central Food Bank/i)).toBeInTheDocument();
    expect(screen.getByText(/Uptown Legal Aid/i)).toBeInTheDocument();
    expect(screen.queryByText(/Downtown Community Shelter/i)).not.toBeInTheDocument();
  });

  test('7. [Filter] removing a filter adds items back to the list', () => {
    const housingCheckbox = screen.getByRole('checkbox', { name: /Housing/i });
    
    // Check it (filters list)
    fireEvent.click(housingCheckbox);
    expect(screen.queryByText(/City Central Food Bank/i)).not.toBeInTheDocument();

    // Uncheck it (removes filter)
    fireEvent.click(housingCheckbox);
    expect(screen.getByText(/City Central Food Bank/i)).toBeInTheDocument();
  });

  // Sort Test Cases

  test('8. [Sort] sorts by distance (nearest) by default', () => {
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Youth Services Center');
    expect(listItems[1]).toHaveTextContent('City Central Food Bank');
    expect(listItems[4]).toHaveTextContent('Uptown Legal Aid');
  });

  test('9. [Sort] sorts by Name (A-Z) when selected', () => {
    const sortSelect = screen.getByLabelText(/Sort by/i);
    fireEvent.change(sortSelect, { target: { value: 'name-asc' } });

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('City Central Food Bank');
    expect(listItems[1]).toHaveTextContent('Downtown Community Shelter');
    expect(listItems[4]).toHaveTextContent('Youth Services Center');
  });

  // Combined Test Case

  test('10. [Combined] filters by service and then searches within those results', () => {
    // Filter by "Housing"
    fireEvent.click(screen.getByRole('checkbox', { name: /Housing/i }));
    
    // Now, only 'Downtown Community Shelter' and 'Family First Housing' should be visible
    expect(screen.getByText(/Downtown Community Shelter/i)).toBeInTheDocument();
    expect(screen.getByText(/Family First Housing/i)).toBeInTheDocument();
    expect(screen.queryByText(/City Central Food Bank/i)).not.toBeInTheDocument();

    // Search within "Housing" for "Family"
    const searchInput = screen.getByLabelText(/Search by name or zip/i);
    fireEvent.change(searchInput, { target: { value: 'Family' } });

    // Only 'Family First Housing' should remain
    expect(screen.getByText(/Family First Housing/i)).toBeInTheDocument();
    expect(screen.queryByText(/Downtown Community Shelter/i)).not.toBeInTheDocument();
  });
});