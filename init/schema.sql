SET client_encoding = 'LATIN1';

-- 1. Cria uma tabela com uma coluna só que aceita a linha inteira
CREATE TABLE import_bruto (
    linha TEXT
);

-- 2. Importa o arquivo sem considerar vírgulas como separador (usamos um caractere que não existe no texto)
COPY import_bruto FROM '/megasena.csv' WITH (FORMAT text);

-- 3. Cria a tabela oficial
CREATE TABLE resultados (
    concurso INT,
    data_sorteio DATE,
    bola1 INT,
    bola2 INT,
    bola3 INT,
    bola4 INT,
    bola5 INT,
    bola6 INT
);

-- 4. Agora sim, quebramos a linha e pegamos só o que importa
INSERT INTO resultados
SELECT 
    split_part(linha, ',', 1)::INT,
    to_date(split_part(linha, ',', 2), 'DD/MM/YYYY'),
    split_part(linha, ',', 3)::INT,
    split_part(linha, ',', 4)::INT,
    split_part(linha, ',', 5)::INT,
    split_part(linha, ',', 6)::INT,
    split_part(linha, ',', 7)::INT,
    split_part(linha, ',', 8)::INT
FROM import_bruto
WHERE linha ~ '^[0-9]' -- Garante que só pega linhas que começam com número (pula o cabeçalho)
LIMIT 5000; -- Limite de segurança

-- 5. Limpa a sujeira
DROP TABLE import_bruto;