import React from 'react';

const welcome = {
  title: 'React',
  hi: 'Welcome',
};

const useStorageState = (key, initialState) => {
  const lastSearchTerm = localStorage.getItem(key) || initialState;
  const [searchTerm, setSearchTerm] = React.useState(lastSearchTerm);

  React.useEffect(() => {
    localStorage.setItem(key, searchTerm);
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm];
};

const App = () => {
  const [programs, setPrograms] = React.useState([
    {
      id: '1',
      name: 'Laser One',
      count: 5,
      url: 'http1',
    },
    {
      id: '2',
      name: 'Laser Two',
      count: 10,
      url: 'http2',
    },
  ]);

  const [searchTerm, setSearchTerm] = useStorageState('search', '');

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleRemoveItem(item) {
    const newPrograms = programs.filter(
      (program) => item.id !== program.id
    );

    setPrograms(newPrograms);
  }

  const searchedPrograms = programs.filter((program) => {
    return program.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Hello {welcome.title}</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <List list={searchedPrograms} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onChange,
  children,
}) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input id={id} type={type} value={value} onChange={onChange} />
    </>
  );
};

const List = ({ list, onRemoveItem }) => {
  return (
    <div>
      {list.map(function (item) {
        return (
          <div key={item.id}>
            <span>
              <a href={item.url}>{item.name}</a>
            </span>
            <span>{item.count}</span>
            <span>
              <button
                type="button"
                onClick={() => onRemoveItem(item)}
              >
                Dismiss
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default App;
