# 🌐 Cloudflare Tunnel - Guia Completo

Exponha seu Supabase local para a internet com URL fixa e gratuita.

---

## 📋 Pré-requisitos

- Conta gratuita em [cloudflare.com](https://cloudflare.com)
- Um domínio (pode ser subdomínio gratuito: `seudominio.workers.dev`)
- Acesso ao computador onde roda o Supabase (26.136.21.0)

---

## 🔧 Passo 1: Instalar cloudflared

No computador servidor (onde roda o Supabase na VPN):

### Windows (PowerShell como Admin):
```powershell
# Baixar
Invoke-WebRequest -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" -OutFile "cloudflared.exe"

# Mover para pasta de sistema
Move-Item cloudflared.exe C:\Windows\System32\cloudflared.exe

# Verificar instalação
cloudflared --version
```

### Linux/macOS:
```bash
# Linux
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# macOS
brew install cloudflared
```

---

## 🔐 Passo 2: Autenticar

```powershell
cloudflared tunnel login
```

- Abre o navegador
- Faça login na Cloudflare
- Selecione o domínio que quer usar
- Copie o arquivo de credenciais

---

## 🚇 Passo 3: Criar o Tunnel

```powershell
# Criar tunnel (nome: supabase-boituva)
cloudflared tunnel create supabase-boituva

# Anote o UUID gerado (ex: 12345abc-678d-90ef-ghij-klmnopqrstuv)
```

---

## ⚙️ Passo 4: Configurar o Tunnel

Crie/editar o arquivo de configuração:

### Windows:
```powershell
mkdir "$env:USERPROFILE\.cloudflared" -Force
notepad "$env:USERPROFILE\.cloudflared\config.yml"
```

### Conteúdo do config.yml:
```yaml
tunnel: SEU_UUID_AQUI
credentials-file: C:\Users\SEU_USUARIO\.cloudflared\SEU_UUID_AQUI.json

ingress:
  - hostname: supabase-boituva.SEUDOMINIO.com
    service: http://localhost:54321
  - service: http_status:404
```

**Substitua:**
- `SEU_UUID_AQUI` → UUID do passo 3
- `SEU_USUARIO` → seu usuário Windows
- `SEUDOMINIO.com` → seu domínio na Cloudflare

---

## 🌐 Passo 5: Configurar DNS

```powershell
cloudflared tunnel route dns supabase-boituva supabase-boituva.SEUDOMINIO.com
```

---

## ▶️ Passo 6: Iniciar o Tunnel

```powershell
cloudflared tunnel run supabase-boituva
```

Se tudo funcionar, seu Supabase está acessível em:
```
https://supabase-boituva.SEUDOMINIO.com
```

---

## 🔄 Passo 7: Rodar como Serviço (Windows)

Para iniciar automaticamente com o Windows:

```powershell
# Instalar serviço
cloudflared service install

# Iniciar serviço
net start cloudflared

# Verificar status
sc query cloudflared
```

---

## ✅ Passo 8: Configurar no Vercel

Vá em **Vercel Dashboard** → Seu projeto → **Settings** → **Environment Variables**:

| Nome | Valor |
|------|-------|
| `SUPABASE_URL` | `https://supabase-boituva.SEUDOMINIO.com` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (mesma de antes) |

**Re-deploy** o projeto no Vercel.

---

## 🧪 Teste

Acesse no navegador:
```
https://supabase-boituva.SEUDOMINIO.com
```

Deve mostrar a tela do Supabase!

---

## 🛠️ Comandos Úteis

```powershell
# Ver logs
cloudflared tunnel tail supabase-boituva

# Listar tunnels
cloudflared tunnel list

# Parar serviço
net stop cloudflared

# Desinstalar serviço
cloudflared service uninstall

# Deletar tunnel
cloudflared tunnel delete supabase-boituva
```

---

## ⚠️ Segurança

- O tunnel usa TLS/HTTPS automaticamente
- Apenas as rotas configuradas são expostas
- Recomendado: configure autenticação no Supabase

---

## 📞 Precisa de ajuda?

Documentação oficial: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
