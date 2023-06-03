class GmailInfo < ActiveRecord::Migration[7.0]
  def change
    create_table(:gmail_infos) do |t|
      ## Required
      t.string :transition_url, :null => false
      t.string :client_id, :null => false
      t.string :client_secret, :null => false
    end

    add_index :gmail_infos, :transition_url, unique: true
    add_index :gmail_infos, :client_id, unique: true
    add_index :gmail_infos, :client_secret, unique: true
  end
end
