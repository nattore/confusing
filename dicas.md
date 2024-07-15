# Dicas aleatórias MDX

Abordagem incremental:
- Pode consumir muito tempo em tarefas de baixa prioridade

Abordagem de cima para baixo: (peso-da-tarefa, multiplicador, prioridade)
- Ponto de compilação: leve, O(1), alta
- Seção de documentos de front matter: leve, O(1), alta
- Corrigir cabeçalhos: leve, O(n), alta
- Corrigir tabelas simples: média, O(n), alta
- Corrigir blocos de código: média, O(n), alta
- Corrigir diagramas: pesada, O(1), média
- Corrigir links de arquivos (imagem): pesada, O(n), média
- Corrigir tabelas aninhadas: pesada, O(2^n), baixa
- Corrigir formatação de conteúdo: pesada, O(n), baixa
- Seção personalizada de front matter: pesada, O(1), baixa
- Corrigir o que restou para ser corrigido

Dica: faça um comentário TODO nas partes que precisam ser corrigidas (podem ser pesquisadas posteriormente)

Atenção: não use nenhuma ferramenta de formatação de código como o prettier (pode quebrar o código)

Atenção: tenha cuidado ao usar regex (pode obliterar conteúdo)

MDX:
- CommonMark + JSX
- Todo markdown (.md) é analisado como MDX (.mdx)
- Pode ter erros de compilação (transpilação) (MDX -> JSX)
- Caracteres especiais precisam ser escapados com '\'(use regex)

JSX:
- JavaScript + sintaxe de marcação
- Ainda não necessário

Estrutura de pastas:
- index.md
- ./assets
- Convenção de nomenclatura de pastas: snake_case?
- Script de automação

Ponto de compilação:
- Caracteres (mdx | yaml) devidamente escapados
- YAML é escapado com aspas
- MDX é escapado com barra invertida

Front matter:
- YAML
- Dividido em seções de documentos e personalizadas
- A seção de documentos contém as chaves do plugin de documentos
- A seção personalizada contém chaves definidas pelo usuário ("metadados dos modelos")
- A seção personalizada precisa ter uma especificação do formato de chave-valor, tipo e convenção de nomenclatura
- Caracteres especiais precisam ser escapados
- Chaves obrigatórias (docs | custom)
- Chaves opcionais (docs | custom)

Cabeçalhos:
- Casos extremos (ex. dentro de sumários cabeçalhos são considerados no TOC)
- Geração de TOC
- Links para cabeçalhos são gerados automaticamente (id)

Tabelas:
- Precisam ter um cabeçalho
- Podem ter tabelas aninhadas (também conhecido como "inferno de migração"), considerado posteriormente na abordagem de cima para baixo

Blocos de código:
- Não especifique uma linguagem (realce de sintaxe é quebrado)
- Use "copiar e colar" da página da web

Diagramas:
- Bloco de código Mermaid
- Migração alternativa + corrigir sintaxe fazem o trabalho

Links:
- Use caminhos relativos ('./', '../')
- Caminhos absolutos (começando com '/') resolvem para a pasta raiz do conteúdo ("/docs")
- Autolinks (<url>) não são suportados
- Priorize a correção dos links de arquivos do conteúdo (acessados com './assets/file')
- Links para outras páginas que precisam ser corrigidos exigem URLs atualizadas ('../outra_pagina' ou '/caminho/para/pagina')
- Links para arquivos globais precisam que os arquivos sejam resolvidos ('@site/src/img/logo.png')

Tabelas aninhadas:
- Não suportadas na sintaxe markdown
- Podem conter outras tabelas aninhadas
- Precisam ser corrigidas (expandindo em uma linha -> expandindo em várias linhas)
- A estrutura do conteúdo (layout) precisa ser modificada
- A intervenção manual é propensa a erros quando as tabelas aninhadas são grandes (tabela de 'recursos' com centenas de linhas e múltiplas colunas)
- A automação é difícil por falta de estrutura
- Soluções alternativas:
  - Transformar em tabelas simples modificando o layout enquanto preserva a semântica
  - Grandes tabelas podem ser colapsadas com o componente <Summary />
  - O componente <Tabs /> pode ser usado para exibir várias tabelas (tabela1 | tabela2 | ... | tabelaN)
  - O uso de macros do VS Code e do Vim pode ajudar

Formatação de conteúdo:
- Listas devidamente indentadas
- Texto devidamente formatado (*negrito*, _itálico_, etc)

Seção personalizada de front matter:
- Siga a convenção de nomenclatura
