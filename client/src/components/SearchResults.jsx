import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      <h3>Search Results</h3>
      {results.length > 0 ? (
        <ul>
          {results.map((course) => (
            <li key={course._id}>
              <Link to={`/viewCourse/${course._id}`}>{course.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses found</p>
      )}
    </div>
  );
};

export default SearchResults;
