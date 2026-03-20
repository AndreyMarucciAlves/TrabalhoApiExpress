const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());


let livros = [];
let proximoId = 0;

//Post

app.post('/api/livros', (req, res) => {

    const { nome, preco, categoria } = req.body;
    
    //Validando se os campos estão preenchidos
    if (!nome || !preco || !categoria) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, preco, categoria" });
    }

    //Validação do campo nome
    if (typeof nome !== 'string' || nome.trim().length < 3){
        return res.status(400).json({ erro: "O nome precisa ser uma string e ter pelomenos 3 caracteres" })
    }

    //Validação do campo preco com regra de negócio
    if (typeof preco !== 'number' || preco <=0) {
        return res.status(400).json({ erro: "Preço deve ser um número maior que 0" });
    }
    
    //Validacao do campo categoria
    if (typeof categoria !== 'string' || categoria.length < 3) {
        return res.status(400).json({ erro: "O nome da categoria precisa ter pelomenos 3 caracteres" })
    }
    
    //Validando se o livro já está cadastrado. Utilizando uma função lambda para procurar no armazenamento em memória
    const livroJaExiste = livros.some(livro => livro.nome.toLowerCase() == nome.toLocaleLowerCase());

    if(livroJaExiste){
        return res.status(409).json({ erro: "Esse livro já está cadastrado." })
    }

    const novoLivro = {
        id: proximoId++,
        nome: nome.trim(),
        preco,
        categoria: categoria.trim()
    };
    
    livros.push(novoLivro);
    
    res.status(201).json(novoLivro);
});

//Get
app.get('/api/livros', (req, res) => {
    res.json(livros);
});

app.listen(3000, () => console.log('API na porta 3000'));
