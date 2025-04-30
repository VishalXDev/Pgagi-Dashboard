export interface TimeSeriesEntry {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
  '8. split coefficient': string;
}

export interface ParsedTimeSeriesEntry {
  '1. open': number;
  '2. high': number;
  '3. low': number;
  '4. close': number;
  '5. adjusted close': number;
  '6. volume': number;
  '7. dividend amount': number;
  '8. split coefficient': number;
}

// Type alias for the time series data
export type TimeSeries = { [date: string]: TimeSeriesEntry };

// Function to parse TimeSeriesEntry into ParsedTimeSeriesEntry with error handling
export const parseTimeSeriesEntry = (entry: TimeSeriesEntry): ParsedTimeSeriesEntry => {
  return {
    '1. open': parseFloat(entry['1. open']) || 0,
    '2. high': parseFloat(entry['2. high']) || 0,
    '3. low': parseFloat(entry['3. low']) || 0,
    '4. close': parseFloat(entry['4. close']) || 0,
    '5. adjusted close': parseFloat(entry['5. adjusted close']) || 0,
    '6. volume': parseInt(entry['6. volume'], 10) || 0,
    '7. dividend amount': parseFloat(entry['7. dividend amount']) || 0,
    '8. split coefficient': parseFloat(entry['8. split coefficient']) || 0,
  };
}

export interface StockApiResponse {
  'Time Series (Daily)': TimeSeries;
}

export interface StockPoint {
  date: string;
  close: number;
}
export interface ParsedStockPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}