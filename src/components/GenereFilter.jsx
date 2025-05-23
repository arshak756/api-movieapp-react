import React from 'react';

const GenereFilter = ({ genres, selectedGenre, onChange }) => {
  return (
    <select
      className="p-2 mb-4 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white border rounded cursor-pointer"
      value={selectedGenre}
      onChange={onChange}
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenereFilter;

