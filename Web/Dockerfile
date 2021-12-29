FROM cypress/base

WORKDIR /app

COPY . .

RUN npm install

RUN apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb   
RUN npm install
RUN npm install cypress@9.0.0 --save-dev


CMD ["npm", "run", "test"]
