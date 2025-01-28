import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { Key } from "react";

export type TError = {
  data: { message: string; success: boolean; stack: string };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type TResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: TError;
  meta?: TMeta;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;


export type TQueryParam = {
  name: string;
  value: string | number | boolean | Key;
}
