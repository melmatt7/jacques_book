// export type ParamsResponse = {
//   name: string;
//   type: string;
//   indexed: boolean;
//   decoded: boolean;
//   value:
//     | string
//     | null
//     | {
//         value: string;
//         bitSize: number;
//         typeAsString: ValueType;
//       }[];
// };

// export type DecodedResponse = {
//   name: string;
//   signature: string;
//   params: ParamsResponse[];
// };

// export type EventResponse = {
//   block_signed_at: string;
//   block_height: number;
//   tx_offset: number;
//   log_offset: number;
//   tx_hash: string;
//   sender_contract_decimals: number;
//   sender_address: string;
//   sender_address_label: string | null;
//   sender_name: string | null;
//   sender_contract_ticker_symbol: string | null;
//   sender_logo_url: string | null;
//   raw_log_data: string | null;
//   _raw_log_topics_bytes: {
//     empty: boolean;
//   } | null;
//   raw_log_topics: string[];
//   decoded: DecodedResponse;
// };

// export type ItemResponse = {
//   block_signed_at: string;
//   block_height: number;
//   tx_hash: string;
//   tx_offset: number;
//   successful: boolean;
//   from_address: string | null;
//   from_address_label: string | null;
//   to_address: string | null;
//   to_address_label: string | null;
//   value: string;
//   value_quote: number;
//   gas_offered: number;
//   gas_spent: number;
//   gas_price: number;
//   gas_quote: number;
//   gas_quote_rate: number;
//   log_events: EventResponse[];
// };

// export type DataResponse = {
//   address: string;
//   updated_at: string;
//   next_update_at: string;
//   quote_currency: string;
//   chain_id: number;
//   items: ItemResponse[];
// };

// export type QueryResponse = {
//   data: DataResponse;
//   error: boolean;
//   error_message: string | null;
//   error_code: number | null;
// };

export type CovalentApiResponse = {
  config: Object;
  data: QueryResponse;
  headers: Object;
  status: number;
  statusText: string;
};

export interface QueryResponse {
  data: Data;
  error: boolean;
  error_message?: null;
  error_code?: null;
}
export interface Data {
  address: string;
  updated_at: string;
  next_update_at: string;
  quote_currency: string;
  chain_id: number;
  items?: ItemsEntity[] | null;
  pagination: Pagination;
}
export interface ItemsEntity {
  block_signed_at: string;
  block_height: number;
  tx_hash: string;
  tx_offset: number;
  successful: boolean;
  from_address: string;
  from_address_label?: string | null;
  to_address: string;
  to_address_label?: string | null;
  value: string;
  value_quote?: number | null;
  gas_offered: number;
  gas_spent: number;
  gas_price: number;
  gas_quote?: number | null;
  gas_quote_rate?: number | null;
  log_events?: (LogEventsEntity | null)[] | null;
}
export interface LogEventsEntity {
  block_signed_at: string;
  block_height: number;
  tx_offset: number;
  log_offset: number;
  tx_hash: string;
  _raw_log_topics_bytes?: null;
  raw_log_topics?: string[] | null;
  sender_contract_decimals?: number | null;
  sender_name?: string | null;
  sender_contract_ticker_symbol?: string | null;
  sender_address: string;
  sender_address_label?: string | null;
  sender_logo_url?: string | null;
  raw_log_data?: string | null;
  decoded?: Decoded | null;
}
export interface Decoded {
  name: string;
  signature: string;
  params?: ParamsEntity[] | null;
}
export interface ParamsEntity {
  name: string;
  type: string;
  indexed: boolean;
  decoded: boolean;
  value: string | boolean | null | Entity[];
}
export interface Entity {
  value: string;
  typeAsString: string;
  bitSize?: number | null;
}

export enum ValueType {
  INT256 = 'int256',
  UINT256 = 'uint256',
  ADDRESS = 'address',
}
export interface Pagination {
  has_more: boolean;
  page_number: number;
  page_size: number;
  total_count?: null;
}
