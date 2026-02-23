# ComprasGov · Boituva

Sistema de gestão de licitações e compras públicas desenvolvido para a Prefeitura de Boituva/SP.

## 🚀 Funcionalidades

- **Dashboard** - Visão geral com métricas, pipeline de processos e prazos críticos
- **Processos** - Cadastro e acompanhamento de processos administrativos
- **Pesquisa de Preços** - Lançamento de cotações com cálculo automático de estatísticas
- **Fiscalização** - Checklists de controle por processo
- **Prazos & Alertas** - Contagem regressiva com alertas visuais

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Schema do banco de dados já criado no Supabase
- Navegador moderno (Chrome, Firefox, Edge)

## ⚙️ Configuração

### 1. Clone ou baixe o projeto

```bash
git clone <repositório>
cd comprasgov-boituva
```

### 2. Configure as credenciais do Supabase

Copie o arquivo de exemplo:

```bash
cp js/config.example.js js/config.js
```

Edite o arquivo `js/config.js` e substitua pelas suas credenciais:

```javascript
const SUPABASE_CONFIG = {
  URL: 'https://seu-projeto.supabase.co',
  ANON_KEY: 'sua-anon-key-aqui'
};
```

> **Onde encontrar:** Supabase Dashboard → Settings → API → Project URL e anon/public key

### 3. Abra o aplicativo

Simplesmente abra o arquivo `index.html` em seu navegador:

```bash
# No Windows
start index.html

# No macOS
open index.html

# No Linux
xdg-open index.html
```

Ou use um servidor local para desenvolvimento:

```bash
# Python 3
python -m http.server 8000

# Node.js (com npx)
npx serve .

# PHP
php -S localhost:8000
```

## 🗄️ Estrutura do Projeto

```
├── index.html              # Aplicação principal
├── js/
│   ├── config.js          # Credenciais Supabase (não versionar!)
│   └── config.example.js  # Template de configuração
├── css/                   # (futuro: estilos separados)
├── .gitignore            # Arquivos ignorados pelo Git
└── README.md             # Este arquivo
```

## 🛡️ Segurança

- O arquivo `js/config.js` contém credenciais sensíveis e está listado no `.gitignore`
- **NUNCA** commite este arquivo no repositório público
- Para deploy em produção, considere usar variáveis de ambiente

## 📊 Schema do Supabase

O sistema espera as seguintes tabelas:

- `processos` - Dados dos processos administrativos
- `cotacoes` - Cotações de preços por item
- `prazos` - Prazos críticos vinculados a processos
- `checklist_fiscalizacao` - Itens de controle fiscal
- `historico` - Histórico de alterações de fase

> ⚠️ O schema já deve estar criado no seu projeto Supabase.

## 📝 Roadmap

- [ ] Exportar relatórios PDF
- [ ] Gráficos e dashboards avançados
- [ ] Notificações em tempo real
- [ ] Autenticação de usuários
- [ ] Upload de documentos

## 📄 Licença

Sistema desenvolvido para uso exclusivo da Prefeitura de Boituva/SP.

---

**Lei 14.133/2021 | Decreto 2979/2024**
