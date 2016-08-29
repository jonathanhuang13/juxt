import { valid } from '../validation';

export const user = {
  create: false,
  read: valid().str(['id', 'title', 'brand']),
  update: false,
  del: false,
};

export const sup = {
  create: valid().str(['title', 'brand']),
  read: valid().str(['id', 'title', 'brand']),
  update: valid().str(['title', 'brand']),
  del: true,
};


export const admin = {

};
