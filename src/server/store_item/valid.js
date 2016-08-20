import { valid } from '../validation';

export const user = {
  create: false,
  read: valid().str(['unit']).num(['price', 'amount']),
  update: false,
  del: false,
};

export const sup = {
  create: valid().str(['unit']).num(['price', 'amount']),
  read: valid().str(['unit']).num(['price', 'amount']),
  update: valid().str(['unit']).num(['price', 'amount']),
  del: true,
};


export const admin = {

};
