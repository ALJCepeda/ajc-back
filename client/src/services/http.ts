import Axios, {AxiosRequestConfig} from "axios";
import {isDataQuery} from "ajc-shared";

const axios = Axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true
});

export function request<T>(method:string, url:string, config?:AxiosRequestConfig): Promise<T> {
  return axios.request({
    method, url, ...config
  }).then(resp => resp.data);
}

export function get<
  IAPI extends IEndpoint<IAPI['IRequest'], IAPI['IResponse']>
> (
  url:string
): (query:IAPI['IRequest']) => Promise<IAPI['IResponse']> {
  return (query) => {
    return request<IAPI['IResponse']>('get', url, {
      params:query
    });
  };
}

export function post<
  IAPI extends IEndpoint<IAPI['IRequest'], IAPI['IResponse']>,
> (
  url:string
): (request:IAPI['IRequest']) => Promise<IAPI['IResponse']> {
  return (data) => {
    let query, body;

    if(isDataQuery(data)) {
      body = data.body;
      query = data.query;
    } else {
      body = data;
    }

    return request<IAPI['IResponse']>('post', url, {
      data:body,
      params:query
    });
  };
}

export function remove<
  IAPI extends IEndpoint<IAPI['IRequest'], IAPI['IResponse']>
> (
  url:string
): (data:IAPI['IRequest']) => Promise<IAPI['IResponse']> {
  return (data) => {
    let query, body;

    if(isDataQuery(data)) {
      body = data.body;
      query = data.query;
    } else {
      body = data;
    }


    return request<IAPI['IResponse']>('delete', url, {
      data: body,
      params: query
    });
  };
}
