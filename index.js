// 1. Importar Express
const express = require('express');

//2. Criar aplicação
const app = express();

//3. Definir porta
const PORT = 3000;

//4.Middleware para JSON
app.use(express.json());

//5. Criar o primeiro endpoint
app.get('/', (req, res)=>{
    res.json({
        mensagem: '🎉 Minha primeira API funcionando!',
        status:'sucesso',
        timestamp: new Date().toISOString()
    })
})

//6. Endpoint de informações
app.get('/info', (req, res)=>{
    res.json({
        name:'Minha API REST',
        versao:'1.0.0',
        autor:'Andrey Marucci Alves'
    })
})

//7. Iniciar servidor
app.listen(PORT, () =>{
    console.log(`👀Minha primeira API funcionando na porta ${PORT}`)
})

app.get('/kenzoLima', (req, res)=>{
    res.json({
        mensagem: 'Kenzo é viado',
        status:'verdadeiro'
    })
})

app.get('/info/jhosefy', (req, res)=>{
    res.json({
        name:'Mano Jhosefy',
        versao:'69.69.69',
        autor: 'Jhosefy'
    })
})


//Aula de post
let produtos = [];
let proximoId = 0;
app.post('/api/produtos', (req, res) => {
    // 1. Extrair dados do body
    const { nome, preco, categoria } = req.body;
    
    // 2. VALIDAÇÕES - Campos obrigatórios
    if (!nome || !preco || !categoria) {
        return res.status(400).json({
            erro: "Campos obrigatórios: nome, preco, categoria"
        });
    }
    
    // 3. VALIDAÇÕES - Tipo de dado
    if (typeof preco !== 'number') {
        return res.status(400).json({
            erro: "Preço deve ser um número"
        });
    }
    
    // 4. VALIDAÇÕES - Regra de negócio (preço positivo)
    if (preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser maior que zero"
        });
    }
    
    // 5. VALIDAÇÕES - Tamanho mínimo
    if (nome.length < 3) {
        return res.status(400).json({
            erro: "Nome deve ter pelo menos 3 caracteres"
        });
    }
    
    // 6. Se passou em TODAS as validações, criar produto
    const novoProduto = {
        id: proximoId++,
        nome,
        preco,
        categoria
    };
    
    // 7. Adicionar ao array
    produtos.push(novoProduto);
    
    // 8. Retornar sucesso com 201 Created
    res.status(201).json(novoProduto);
});
// GET produtos

app.get('/api/produtos', (req, res) => {
    // Retorna o array completo
    res.json(produtos);
});

app.listen(3000, () => console.log('API na porta 3000'));