import React, { useState, useEffect } from 'react';

const BillSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearch]);

  return (
    <div className="w-full md:w-auto">
      <input
        type="text"
        placeholder="Search bills by title..."
        className="input input-bordered w-full bg-blue-600 text-white placeholder:text-white/80 md:w-80"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default BillSearch;