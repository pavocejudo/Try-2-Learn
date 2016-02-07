# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure(2) do |config|
 
  config.vm.box = "dummybox-aws"

  config.env.enable

  config.vm.hostname = "try2learn"
  config.vm.provider :aws do |aws, override|
 
    #AWS Settings
    aws.access_key_id = ENV['ACCESS_KEY_ID']
    aws.secret_access_key = ENV['SECRET_ACCESS_KEY']
    aws.region = "us-west-2"
 
    aws.tags = {
      'Name' => 'Try-2-Learn',
      'Team' => 'Try-2-Learn',
      'Status' => 'active'
    }
 
    #Override Settings
    override.ssh.username = "ubuntu"
    override.ssh.private_key_path = ENV['PRIVATE_KEY_PATH']
 
    aws.region_config "us-west-2" do |region|
      region.ami = 'ami-35143705'
      region.instance_type = 't2.micro'
      region.keypair_name = "try-2-learn"
      region.security_groups = "launch-wizard-3"
    end

    #Provisionamiento
    config.vm.provision :ansible do |ansible|  
        ansible.playbook = "playbook.yml"
        ansible.limit = 'all'
        ansible.verbose = "vv"
    end 
  end
end
