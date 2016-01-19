# -*- mode: ruby -*-
# vi: set ft=ruby :
 
# Vagrant on AWS 

CFG_TZ = "UTC"
 
# Provisioning script
provision_script = <<SCRIPT
#!/bin/bash
 
# set timezone
echo "#{CFG_TZ}" > /etc/timezone
dpkg-reconfigure -f noninteractive tzdata
 
# install a few base packages
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo 'deb https://apt.dockerproject.org/repo ubuntu-trusty main' >> /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install vim curl git build-essential -y
echo Cloning Try-2-Learn
git clone https://github.com/jesusgn90/Try-2-Learn
cd Try-2-Learn
echo Installing dependencies
apt-get install -y nodejs
apt-get install -y npm
echo 'alias node="nodejs"' >> ~/.bashrc
source ~/.bashrc
npm install
echo Installing Docker
apt-cache policy docker-engine 
apt-get install linux-image-extra-$(uname -r) -y
apt-get install docker-engine -y
echo Provisioning is complete
SCRIPT
 
Vagrant.configure(2) do |config|
 
  config.vm.box = "dummybox-aws"
  config.vm.hostname = "try2learn"
  config.vm.provision :shell, :inline => provision_script
  config.vm.provider :aws do |aws, override|
 
    #AWS Settings
    aws.access_key_id = "yourkey"
    aws.secret_access_key = "yoursecret"
    aws.region = "us-west-2"
 
    aws.tags = {
      'Name' => 'Try-2-Learn',
      'Team' => 'Try-2-Learn',
      'Status' => 'active'
    }
 
    #Override Settings
    override.ssh.username = "ubuntu"
    override.ssh.private_key_path = "./try-2-learn.pem"
 
    aws.region_config "us-west-2" do |region|
      region.ami = 'ami-35143705'
      region.instance_type = 't2.micro'
      region.keypair_name = "try-2-learn"
      region.security_groups = "launch-wizard-3"
    end
 
  end
 
end
