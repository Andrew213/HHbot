import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {Box, IconButton, TextField, Typography} from "@mui/material";
import {useUnit} from "effector-react";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

import {
  $vacancies,
  getVacanciesFx,
  searchVacanciesFx,
} from "../VacanciesList/model";
import {useSearch} from "./SearchContext";

const Search: React.FC = () => {
  const {searchValue, setSearchValue, setCurrentPage} = useSearch();

  const [{found}, searchVacancies, getVacancies] = useUnit([
    $vacancies,
    searchVacanciesFx,
    getVacanciesFx,
  ]);

  const [searchParams] = useSearchParams();

  const [_wasFound, setWasFound] = useState<boolean>(false);

  const handleOnSearch = () => {
    if (searchValue) {
      setWasFound(true);
      searchVacancies({text: searchValue.trim(), page: 0});
    } else if (searchParams.has("resume")) {
      setWasFound(false);
      getVacancies({resume_id: searchParams.get("resume") as string, page: 0});
    }
    setCurrentPage(1);
  };

  const handleOnClear = () => {
    setWasFound(false);
    setSearchValue("");
    getVacancies({resume_id: searchParams.get("resume") as string, page: 0});
    setCurrentPage(1);
  };

  return (
    <>
      <Box position="relative">
        <TextField
          fullWidth
          placeholder="Поиск"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value);
          }}
          inputProps={{
            "aria-label": "search google maps",
          }}
          sx={{}}
          InputProps={{
            style: {
              paddingRight: "50px",
            },
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOnSearch();
            }
          }}
        />
        {searchValue && (
          <IconButton
            type="button"
            sx={{
              position: "absolute",
              right: 35,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            aria-label="search"
            onClick={handleOnClear}
            size="small">
            <ClearIcon fontSize="inherit" />
          </IconButton>
        )}

        <IconButton
          type="button"
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          aria-label="search"
          onClick={handleOnSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
      {found && <Typography mt={1}>{`Найдено ${found} вакансий`}</Typography>}
    </>
  );
};

export default Search;
