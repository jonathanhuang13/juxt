function timestamps(t, knex) {
  t.timestamps();
}

export async function up(knex, Promise) {
  await knex.schema.createTable('users', t => {
    t.uuid('id');
    timestamps(t, knex);

    t.string('first');
    t.string('last');
    t.string('email');

    t.index(['email']);
  });

  await knex.schema.createTable('stores', t => {
    t.uuid('id');
    timestamps(t, knex);

    t.string('name');
    t.string('acronym');

    t.string('city');
    t.string('state');
    t.string('zip');
    t.string('address1');
    t.string('address2');
  });

  await knex.schema.createTable('items', t => {
    t.uuid('id');
    timestamps(t, knex);

    t.uuid('creator_id');

    t.string('title');
    t.string('normalized_title');
    t.date('date');
    t.string('brand');
    t.string('price');
    t.string('amount');
    t.specificType('tags', 'text[]');
  });
};

export async function down(knex, Promise) {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('stores');
  await knex.schema.dropTableIfExists('items');
};
