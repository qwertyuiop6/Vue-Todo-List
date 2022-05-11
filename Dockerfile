FROM node
WORKDIR /usr/app

COPY . .

#FE
RUN npm i -g pnpm
RUN pnpm i --registry=https://registry.npm.taobao.org 
RUN pnpm build

#BE
RUN cd server \
    && pnpm i --registry=https://registry.npm.taobao.org \
    && npx prisma generate

# ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todos?schema=public
# RUN npx prisma introspect&&npx prisma generate

COPY ./docker/wait-for-it.sh /usr/local/bin/wait-it
RUN chmod +x /usr/local/bin/wait-it

# RUN
EXPOSE 8000
CMD wait-it postgres:5432 -- pnpm start:server