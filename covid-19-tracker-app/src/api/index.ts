import axios, { AxiosRequestConfig } from "axios";

const url = "https://covid19.mathdro.id/api";

export declare module ApiResponse {
  interface Confirmed {
    value: number;
    detail: string;
  }

  interface Recovered {
    value: number;
    detail: string;
  }

  interface Deaths {
    value: number;
    detail: string;
  }

  interface RootObject {
    confirmed: Confirmed;
    recovered: Recovered;
    deaths: Deaths;
    lastUpdate: Date;
  }
}

export declare module DailyApiResponse {
  interface Confirmed {
    total: number;
    china: number;
    outsideChina: number;
  }

  interface Deaths {
    total: number;
    china: number;
    outsideChina: number;
  }

  interface RootObject {
    confirmed: Confirmed;
    deaths: Deaths;
    reportDate: string;
  }
}

interface Countries {
  name: string;
}

export const fetchData = async (country?: string) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    }: AxiosRequestConfig = await axios.get(changeableUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
    alert("something went wrong... try again later");
  }
};

export const fetchDailyData = async () => {
  try {
    const { data }: AxiosRequestConfig = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData: DailyApiResponse.RootObject) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      reportDate: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
    alert("something went wrong... try again later");
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    }: AxiosRequestConfig = await axios.get(`${url}/countries`);
    return countries.map((country: Countries) => country.name);
  } catch (error) {
    console.log(error);
    alert("something went wrong... try again later");
  }
};
