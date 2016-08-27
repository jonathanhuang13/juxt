import { valid } from '../validation';

export const user = {
  create: false,
  read: valid().str(['name', 'acronym', 'id', 'city', 'state', 'address1']),
  update: false,
  del: false,
};

export const sup = {
  create: valid().str(['name', 'acronym']),
  read: valid().str(['name', 'acronym', 'id', 'city', 'state', 'address1']),
  update: valid().str(['name', 'acronym']),
  del: true,
};


export const admin = {

};
