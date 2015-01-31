class CreateIdentities < ActiveRecord::Migration
  def change
    create_table :identities do |t|
      t.integer :user_id
      t.string :uid
      t.string :provider
      t.string :token
      t.string :token_secret

      t.timestamps
    end
  end
end
