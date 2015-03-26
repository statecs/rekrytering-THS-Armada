

set :rails_env, "staging"
set :branch, "master" #fetch(:branch, "new_layout")
#server 'stocken.armada.nu', :db, :app, :web, :primary => true
set :env, fetch(:env, 'staging')
server 'web.armada.nu', :app, :web, :primary => true