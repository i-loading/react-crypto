import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const coinCapAPI = process.env.REACT_APP_COINCAP_API_KEY;

export const fetchCrypto = createAsyncThunk(
  "currencies/fetchCrypto",
  async (_, { getState, rejectWithValue }) => {
    const { currencyName } = getState().ui || { currencyName: "USD" };
    try {
      const res = await fetch(`https://rest.coincap.io/v3/assets?limit=500`, {
        headers: { Authorization: `Bearer ${coinCapAPI}` },
      });
      const { data } = await res.json();

      const newData = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let newElem = {
          id: element.id,
          name: element.name,
          symbol: element.symbol,
          rank: +Number(element.rank),
          supply: +Number(element.supply).toFixed(1),
          changePercent24Hr: +Number(element.changePercent24Hr).toFixed(1),
          maxSupply: +Number(element.maxSupply).toFixed(0),
          marketCapUsd: +Number(element.marketCapUsd).toFixed(1),
          priceUsd: +Number(element.priceUsd).toFixed(2),
          volumeUsd24Hr: +Number(element.volumeUsd24Hr).toFixed(0),
        };
        if (currencyName === "EUR") {
          newElem = {
            ...newElem,
            marketCapUsd: +Number(element.marketCapUsd).toFixed(1) * 0.80345,
            priceUsd: +Number(element.priceUsd).toFixed(2) * 0.80345,
            volumeUsd24Hr: +Number(element.volumeUsd24Hr).toFixed(0) * 0.80345,
          };
        } else if (currencyName === "UAH") {
          newElem = {
            ...newElem,
            marketCapUsd: +Number(element.marketCapUsd).toFixed(1) * 43.12,
            priceUsd: +Number(element.priceUsd).toFixed(2) * 43.12,
            volumeUsd24Hr: +Number(element.volumeUsd24Hr).toFixed(0) * 43.12,
          };
        }
        newData.push(newElem);
      }
      return newData;
    } catch (e) {
      return rejectWithValue(e.message || "Fetch error");
    }
  },
);

const slice = createSlice({
  name: "currencies",
  initialState: { currs: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.currs = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default slice.reducer;
