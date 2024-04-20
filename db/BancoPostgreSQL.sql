CREATE DOMAIN DESC100 VARCHAR(100);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Parceiros (
	parceiro_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_nome DESC100 NOT NULL,
	parceiro_email DESC100 NOT NULL,
	parceiro_cnpj_cpf VARCHAR(18) NOT NULL,
	parceiro_telefone DESC100 NOT NULL,
	parceiro_logradouro DESC100 NOT NULL,
	parceiro_logradouro_numero DESC100 NOT NULL,
	parceiro_bairro DESC100 NOT NULL,
	parceiro_cep DESC100 NOT NULL,
	parceiro_cidade DESC100 NOT NULL,
	parceiro_estado DESC100 NOT NULL,
	parceiro_status BOOLEAN NOT NULL DEFAULT TRUE,
	parceiro_senha DESC100 NOT NULL
);

CREATE TABLE Administradores(
	administrador_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	administrador_nome DESC100 NOT NULL,
	administrador_email DESC100 NOT NULL,
	administrador_senha DESC100 NOT NULL,
	administrador_matricula DESC100 NOT NULL,
	administrador_funcao DESC100 NOT NULL,
	administrador_status BOOLEAN NOT NULL DEFAULT TRUE
	administrador_setor CHAR(1) CHECK (administrador_setor IN ('A', 'B', 'C', 'D')) NOT NULL
);

CREATE TABLE ConsultorAlianca(
	consultor_alianca_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	consultor_alianca_nome DESC100 NOT NULL,
	consultor_alianca_cpf DESC100 NOT NULL,
	consultor_alianca_email DESC100 NOT NULL,
	consultor_alianca_senha DESC100 NOT NULL,
	consultor_alianca_status BOOLEAN NOT NULL DEFAULT TRUE
);

-- tabelas sugeridas para sprint 1 (depois sera adicionado mais niveis de qualificao)

CREATE TABLE Trilhas(
	trilha_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	trilha_nome DESC100 NOT NULL
);

CREATE TABLE Especializacoes(
	especializacao_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	especializacao_grupo DESC100 NOT NULL,
	especializacao_subgrupo DESC100,
	especializacao_nome DESC100 NOT NULL,
	id_trilha UUID NOT NULL,
	FOREIGN KEY (id_trilha) REFERENCES Trilhas(trilha_id)
);

CREATE TABLE ParceiroEspecializacao(
	par_esp_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	par_esp_concluido BOOLEAN DEFAULT FALSE NOT NULL,
	id_parceiro UUID NOT NULL,
	id_especializacao UUID NOT NULL,
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_especializacao) REFERENCES Especializacoes(especializacao_id)
);

CREATE TABLE AcoesAdministrativas (
	acao_administrativa_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	acao_administrativa_tipo DESC100 NOT NULL,
	id_administrador UUID NOT NULL,
	id_parceiro UUID NULL,
	id_trilha UUID NULL,
	id_especializacao UUID NULL,
	id_par_esp UUID NULL,
	FOREIGN KEY (id_administrador) REFERENCES Administradores (administrador_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_trilha) REFERENCES Trilhas(trilha_id),
	FOREIGN KEY (id_especializacao) REFERENCES Especializacoes(especializacao_id),
	FOREIGN KEY (id_par_esp) REFERENCES ParceiroEspecializacao(par_esp_id)
);

--ESPECIALIZACOES DA TRILHA CLOUD BUILD
INSERT INTO Especializacoes(especializacao_grupo, especializacao_subgrupo, especializacao_nome, id_trilha) 
VALUES
('Powered by', '', 'Powered by Oracle Cloud', 'b6908746-e800-4e14-818c-1940a9f737b4'),
('Powered by', '', 'Powered by Oracle Autonomous Database Cloud', 'b6908746-e800-4e14-818c-1940a9f737b4'),
('Powered by', '', 'Powered by Oracle Exadata Cloud', 'b6908746-e800-4e14-818c-1940a9f737b4'),
('Powered by', '', 'Powered by Oracle MySQL Database Cloud', 'b6908746-e800-4e14-818c-1940a9f737b4'),
('Integrated with', '', 'Integrated with Oracle Hospitality OPERA Cloud', 'b6908746-e800-4e14-818c-1940a9f737b4'),
('Integrated with', '', 'Integrated with Oracle Cloud', 'b6908746-e800-4e14-818c-1940a9f737b4'),
('Integrated with', '', 'Integrated with Oracle Talent Management Cloud', 'b6908746-e800-4e14-818c-1940a9f737b4'),
('Integrated with', '', 'Integrated with Oracle Cloud Infrastructure FastConnect', 'b6908746-e800-4e14-818c-1940a9f737b4'),
('Integrated with', '', 'Integrated with Oracle Simphony Cloud', 'b6908746-e800-4e14-818c-1940a9f737b4');

--ESPECIALIZACOES DA TRILHA CLOUD SELL
INSERT INTO Especializacoes(especializacao_grupo, especializacao_subgrupo, especializacao_nome, id_trilha) 
VALUES
('IaaS / PaaS', '', 'Oracle Cloud Platform', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle CX CPQ Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle CX Sales Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle CX Service Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle CX Field Service Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle CX Marketing Cloud B2B', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle EPM Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle ERP Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle HCM Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('SaaS', '', 'Oracle SCM Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Comunicações', 'Oracle Live Experience Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Construção e Engenharia', 'Oracle Primavera P6 EPPM e Primavera Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Construção e Engenharia', 'Oracle Primavera Unifier Cloud','23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Alimentos e Bebidas', 'Oracle Food & Beverage', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Ciências Biológicas', 'Oracle Argus Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Ciências Biológicas', 'Oracle Health Sciences ClearTrial Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Ciências Biológicas', 'Oracle Health Sciences Empirica Cloud', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Hospitalidade para Hotéis e Resorts', 'Oracle Hospitality', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Setores', 'Serviços Públicos', 'Oracle Utilities Customer Cloud Service', '23a9b7c0-3386-4d8d-b31a-74375591bb13'),
('Outro', '', 'Oracle University Delivery', '23a9b7c0-3386-4d8d-b31a-74375591bb13');

--ESPECIALIZACOES DA TRILHA CLOUD SERVICE 
INSERT INTO Especializacoes(especializacao_grupo, especializacao_subgrupo, especializacao_nome, id_trilha) 
VALUES
('Digital Agency', '', 'Digital Agency for B2B', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Digital Agency', '', 'Digital Agency for B2C', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Customer Experience (CX)', '', 'Oracle CX Commerce Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Customer Experience (CX)', '', 'Oracle CX Field Service Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Customer Experience (CX)', '', 'Oracle CX Marketing Cloud B2B', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Customer Experience (CX)', '', 'Oracle CX Marketing Cloud B2C', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Customer Experience (CX)', '', 'Oracle CX Sales Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Customer Experience (CX)', '', 'Oracle CX Service Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Enterprise Performance Management (EPM)', '', 'Oracle EPM Enterprise Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Enterprise Performance Management (EPM)', '', 'Enterprise Data Management', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Enterprise Resource Planning (ERP)', '', 'Oracle ERP Accounting Hub Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Enterprise Resource Planning (ERP)', '', 'Oracle ERP Financials Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Enterprise Resource Planning (ERP)', '', 'Oracle ERP Project Portfolio Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Enterprise Resource Planning (ERP)', '', 'Oracle ERP Revenue Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Enterprise Resource Planning (ERP)', '', 'Oracle ERP Risk Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Human Capital Management (HCM)', '', 'Oracle HCM Global Human Resources Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Human Capital Management (HCM)', '', 'Oracle HCM Payroll Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Human Capital Management (HCM)', '', 'Oracle HCM Talent Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Human Capital Management (HCM)', '', 'Oracle HCM Workforce Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Human Capital Management (HCM)', '', 'Oracle HCM Workforce Rewards Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Supply Chain Management (SCM)', '', 'Oracle SCM Manufacturing Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Supply Chain Management (SCM)', '', 'Oracle SCM Order Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Supply Chain Management (SCM)', '', 'Oracle SCM Planning and Collaboration Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Supply Chain Management (SCM)', '', 'Oracle SCM Procurement Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Supply Chain Management (SCM)', '', 'Oracle SCM Product Lifecycle Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Supply Chain Management (SCM)', '', 'Oracle SCM Transportation and Global Trade Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Supply Chain Management (SCM)', '', 'Oracle SCM Warehouse Management Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Platform', '', 'Oracle Cloud Platform Application Development', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Platform', '', 'Oracle Cloud Platform Business Analytics', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Platform', '', 'Oracle Cloud Platform Data Management', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Platform', '', 'Oracle Cloud Platform Integration', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Platform', '', 'Oracle Cloud Platform Security', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Platform', '', 'Oracle Cloud Platform Systems Management', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Platform', '', 'Oracle Cloud Platform Content and Experience', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Aplicativos Oracle E-Business Suite para Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Aplicativos JD Edwards para Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Aplicativos PeopleSoft para Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Aplicativos Siebel para Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Aplicativos SAP para Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Aplicativos Microsoft para Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Aplicativos Infor para Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Oracle Database para Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Cloud Native Applications on Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Dev Ops on Oracle Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Oracle Cloud Infrastructure', '', 'Solução Oracle Cloud VMware', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Setores', 'Construção e Engenharia', 'Oracle Primavera P6 EPPM Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Setores', 'Construção e Engenharia', 'Oracle Primavera Unifier Cloud', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Setores', 'Varejo', 'Oracle Retail Merchandising Financial Planning Cloud Service', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Setores', 'Varejo', 'Oracle Retail Assortment and Item Planning Fashion and Softlines Cloud Service', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Setores', 'Varejo', 'Oracle Retail Merchandising Foundation Cloud Service', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Setores', 'Varejo', 'Oracle Retail Predicative Application Server Cloud Service', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73'),
('Setores', 'Serviços Públicos', 'Oracle Utilities Customer Cloud Service', 'a9235f8d-e7a1-4f17-99ab-3ac630ce6b73');

-- ESPECIALIZACOES DA TRILHA LICENCA E HARDWARE 
INSERT INTO Especializacoes(especializacao_grupo, especializacao_subgrupo, especializacao_nome, id_trilha) 
VALUES
('Build', 'Aplicativos', 'Integração Validada para Oracle JD Edwards EnterpriseOne', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Validated Integration for Oracle E-Business Suite', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Validated Integration for Oracle Financial Services', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Integração Validada para Oracle Hospitality Food & Beverage', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Validated Integration for Oracle Hospitality Hotel', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Integração Validada para Oracle Hospitality Payments', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Integração Validada para Oracle Retail', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Validated Integration for Oracle PeopleSoft', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Validated Integration for Oracle PeopleSoft Campus Solutions', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Aplicativos', 'Integração Validada para Oracle Siebel CRM', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Infraestrutura de TI', 'Oracle Solaris Development', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Exastack Ready', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Exadata Ready', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Supercluster Ready', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Exalogic Ready', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Exalytics Ready', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Database Appliance Ready', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Big Data Appliance Ready', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Private Cloud Appliance Ready', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Build', 'Sistemas Projetados', 'Oracle Exastack Optimized', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'JD Edwards EnterpriseOne', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'Oracle CRM On Demand', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'Oracle E-Business Suite', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'Oracle Hyperion', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'Oracle Master Data Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'Oracle Demantra Solutions', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'PeopleSoft', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'Siebel', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Banco de Dados', 'MySQL 8', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'Assinatura do Oracle Java SE para o Setor Público', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Sistemas Projetados', 'Oracle Exadata Database Machine', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Sistemas Projetados', 'Oracle Exalogic Elastic Cloud', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Sistemas Projetados', 'Oracle Big Data Appliance', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Sistemas Projetados', 'Oracle Private Cloud Appliance', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Sistemas Projetados', 'Oracle Zero Data Loss Recovery Appliance', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Servidores Fujitsu', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Armazenamento NAS', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle Solaris', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Sistemas Oracle x86', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Servidores SPARC Enterprise Entry-Level e Midrange Série M', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Servidores SPARC Enterprise High-End Série M', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Servidores SPARC Série M', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle SuperCluster', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Servidores SPARC Série T', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'StorageTek Tape Storage', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Servidores Sun Blade', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Servidores Oracle SPARC', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Comunicações', 'Comunicações Empresariais', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Comunicações', 'Oracle Communications Signaling, Network Session Delivery e 5G Cloud Native Core', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos de Comunicação', 'Oracle Communications Unified Communications Suite', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Construção e Engenharia', 'Oracle Primavera Unifier', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Construção e Engenharia', 'Oracle Primavera P6 EPPM', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Health Sciences', 'Aplicativos Oracle Health Information Exchange', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Health Sciences', 'Aplicativos Oracle Health Sciences Empirica', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Health Sciences', 'Aplicativos Oracle Health Sciences Life Sciences Warehouse', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Health Sciences', 'Oracle Healthcare Foundation', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Health Sciences', 'Aplicativos Oracle Argus Safety', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Health Sciences', 'Aplicativos Oracle Clinical e Oracle Remote Data Capture', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Health Sciences', 'Aplicativo Oracle Siebel Clinical Trial Management System', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Serviços Públicos', 'Oracle Utilities', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Banking Digital Experience', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Banking Platform', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Documaker', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Financial Crime and Compliance Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Financial Services Data Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Financial Services Enterprise Performance Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Financial Services Enterprise Risk Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Financial Services IFRS 17', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Financial Services IFRS Valuations', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Financial Services Lending and Leasing', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Financial Services Revenue Management and Billing', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle FLEXCUBE', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Health Insurance', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Insurance Insbridge Enterprise Rating', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Oracle Financial Services', 'Oracle Insurance Policy Administration', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Banco de Dados', 'Oracle Database', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Banco de Dados', 'Oracle Enterprise Manager', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Banco de Dados', 'MySQL', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Banco de Dados', 'Programas de Pedidos Oracle 1-Click', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Banco de Dados', 'Programa de Pedidos para Desktop Oracle 1-Click', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'Grade de Aplicativos', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'AIA (Application Integration Architecture)', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'Business Intelligence Foundation', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'Integração de Dados', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'Ferramentas de Desenvolvedor', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'Gerenciamento de Identidades', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'Oracle Endeca Information Discovery', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'SOA (Arquitetura Orientada a Serviços)', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'Gerenciamento Unificado de Processos de Negócios', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'WebCenter Content', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'WebCenter Portal', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'WebCenter Sites', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Middleware', 'WebLogic Server', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'JD Edwards World', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'Oracle Crystal Ball', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Aplicativos', 'Aplicativos Oracle Student Learning', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle Database Appliance', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle Linux Support', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle MiniCluster', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle Secure Global Desktop', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle StorageTek Tape Media', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle VM Support', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Sell', 'Infraestrutura de TI', 'Oracle VM VirtualBox', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'JD Edwards EnterpriseOne Distribution 9.2', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'JD Edwards EnterpriseOne Financial Management 9.2', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'JD Edwards EnterpriseOne Configurable Network Computing 9.2', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle Customer Hub e Oracle Data Quality', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle E-Business Suite 12.1 Financial Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle E-Business Suite 12.1 Human Capital Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle E-Business Suite R12.1 Projects', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle E-Business Suite R12.1 Supply Chain Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle GRC: Soluções Oracle Fusion GRC', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle Hyperion Data Relationship Management 11.1.2', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle Hyperion Financial Management 11', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle Hyperion Planning 11', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Oracle Value Chain Planning – Demantra Demand Management 7.3', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'PeopleSoft 9.2 Financials Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'PeopleSoft 9.2 Human Capital Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'PeopleSoft PeopleTools 8.5x', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Gerenciamento de Ciclo de Vida do Projeto', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos', 'Siebel CRM 8', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Banco de Dados', 'MySQL 8', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Banco de Dados', 'Oracle Big Data Cloud Platform', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Banco de Dados', 'Oracle Database', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Banco de Dados', 'Oracle Database Performance and Tuning', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Banco de Dados', 'Oracle Enterprise Manager 12c', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Banco de Dados', 'Oracle Real Application Clusters 12c', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Banco de Dados', 'Oracle Spatial 11g', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Java Platform, Standard Edition 8', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Access Management Suite Plus 11g', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Application Development Framework 12c', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Application Integration Architecture 11g', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Business Intelligence Foundation Suite 11g', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Business Process Management Suite 12c', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Data Integrator 12c', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Essbase 11', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Endeca Information Discovery 3.1', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle GoldenGate 12c', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Identity Governance Suite 11g', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle IT Architecture Versão 3', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle Mobile Development', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle SOA Suite 12c', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle WebCenter Content 11g', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle WebCenter Portal 11g', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle WebCenter Sites 11g', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Middleware', 'Oracle WebLogic Server 12c', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Comunicações', 'Oracle Communications Diameter Signaling Router', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Comunicações', 'Oracle Communications Eagle STP', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Comunicações', 'Oracle Communications Network Session Delivery', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Comunicações', 'Oracle Communications Policy Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Comunicações', 'Oracle Communications SD-WAN', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos de Comunicações', 'Oracle Communications Service and Network Orchestration', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos de Comunicações', 'Oracle Communications Billing and Revenue Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos de Comunicações', 'Oracle Communications Network Charging and Control', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Aplicativos de Comunicações', 'Oracle Communications Order and Service Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Construção e Engenharia', 'Primavera P6 Enterprise Project Portfolio Management 8', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Construção e Engenharia', 'Oracle Primavera Unifier', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Documaker', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle FLEXCUBE Universal Banking', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Insurance Policy Administration', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Banking Platform', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Financial Crime and Compliance Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Financial Services Basel Regulatory Capital', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Financial Services Lending and Leasing', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Financial Services Liquidity Risk Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Funds Transfer Pricing and Profitability Management', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Financial Services', 'Oracle Revenue Management and Billing', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Oracle Health Sciences', 'Oracle Argus Enterprise Edition 8', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Serviços Públicos', 'Oracle Utilities Customer to Meter', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Serviços Públicos', 'Oracle Utilities Customer Care and Billing 2', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Serviços Públicos', 'Oracle Utilities Meter Data Management 2', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Serviços Públicos', 'Oracle Utilities Smart Grid Gateway 2', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Serviços Públicos', 'Oracle Utilities Mobile Workforce Management 2', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Infraestrutura de TI', 'Servidores Fujitsu Série M', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Infraestrutura de TI', 'Oracle Linux 6', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Infraestrutura de TI', 'Oracle Solaris 11', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Infraestrutura de TI', 'Oracle VM 3', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Infraestrutura de TI', 'Oracle ZFS Storage', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Infraestrutura de TI', 'Servidores SPARC Série M', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Infraestrutura de TI', 'Servidores SPARC Série T', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Infraestrutura de TI', 'StorageTek Tape Libraries', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Sistemas Projetados', 'Oracle Database Appliance', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Sistemas Projetados', 'Oracle Exadata Database Machine', '95ddcf85-7b47-4811-9c77-46a022243f33'),
('Serviço', 'Outros', 'Serviços de Instalação de Hardware da Oracle', '95ddcf85-7b47-4811-9c77-46a022243f33');

/*
CREATE TABLE Cursos(
	curso_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	curso_nome DESC100 NOT NULL,
	curso_expertise DESC100 NOT NULL
);
*/

/*
CREATE TABLE CursosConteudo(
	curso_conteudo_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	curso_conteudo_nome DESC100 NOT NULL,
	curso_conteudo_arquivo DESC100 NULL,
	curso_conteudo_link DESC100 NULL,
	curso_conteudo_tipo DESC100 NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);
*/

/*
CREATE TABLE Provas(
	prova_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	prova_nome DESC100 NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);
*/

/*
CREATE TABLE Atividades(
	atividade_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	atividade_nome DESC100 NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);
*/

/*
CREATE TABLE Bonificacoes(
	bonificacao_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	bonificacao_nome DESC100 NOT NULL
);
*/

/*
CREATE TABLE ConteudosProva(
	conteudo_prova_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	conteudo_prova_nome DESC100 NOT NULL,
	id_prova UUID NOT NULL,
	FOREIGN KEY (id_prova) REFERENCES Provas(prova_id)
);
*/

/*
CREATE TABLE ConteudosAtividades(
	conteudo_atividade_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	conteudo_atividade_nome DESC100 NOT NULL,
	id_atividade UUID NOT NULL,
	FOREIGN KEY (id_atividade) REFERENCES Atividades(atividade_id)
);
*/

/*
CREATE TABLE ParceirosProvas (
	parceiro_prova_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_prova_progressao DESC100 NULL,
	parceiro_prova_nota DESC100 NULL,
	id_prova UUID NOT NULL,
	id_parceiro UUID NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_prova) REFERENCES Provas(prova_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);
*/

/*
CREATE TABLE ParceirosAtividades (
	parceiro_atividade_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_atividade_progressao DESC100 NULL,
	parceiro_atividade_nota DESC100 NULL,
	id_atividade UUID NOT NULL,
	id_parceiro UUID NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_atividade) REFERENCES Atividades(atividade_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);
*/

/*
CREATE TABLE ParceirosCursos (
	parceiro_curso_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	parceiro_curso_progressao DESC100 NOT NULL,
	parceiro_curso_nota DESC100 NULL,
	id_curso UUID NOT NULL,
	id_parceiro UUID NOT NULL,
	id_bonificacao UUID NULL,
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_bonificacao) REFERENCES Bonificacoes(bonificacao_id)
);
*/

/*
CREATE TABLE AcoesAdministrativas (
	acao_administrativa_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	acao_administrativa_tipo DESC100 NOT NULL,
	id_administrador UUID NOT NULL,
	id_parceiro UUID NULL,
	id_prova UUID NULL,
	id_curso UUID NULL,
	id_atividade UUID NULL,
	id_bonificacao UUID NULL,
	id_curso_conteudo UUID NULL,
	id_conteudo_prova UUID NULL,
	id_conteudo_atividade UUID NULL,
	FOREIGN KEY (id_administrador) REFERENCES Administradores (administrador_id),
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_prova) REFERENCES Provas(prova_id),
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id),
	FOREIGN KEY (id_atividade) REFERENCES Atividades(atividade_id),
	FOREIGN KEY (id_bonificacao) REFERENCES Bonificacoes(bonificacao_id),
	FOREIGN KEY (id_curso_conteudo) REFERENCES CursosConteudo(curso_conteudo_id),
	FOREIGN KEY (id_conteudo_prova) REFERENCES ConteudosProva(conteudo_prova_id),
	FOREIGN KEY (id_conteudo_atividade) REFERENCES ConteudosAtividades(conteudo_atividade_id)
);
*/

/*
CREATE TABLE CursosVinculados(
	curso_vinculados_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
	id_parceiro UUID NOT NULL,
	id_curso UUID NOT NULL,
	FOREIGN KEY (id_parceiro) REFERENCES Parceiros(parceiro_id),
	FOREIGN KEY (id_curso) REFERENCES Cursos(curso_id)
);
*/