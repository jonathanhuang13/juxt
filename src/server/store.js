import { extend } from './book';
import Item from './item';

export default extend('Store', {
  tableName: 'stores',
  hasTimestamps: true,
  items: () => {
    return this.belongsToMany(Item);
  }
});
