FROM node:10.13-alpine
ENV NODE_ENV production
ENV PORT 3000
ENV CS_ENDPOINT $CS_ENDPOINT
ENV CS_NAME $CS_NAME
ENV CS_PROFILE $CS_PROFILE

WORKDIR /app
COPY package.json /app
RUN npm install
COPY dist /app/dist
CMD ["npm", "start"]
EXPOSE 3000
