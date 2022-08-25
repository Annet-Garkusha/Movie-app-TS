import { Input } from "antd";
import { debounce } from "lodash";

import { IQuery } from "../../types/types";

export const SearchFilms = ({ setQuery }: IQuery): JSX.Element => {
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length === 0) return;
    setQuery(event.target.value);
  };
  return (
    <Input
      placeholder="Type to search..."
      onChange={debounce(handleSearchInput, 1000)}
    />
  );
};
