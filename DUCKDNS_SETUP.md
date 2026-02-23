# 🦆 DuckDNS + Cloudflare Tunnel - Guia Completo

URL fixa e gratuita para seu Supabase local.

---

## 📋 Etapa 1: Criar conta no DuckDNS

1. Acesse: https://www.duckdns.org
2. Faça login com:
   - Google
   - GitHub  
   - Twitter
   - Reddit
   - ou outra opção

3. Escolha um subdomínio (ex: `comprasbtv`)
4. Seu domínio será: `comprasbtv.duckdns.org`
5. Anote o **Token** de atualização (vai precisar depois)

---

## 🖥️ Etapa 2: Atualizar IP no DuckDNS (Windows)

Como você usa VPN (Radmin), o IP é fixo da VPN: `26.136.21.0`

### Opção A: Atualizar manualmente (mais fácil)
1. Entre em https://www.duckdns.org
2. No campo **current ip**, coloque: `26.136.21.0`
3. Clique em **update ip**
4. Pronto! Seu domínio aponta para o IP da VPN

### Opção B: Atualizar automaticamente (script)
Crie um arquivo `atualizar-duckdns.bat`:
```batch
@echo off
curl "https://www.duckdns.org/update?domains=SEU_SUBDOMINIO&token=SEU_TOKEN&ip=26.136.21.0"
echo IP atualizado!
pause
```

**Substitua:**
- `SEU_SUBDOMINIO` → seu nome (ex: comprasbtv)
- `SEU_TOKEN` → token do DuckDNS

---

## 🔧 Etapa 3: Configurar Cloudflare Tunnel

Agora vamos conectar o DuckDNS ao seu Supabase local.

### 3.1 - Criar conta Cloudflare
1. Acesse: https://dash.cloudflare.com/sign-up
2. Use o mesmo e-mail do DuckDNS (facilita)
3. Quando pedir para adicionar domínio, escolha: **Add Site**
4. Digite: `SEU_SUBDOMINIO.duckdns.org` (ex: comprasbtv.duckdns.org)
5. Escolha o plano **FREE**
6. Continue (não precisa alterar DNS agora)

### 3.2 - Instalar cloudflared (no PC servidor)
```powershell
# Baixar
Invoke-WebRequest -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" -OutFile "cloudflared.exe"

# Mover para pasta de sistema
Move-Item cloudflared.exe C:\Windows\System32\cloudflared.exe

# Testar
cloudflared --version
```

### 3.3 - Autenticar
```powershell
cloudflared tunnel login
```
- Vai abrir o navegador
- Faça login
- Selecione seu domínio DuckDNS
- Clique em **Authorize**

### 3.4 - Criar o Tunnel
```powershell
cloudflared tunnel create supabase-boituva
```
- Anote o **UUID** que aparece (ex: `12345abc-678d-90ef-ghij-klmnopqrstuv`)
- Anote o caminho do arquivo JSON de credenciais

### 3.5 - Configurar arquivo de configuração

Crie a pasta e arquivo:
```powershell
mkdir "$env:USERPROFILE\.cloudflared" -Force
notepad "$env:USERPROFILE\.cloudflared\config.yml"
```

**Conteúdo do config.yml:**
```yaml
tunnel: SEU_UUID_AQUI
credentials-file: C:\Users\SEU_USUARIO\.cloudflared\SEU_UUID_AQUI.json

ingress:
  - hostname: SEU_SUBDOMINIO.duckdns.org
    service: http://localhost:54321
    originRequest:
      noTLSVerify: true
  - service: http_status:404
```

**Substitua:**
- `SEU_UUID_AQUI` → UUID do passo anterior
- `SEU_USUARIO` → seu usuário Windows
- `SEU_SUBDOMINIO` → seu nome no DuckDNS

### 3.6 - Configurar DNS no Cloudflare
```powershell
cloudflared tunnel route dns supabase-boituva SEU_SUBDOMINIO.duckdns.org
```

### 3.7 - Iniciar o Tunnel
```powershell
cloudflared tunnel run supabase-boituva
```

Se aparecer `Connected`, está funcionando! 🎉

---

## ✅ Etapa 4: Testar

Abra no navegador:
```
https://SEU_SUBDOMINIO.duckdns.org
```

Deve mostrar a tela do Supabase!

---

## ⚙️ Etapa 5: Rodar como Serviço Windows

Para iniciar automaticamente:

```powershell
# Instalar serviço
cloudflared service install

# Iniciar
net start cloudflared

# Verificar
sc query cloudflared
```

---

## 🚀 Etapa 6: Configurar Vercel

Vá no Vercel Dashboard → Settings → Environment Variables:

| Nome | Valor |
|------|-------|
| `SUPABASE_URL` | `https://SEU_SUBDOMINIO.duckdns.org` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

Clique em **Save** e faça **Redeploy**.

---

## 🎉 Pronto!

Agora seu painel está em:
```
https://seu-projeto-vercel.vercel.app
```

E acessa o Supabase via:
```
https://SEU_SUBDOMINIO.duckdns.org
```

---

## 🛠️ Comandos Úteis

```powershell
# Ver status do tunnel
cloudflared tunnel info supabase-boituva

# Ver logs
cloudflared tunnel tail supabase-boituva

# Parar serviço
net stop cloudflared

# Reiniciar serviço
net stop cloudflared && net start cloudflared

# Deletar tunnel (se precisar recriar)
cloudflared tunnel delete supabase-boituva
```

---

## ⚠️ Importante

1. **Mantenha o DuckDNS atualizado**: Se seu IP da VPN mudar, atualize no DuckDNS
2. **Radmin VPN sempre ligado**: O tunnel depende da VPN estar ativa
3. **PC servidor ligado**: O Supabase e o tunnel precisam estar rodando

---

## 🆘 Problemas comuns

### "Failed to connect"
Verifique se o Radmin VPN está conectado.

### "Bad Request" ou erro 400
Tente adicionar no config.yml:
```yaml
ingress:
  - hostname: SEU_SUBDOMINIO.duckdns.org
    service: http://localhost:54321
    originRequest:
      httpHostHeader: localhost
```

### Tunnel não aparece
Verifique o UUID e o caminho do arquivo JSON.

---

## 📞 Ajuda

- DuckDNS: https://www.duckdns.org/spec.jsp
- Cloudflare Tunnel: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
