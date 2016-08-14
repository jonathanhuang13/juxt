import { valid } from '../validation';

export const user = {
  create: false,
  read: valid().str(['title', 'brand', 'unit']).num(['price', 'amount']),
  update: false,
  del: false,
};

export const sup = {
  create: valid().str(['title', 'brand']),
  read: valid().str(['title', 'brand', 'unit']).num(['price', 'amount']),
  update: valid().str(['title', 'brand']),
  del: true,
};


export const admin = {

};