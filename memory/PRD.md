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
- ✅ Ponto verde piscante em aula ao vivo
- ✅ Header sticky com nav, Instagram, CTA Aula Experimental
- ✅ Footer com logo secundária do cliente
- ✅ Botão flutuante WhatsApp
- ✅ Google Maps incorporado
- ✅ Fotos reais do CT Winner integradas
- ✅ Testes passando 100% (backend + frontend)

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
