import { results } from '../constants/actionTypes';

const { SET_STATE } = results;

const itemList = [{ id: 'a7f54f1e-c564-43ab-a38e-4a616cdba438',
    title: 'Chicken breast',
    brand: 'Tyson\'s',
    stores: [
      {   id: '02edf83d-577f-455c-9106-80bbb3688483',
          name: 'Trader Joes',
          address: '1324 abc ln',
          acronym: 'TJ',
          price: 7.99,
          amount: 6,
          unit: 'none' 
      },
      {   id: '12dda23d-577f-455c-9106-80bbb3688483',
          name: 'Uwajimaya',
          address: '4901 zyx dr',
          acronym: 'UJ',
          price: 9.99,
          amount: 7,
          unit: 'breasts' 
      } 
    ] 
  }
];

export function fetch(itemIds, storeIds) {
  return { type: SET_STATE, state: itemList };
}
