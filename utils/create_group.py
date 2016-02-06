import boto
import boto.ec2
from sys import argv
name = raw_input('Name for the group?')
description = raw_input('Description for de group?')
vpc = raw_input('Wich vpc_id? (example vpc-65da7a00)')
connection = boto.ec2.connect_to_region('us-west-2') 
create = connection.create_security_group(name, description, vpc)
create.authorize('tcp',80,80,'0.0.0.0/0')
create.authorize('tcp',22,22,'0.0.0.0/0')
print create, create.id, create.name
print 'Enabled tcp 22,80 ports'
