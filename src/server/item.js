import { extend } from './book';
import Store from './store';

export default extend('Item', {
  tableName: 'items',
  hasTimestamps: true,
  stores: () => {
    return this.belongsToMany(Store);
  }
});
