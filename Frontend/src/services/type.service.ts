import { STATUS_CODE } from "@/constants/enums"

export interface FetcherOptions extends RequestInit {
  revalidate?: number | false
  noStore?: boolean
  asText?: boolean
}

export interface ResData<T> {
  code: STATUS_CODE,
  message: string,
  data: T | null,
  pagination?: PaginationTotalDTO
}

export interface PaginationDTO {
  pageIndex: number;
  pageSize: number;
}

export interface PaginationTotalDTO {
  total: number;
}