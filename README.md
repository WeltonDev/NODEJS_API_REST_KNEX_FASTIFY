
<h1 align="center">API REST com NodeJs, Fastify e Knex 🚀👨‍💻</h1><hr>
<h4 align="center"><i>Segundo Projeto da trilha ignite da Rocketseat, onde desenvolvi uma API REST utilizando Fastify, Knex, Typescript e outras ferramentas para auxiliar durante o desenvolvimento.</i></h4>

<h2>Sobre</h2>
A idéia do projeto é criar uma API onde é possivel criar transações bancárias, na qual enviamos as seguinte informações: <i>title, amount, e type</i> que pode ser <i>credit</i> ou <i>debit.</i>

<h2>Rotas</h2>
<ul>
Realizar uma nova transação.
<li>POST https://nodejs-api-rest-knex-fastify.onrender.com - Aqui será possível cadastrar uma nova transação.</li><br>
<p>"title": "Freelancer"</li><br>"amount": 5000<br>"type": "credit"</li></p>

Listar todas transações.
<li>GET https://nodejs-api-rest-knex-fastify.onrender.com - Aqui será possível visualizar todas as transações realizadas.</li><br>

Listar uma transação especifíca.
<li>GET https://nodejs-api-rest-knex-fastify.onrender.com/:id - Aqui será possível visualizar uma transação especifíca através de seu id.</li><br>

Saldo atual das transações
<li>GET https://nodejs-api-rest-knex-fastify.onrender.com/summary - Aqui será possível visualizar o saldo atual das transações realizadas.</li><br>


