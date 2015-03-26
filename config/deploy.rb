

set :stages, %w(production staging)
set :default_stage, "staging"
require 'capistrano/ext/multistage' # yes, must be after variables above

set :application, "rekrytering.armada.nu"
set :deploy_to, "/var/www/rekrytering.armada.nu"
set :repository, "git@github.com:armada-ths/rekrytering.git"
set :ssh_options, { :forward_agent => true }
set :deploy_via, :copy
set :copy_compression, :gzip
set :scm, :git
set :user, 'deploy'
set :use_sudo, false

before 'deploy:update_code' do
  # run_locally 'rm -rf build/*' # måste behålla index.php
  run_locally 'middleman build'
end



before "deploy:assets:precompile", "deploy:symlink_config_files" # must be here so it's done before precompile assets want's to do 'rake'
after "deploy", "deploy:restart"
after "deploy", "deploy:migrate"
after "deploy", "deploy:cleanup"
