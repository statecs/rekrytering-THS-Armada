

set :rails_env, "staging"
set :branch, "master" #fetch(:branch, "new_layout")
#server 'stocken.armada.nu', :db, :app, :web, :primary => true
set :env, fetch(:env, 'staging')
server 'web.armada.nu', :app, :web, :primary => true
role :db,  'web.armada.nu', :primary => true
set :deploy_to, "/var/www/rekrytering.armada.nu"