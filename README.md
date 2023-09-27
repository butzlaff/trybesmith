<details>
  <summary><strong>🐳 Especificações sobre uso do Docker</strong></summary>

> Rode os serviços `app-trybesmith` e `db` com o comando `docker-compose up -d --build`.

- Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
- Esses serviços irão inicializar um container chamado `trybesmith_api` e outro chamado `trybesmith_db`.
- A partir daqui você pode rodar o container `trybesmith_api` via CLI ou abri-lo no VS Code.

  > Rode o comando `npm run db:reset` (este comando vai funcionar somente após a criação do tipos solicitados no requisito) para criar o banco de dados, as tabelas que serão utilizadas e populá-las.

  > Use o comando `docker exec -it trybesmith_api bash` para entrar no container.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

- Para visualizar o logs do nodemon em seu terminal use os seguintes comandos:

  > `docker ps`: para visualizar os containers ativos e pegar o `CONTAINER ID`;

  > `docker logs -f <id_do_container>`: para visualizar os logs do seu servidor com nodemon;

</details>
