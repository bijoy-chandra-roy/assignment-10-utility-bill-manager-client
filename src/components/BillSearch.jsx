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
        className="input input-bordered input-primary w-full bg-base-100 text-base-content md:w-80"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default BillSearch;