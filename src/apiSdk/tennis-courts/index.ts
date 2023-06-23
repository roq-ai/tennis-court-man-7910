import axios from 'axios';
import queryString from 'query-string';
import { TennisCourtInterface, TennisCourtGetQueryInterface } from 'interfaces/tennis-court';
import { GetQueryInterface } from '../../interfaces';

export const getTennisCourts = async (query?: TennisCourtGetQueryInterface) => {
  const response = await axios.get(`/api/tennis-courts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTennisCourt = async (tennisCourt: TennisCourtInterface) => {
  const response = await axios.post('/api/tennis-courts', tennisCourt);
  return response.data;
};

export const updateTennisCourtById = async (id: string, tennisCourt: TennisCourtInterface) => {
  const response = await axios.put(`/api/tennis-courts/${id}`, tennisCourt);
  return response.data;
};

export const getTennisCourtById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tennis-courts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTennisCourtById = async (id: string) => {
  const response = await axios.delete(`/api/tennis-courts/${id}`);
  return response.data;
};
