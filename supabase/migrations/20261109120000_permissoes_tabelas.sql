-- Projetos novos do Supabase (desde maio/2026) não dão mais permissão automática
-- nas tabelas. Sem isto, os scripts com a chave secreta (criar-admin, backup)
-- recebem "permission denied". O site e o admin não leem tabelas: só chamam funções.
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;
-- Leitura direta pelo admin logado (as regras admin_le já limitam a quem está em admins)
grant select on all tables in schema public to authenticated;
