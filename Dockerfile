FROM jpetazzo/dind
RUN cd /home/ && git clone https://github.com/jesusgn90/Try-2-Learn
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN echo 'alias node="nodejs"' >> ~/.bashrc
RUN source ~/.bashrc
RUN cd /home/Try-2-Learn && npm install


