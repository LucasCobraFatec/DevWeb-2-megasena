SET client_encoding = 'LATIN1';

-- 1. Cria uma tabela com uma coluna só que aceita a linha inteira
CREATE TABLE import_bruto (
    linha TEXT
);

-- 2. Importa o arquivo sem considerar vírgulas como separador (usamos um caractere que não existe no texto)
COPY import_bruto FROM '/megasena.csv' WITH (FORMAT text);

-- 3. Tabela oficial sem a estimativa
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

-- 4. Inserção com limpeza de espaços (TRIM) para evitar erros de conversão
INSERT INTO resultados
SELECT 
    trim(split_part(linha, ',', 1))::INT,
    to_date(trim(split_part(linha, ',', 2)), 'DD/MM/YYYY'),
    trim(split_part(linha, ',', 3))::INT,
    trim(split_part(linha, ',', 4))::INT,
    trim(split_part(linha, ',', 5))::INT,
    trim(split_part(linha, ',', 6))::INT,
    trim(split_part(linha, ',', 7))::INT,
    trim(split_part(linha, ',', 8))::INT
FROM import_bruto
WHERE linha ~ '^[0-9]'
LIMIT 5000;

-- 5. Limpa a sujeira
DROP TABLE import_bruto;