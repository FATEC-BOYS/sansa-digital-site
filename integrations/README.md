# Melhorias de contato — prontas para integração

Estes arquivos **não estão publicados**: o código completo da implantação atual ainda precisa ser recuperado e conferido.

Após recuperar o site, adicionar no HTML, antes de `</head>`:

```html
<link rel="stylesheet" href="/contact-enhancements.css">
```

Antes de `</body>`:

```html
<script src="/contact-enhancements.js" defer></script>
```

Copiar ambos os arquivos para a pasta publicada (`public/`). O script usa o elemento existente `#contato`, coloca links para `comercial@sansadigital.com.br` e WhatsApp Business `+55 11 95029-2652` depois do formulário e cria um botão flutuante que leva ao formulário. Não altera o envio atual do formulário: isso exige a implementação separada do backend de envio.

Verificar o layout mobile para ajustar o deslocamento do botão flutuante em relação ao menu fixo, caso necessário.
