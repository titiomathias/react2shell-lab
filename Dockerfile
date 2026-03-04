FROM node:20-alpine AS builder

WORKDIR /app

COPY aplication/package*.json ./
RUN npm install

COPY aplication/ .
RUN npm run build

FROM node:20-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app ./

RUN chown -R appuser:appgroup /app

RUN chmod -R 555 /app

USER appuser

EXPOSE 8080

CMD ["npx", "next", "start", "-p", "8080"]