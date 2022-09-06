import axios from 'axios';
import {useQuery, useMutation} from 'react-query';
export const rechargeUserBalanace = async () => {
  return axios('/api', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    data: {'amount': 10},
    withCredentials: false,
  });
};

export const useFetchUserBalance = () => {
  return useQuery('fetchbalance', async () => {
    return axios('/api', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    });
  });
};

export const useRechargeBalance = () => {
  const rechargeUserBalanceMutation= useMutation(
    'recharge',
    rechargeUserBalanace,
  );
  return rechargeUserBalanceMutation.mutateAsync;
};
