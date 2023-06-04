class Requests < ActiveRecord::Migration[7.0]
  def change
    create_table(:requests) do |t|
      ## Required
      t.integer :business_type, :null => false
      t.string :request_name, :null => false
      t.integer :status, :null => false
      t.string :contact, :null => false
      # t.integer :updated_user_id, :null => false
      # t.integer :created_user_id, :null => false
      # t.integer :mail_info_id, :null => false
      t.timestamps
    end

    add_index :requests, :business_type
    add_index :requests, :request_name
    add_index :requests, :status
    add_reference :requests, :updated_user, foreign_key: { to_table: :users }
    add_reference :requests, :created_user, foreign_key: { to_table: :users }
    add_reference :requests, :mail_info, foreign_key: { to_table: :mail_infos }
  end
end
