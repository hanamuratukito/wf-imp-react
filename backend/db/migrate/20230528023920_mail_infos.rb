class MailInfos < ActiveRecord::Migration[7.0]
  def change
    create_table(:mail_infos) do |t|
      ## Required
      t.string :subject, :null => false
      t.string :to, :null => false
      t.string :from, :null => false
      t.string :body, :null => true
      t.json :attach, :null => true
      t.timestamps
    end

    add_index :mail_infos, :subject
    add_index :mail_infos, :to
    add_index :mail_infos, :from
  end
end
