import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import {
  InputBase,
  Typography,
  TextField,
  Stack,
  MenuItem,
  Box,
  Select,
  RadioGroup,
  Radio,
  FormControlLabel,
  Hidden,
} from "@mui/material";
import { filterNft } from "redux/slices/nft";
import { SearchContext } from "../contexts/SearchContext";
import useLocalStorage from "hooks/useLocalStorage";
import SearchInput from "components/SearchInput";

const CHAINS = [
  { value: "all", label: "All" },
  { value: "eth", label: "Ethereum" },
  { value: "bnb", label: "BSC" },
  { value: "sol", label: "Solana" },
  { value: "matic", label: "Polygon" },
  { value: "ada", label: "Cardano" },
  { value: "avax", label: "Avalanche" },
];

const SORTS = [
  { value: "default", label: "Default" },
  { value: "new", label: "New" },
  { value: "upcoming", label: "Upcoming" },
  { value: "best", label: "Best Rated" },
  { value: "listed", label: "Listed" },
];

const SearchButton = () => {
  const searchInputRef = useRef("");
  const dispatch = useDispatch();

  const [filters, setFilters] = useLocalStorage("filters", {
    chain: "all",
    sort: "default",
    filter: "none",
  });

  const [stateFilters, setStateFilters] = useState(filters);

  const handleRadioChange = (e) => {
    setFilters({ ...filters, filter: e.target.value });
    setStateFilters({ ...filters, filter: e.target.value });
  };

  useEffect(() => {
    dispatch(filterNft(filters));
  }, [dispatch, filters]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Hidden mdUp>
        <SearchInput />
      </Hidden>
      <RadioGroup row value={filters.filter} onChange={handleRadioChange}>
        <FormControlLabel
          value="none"
          control={<Radio color="warning" />}
          label="None"
        />
        <FormControlLabel
          value="most_wanted"
          control={<Radio color="warning" />}
          label="Most Wanted"
        />
        <FormControlLabel
          value="top"
          control={<Radio color="warning" />}
          label="Top"
        />
      </RadioGroup>
      <Stack direction="row" spacing={3}>
        <Select
          size="small"
          value={filters.chain}
          onChange={(e) => {
            setFilters({ ...filters, chain: e.target.value });
            setStateFilters({ ...filters, chain: e.target.value });
          }}
          fullWidth
          inputProps={{
            sx: {
              display: "flex",
              alignItems: "center",
            },
          }}
          MenuProps={{
            sx: {
              "& .MuiPaper-root": {
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(20px)",
              },
            },
          }}
          sx={{ width: 180 }}
        >
          {CHAINS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value !== "all" && (
                <Box
                  component="img"
                  src={`/chains/${option.value}.png`}
                  sx={{ width: 32, mr: 2 }}
                />
              )}

              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={filters.sort}
          onChange={(e) => {
            setFilters({ ...filters, sort: e.target.value });
            setStateFilters({ ...filters, sort: e.target.value });
          }}
          fullWidth
          inputProps={{
            sx: {
              display: "flex",
              alignItems: "center",
            },
          }}
          MenuProps={{
            sx: {
              "& .MuiPaper-root": {
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(20px)",
              },
            },
          }}
          sx={{ width: 160 }}
        >
          {SORTS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
};
export default SearchButton;
