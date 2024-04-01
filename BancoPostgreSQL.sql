CREATE DOMAIN DESC100 VARCHAR(100);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Parceiros (
	parceiro_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_nome DESC100 NOT NULL,
	parceiro_email DESC100 NOT NULL,
	parceiro_cnpj_cpf VARCHAR(18) NOT NULL,
	parceiro_telefone DESC100 NOT NULL,
	parceiro_expertises DESC100 NOT NULL,
	parceiro_logradouro DESC100 NOT NULL,
	parceiro_logradouro_numero DESC100 NOT NULL,
	parceiro_bairro DESC100 NOT NULL,
	parceiro_cep DESC100 NOT NULL,
	parceiro_cidade DESC100 NOT NULL,
	parceiro_estado DESC100 NOT NULL,
	parceiro_pais DESC100 NOT NULL,
	parceiro_senha DESC100 NOT NULL
);

CREATE TABLE Administradores(
	administrador_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	administrador_nome DESC100 NOT NULL,
	administrador_email DESC100 NOT NULL,
	administrador_senha DESC100 NOT NULL,
	administrador_nivel_acesso CHAR(1) CHECK (administrador_nivel_acesso IN ('A', 'B', 'C', 'D')) NOT NULL
);

CREATE TABLE Cursos(
	curso_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	curso_nome DESC100 NOT NULL,
	curso_expertise DESC100 NOT NULL
);

CREATE TABLE Provas(
	prova_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	prova_nome DESC100 NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);

CREATE TABLE Atividades(
	atividade_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	atividade_nome DESC100 NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);

CREATE TABLE Bonificacoes(
	bonificacao_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	bonificacao_nome DESC100 NOT NULL
);

CREATE TABLE ConteudosProva(
	conteudo_prova_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	conteudo_prova_nome DESC100 NOT NULL,
	id_prova UUID NULL,
	FOREIGN KEY (id_prova) REFERENCES Provas(prova_id)
);

CREATE TABLE ConteudosCurso(
	conteudo_curso_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	conteudo_curso_nome DESC100 NOT NULL,
	id_curso UUID NULL,
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);

CREATE TABLE ConteudosAtividades(
	conteudo_atividade_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	conteudo_atividade_nome DESC100 NOT NULL,
	id_atividade UUID NOT NULL,
	FOREIGN KEY (id_atividade) REFERENCES Atividades(atividade_id)
);

CREATE TABLE ParceirosProvas (
	parceiro_prova_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_prova_progressao DESC100 NULL,
	parceiro_prova_nota DESC100 NOT NULL,
	id_prova UUID NOT NULL,
	id_parceiro UUID NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_prova) REFERENCES Provas(prova_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);

CREATE TABLE ParceirosAtividades (
	parceiro_atividade_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_atividade_progressao DESC100 NULL,
	parceiro_atividade_nota DESC100 NOT NULL,
	id_atividade UUID NOT NULL,
	id_parceiro UUID NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_atividade) REFERENCES Atividades(atividade_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);

CREATE TABLE ParceirosCursos (
	parceiro_curso_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_curso_progressao DESC100 NULL,
	parceiro_curso_nota DESC100 NOT NULL,
	id_curso UUID NOT NULL,
	id_parceiro UUID NOT NULL,
	id_bonificacao UUID NULL,
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_bonificacao) REFERENCES Bonificacoes(bonificacao_id)
);

CREATE TABLE AcoesAdministrativas (
	acao_administrativa_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	acao_administrativa_tipo DESC100 NOT NULL,
	id_administrador UUID NOT NULL,
	id_parceiro UUID NULL,
	id_prova UUID NULL,
	id_curso UUID NULL,
	id_atividade UUID NULL,
	id_bonificacao UUID NULL,
	id_conteudo_curso UUID NULL,
	id_conteudo_prova UUID NULL,
	id_conteudo_atividade UUID NULL,
	FOREIGN KEY (id_administrador) REFERENCES Administradores (administrador_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_prova) REFERENCES Provas(prova_id),
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id),
	FOREIGN KEY (id_atividade) REFERENCES Atividades(atividade_id),
	FOREIGN KEY (id_bonificacao) REFERENCES Bonificacoes(bonificacao_id),
	FOREIGN KEY (id_conteudo_curso) REFERENCES ConteudosCurso(conteudo_curso_id),
	FOREIGN KEY (id_conteudo_prova) REFERENCES ConteudosProva(conteudo_prova_id),
	FOREIGN KEY (id_conteudo_atividade) REFERENCES ConteudosAtividades(conteudo_atividade_id)
);