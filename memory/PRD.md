# CT Winner — Product Requirements Document

## Problema Original
"Construa pra mim esse site" — projeto extensionista para o **Centro de Treinamento Winner** (CT Winner), academia de artes marciais, balé, teatro e eventos localizada em R. Lopes da Cruz, 61 — Méier, Rio de Janeiro.

## Missão Social
Inclusão, saúde, educação e desenvolvimento social. Combate à visão estereotipada das artes marciais como violência, promovendo um hub comunitário acolhedor para crianças, mulheres e iniciantes.

## Personas
- **Pais** procurando atividades para filhos (taekwondo infantil, balé, teatro)
- **Adultos iniciantes** que querem experimentar artes marciais sem intimidação
- **Alunos atuais** consultando horários e próximos eventos
- **Admin/Proprietário (Carlos Wagner)** atualizando grade, eventos e modalidades

## Core Requirements
- Home com banner "Lugar especial para pessoas especiais" + CTA WhatsApp
- Página de Atividades com todas as modalidades (Taekwondo, Jiu-Jitsu, Muay-Thai, Boxe, Judô, Karatê, Teatro, Balé)
- Grade de Horários com ponto verde piscante na aula acontecendo agora (fuso Brasília)
- Próximos Eventos com data/descrição
- Sobre (valores, timeline, espaço)
- Local/Contato (mapa, WhatsApp, Instagram)
- Painel admin com CRUD para horários, eventos, modalidades
- Paleta: azul cobalto, vermelho energético, branco
- Fonts: Bebas Neue + Outfit

## Arquitetura
- **Backend:** FastAPI + MongoDB + JWT Bearer auth
- **Frontend:** React 19 + React Router + Tailwind + lucide-react
- **Seed:** admin único + 8 modalidades + 16 horários + 3 eventos ao startup

## Implementado (Jan 2026)
- ✅ Backend FastAPI com endpoints públicos (GET modalities/schedule/events) e protegidos (POST/PUT/DELETE via Bearer JWT)
- ✅ Endpoint `/api/schedule/current` com timezone Brasília
- ✅ Admin seeding de admin@ctwinner.com
- ✅ 7 páginas públicas + admin login + admin dashboard
- ✅ Ponto verde piscante apenas quando há aula ao vivo (fuso de Brasília)
- ✅ Header sticky com logo oficial do CT Winner (triângulo + punho + texto)
- ✅ Footer com logo secundária (fundo transparente via PNG processado)
- ✅ Botão flutuante WhatsApp
- ✅ Google Maps incorporado
- ✅ Fotos reais do CT Winner integradas
- ✅ Testes passando 100% (backend + frontend)

## Atualizações (iteração 4 - Abr 2026)
- ✅ Grade de horários completamente refeita com detalhe de turmas Kids / Adulto:
  - **Taekwondo** (Mestre Carlos Wagner): Seg/Qua/Sex Kids 18h-19h + Adulto 19h-20h; Ter/Qui Todos 17h-18h + Adulto 21h-22h
  - **Jiu-Jitsu**: Seg/Qua Kids (Leonardo) 19h + Adulto (Bruno Souza) 20h-21h; Sex Adulto 20h-21h
  - **Karatê Adulto** (Eduardo Vieira): Seg/Qua 20h-21h
  - **Teatro Kids** (Girassol Music): Sex 18h-19h
  - **Judô** (Diego Correia): Ter/Qui Kids 18h-19h + Adulto 20h-21h
  - **Boxe** (Breno Constantino): Ter/Qui 21h-22h
  - **Muay-Thai** (Wallace Conceição): Ter/Qui 20h-21h
- ✅ 26 slots no total (antes eram 19)
- ✅ Novas imagens adicionadas à galeria "O CT em imagens":
  - Bandeira oficial Equipe Winner — Mestre Carlos Wagner (com medalha + troféu)
  - 31 atletas classificados para o Campeonato Brasileiro (28 ouro, 3 prata, 5 bronze)

## Atualizações (iteração 3 - Abr 2026)
- ✅ Copa Winner: data **24 de maio de 2026**, local **R. Dias da Cruz, 561 — Méier · Sport Club Mackenzie**
- ✅ Cartaz oficial da Copa Winner integrado na página Eventos (imagem grande + CTA "Quero participar")
- ✅ Modelo de evento ganhou campo `image_url` (CRUD admin também atualizado)
- ✅ Nova seção **"Títulos & Momentos — O CT em imagens"** na página Sobre, com galeria mosaico:
  - Equipe CT Winner (imagem principal grande)
  - Atletas formados · Faixas-pretas
  - Competições (títulos)
  - Combate infantil em torneio
  - Sala principal
- ✅ Seção "Nosso Espaço" agora usa a foto da equipe em destaque
- ✅ Home: card do evento Copa Winner mostra o cartaz como thumbnail

## Atualizações (iteração 2 - Abr 2026)
- ✅ Home mais compacto (menos scroll): `py-24` → `py-14/16`, valores integrados
- ✅ Vermelho mais intenso: `#E63946` → `#E10600`
- ✅ Logo oficial no header (WINNER com triângulo/punho/texto) via PNG processado
- ✅ Logo secundária no footer sem fundo branco (PNG com transparência)
- ✅ Data de fundação: 2018 (8 anos de CT no Méier)
- ✅ Ponto verde piscante apenas em horários de aula real
- ✅ Dia corretamente calculado no fuso de Brasília via `Intl.DateTimeFormat`
- ✅ Grade de horários atualizada (sem sábado/domingo):
  - Seg/Qua/Sex: Jiu-Jitsu Kids (Leonardo), Taekwondo (Carlos Wagner), Muay-Thai (Wallace Conceição), Jiu-Jitsu (Bruno Souza)
  - Ter/Qui: Karatê (Eduardo Vieira), Boxe (Breno Constantino), Judô (Diego Correia)
  - Ter: Teatro (Girassol Music)
- ✅ Taekwondo 19h–20h (não mais 7h)
- ✅ Jiu-Jitsu Kids adicionado como modalidade
- ✅ Balé removido (sem professor designado)
- ✅ Único evento: Copa Winner — Torneio de Taekwondo que reúne grandes equipes do RJ
- ✅ Footer funcionamento: Seg–Sex até 22h30 / Sábado e Domingo fechado
- ✅ Timeline removida da página Sobre
- ✅ Copyright atualizado para "Desde 2018"

## Backlog / Futuro
- **P1:** Galeria de fotos/vídeos com upload via admin
- **P1:** Página de perfis de professores
- **P2:** Página de depoimentos/histórias de alunos
- **P2:** Feed do Instagram embutido (requer API token)
- **P2:** Formulário de contato com envio por email
- **P2:** Countdown para próximo evento na home
- **P3:** Área de aluno com pagamentos/mensalidades (Stripe)
- **P3:** Rate-limiting/brute-force no login admin

## Credenciais
Ver `/app/memory/test_credentials.md`
