import React, { useState, useRef, useEffect } from 'react';
import './searchAndFilter.css';
import _ from 'lodash';

function useEffectSkipFirst(fn, arr) {
    const isFirst = useRef(true);

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }
        fn();
    }, arr);
}

const SearchAndFilter = (props) => {
    const [searchText, setSearchText] = useState("");
    const [type, setType] = useState("");

    const [language, setLanguage] = useState("");
    const debouncedSearchFilter = _.debounce(props.searchFilterRepository, 1000);

    useEffectSkipFirst(
        () => {
            debouncedSearchFilter(props.location.pathname, searchText, type, language)
        },
        [searchText, type, language]
    );

    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    }
    const handleTypeFilterChange = (e) => {
        setType(e.target.value);
    }
    const handleLanguageFilterChange = (e) => {
        setLanguage(e.target.value);
    }

    const resetFilter = (e) => {
        setSearchText("");
        setType("");
        setLanguage("");
    }

    return (
        <div className="search-filter-container">
            <div className="search-filter-content">
                <input className="search-input"
                    placeholder="Find a repository"
                    value={searchText}
                    onChange={handleSearchInputChange} />
                <div className="filter-by-type">
                    <select
                        className="type-select"
                        id="type"
                        value={type}
                        onChange={handleTypeFilterChange} >
                        <option value="All">All</option>
                        <option value="Sources">Sources</option>
                        <option value="Forks">Forks</option>
                        <option value="Archived">Archived</option>
                        <option value="Mirrors">Mirrors</option>
                    </select>
                </div>
                <div className="filter-container">
                    <div className="filter-by-language">
                        <select
                            className="language-select"
                            id="language"
                            value={language}
                            onChange={handleLanguageFilterChange}
                        >
                            <option value="All" >All</option>
                            <option value="JavaScript" >JavaScript</option>
                        </select>
                    </div>
                </div>

            </div>
            {type || language || searchText ?
                <div className="clear-filter">
                    <span onClick={resetFilter}>
                        <svg class="octicon octicon-x issues-reset-query-icon mt-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                     Clear filters
                </span>
                </div>
                : null
            }
        </div>
    );

}

export default SearchAndFilter;