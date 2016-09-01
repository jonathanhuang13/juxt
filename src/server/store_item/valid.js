import { valid } from '../validation';

export const user = {
  create: false,
  read: valid().str(['item_id', 'store_id', 'units']).num(['price', 'amount']),
  update: false,
  del: false,
};

export const sup = {
  create: valid().str(['item_id', 'store_id', 'units']).num(['price', 'amount']),
  read: valid().str(['item_id', 'store_id', 'units']).num(['price', 'amount']),
  update: valid().str(['item_id', 'store_id', 'units']).num(['price', 'amount']),
  del: true,
};


export const admin = {

};
