import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ initialValue = '', onSearch, compact = false, autoFocus = false }) {
  const [value, setValue] = useState(initialValue);

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <form className="searchbar" role="search" onSubmit={submit} style={compact ? undefined : { height: 44 }}>
      <Search size={17} color="#64748b" aria-hidden="true" />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        placeholder="Search products, brands…"
        aria-label="Search products"
        onChange={(e) => {
          setValue(e.target.value);
          if (compact && e.target.value === '') onSearch?.('');
        }}
      />
    </form>
  );
}
