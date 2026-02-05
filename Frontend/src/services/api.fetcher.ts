import { STATUS_CODE } from "@/constants/enums";
import { FetcherOptions, ResData } from "./type.service";

export async function fetcher<T = any>(
  url: string,
  options: FetcherOptions = {}
): Promise<ResData<T>> {
  const { revalidate, noStore, ...rest } = options
  const fetchOptions: FetcherOptions = {
    ...rest,
  }
  if (noStore) {
    fetchOptions.cache = "no-store"
  } else if (typeof revalidate === "number") {
    fetchOptions.next = { revalidate }
  }
  try {
    console.log("========= API request ========= \n ", url, fetchOptions)
    const res = await fetch(url, fetchOptions)
    console.log("========= API response ========= \n ", res)
    if (!res.ok) {
      const message = await safeReadError(res)
      return {
        code: STATUS_CODE.FAIL,
        message: message || "An error occurred while fetching the data.",
        data: null,
      }
    }
    const data: ResData<T> = await res.json();
    console.log("========= API data ========= \n ", data);
    return data;
  } catch (err: any) {
    console.error("========= API error ========= \n ", err);
    return {
      code: STATUS_CODE.FAIL,
      message: err.message || "An error occurred while fetching the data.",
      data: null,
    }
  } finally {
   
  }
}

async function safeReadError(res: Response): Promise<string> {
  try {
    const data = await res.json()
    return data?.message || res.statusText
  } catch {
    return res.statusText
  }
}
