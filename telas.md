# Sistema de organização de compras de cartas de yu gi oh
Sistemas responsável pela organização de uma compra de yu gi oh do grupo csiNatal

## visão geral

Esse sistema serve para que cada usuário possa organizar seu carrinho na plataforma e depois ter um output de todos os carrinhos juntos, somando cada carta igual por raridade e coleção

- Arquitetura de APIs RESTful
- Persistência de dados transacionais
- Autenticação e autorização

### Usuarios (users)
- representa os usuários do sistema, administradores e não administradores
- é gerenciado pelo next-auth backend vai apenas checar as informações do usuário
- Autenticação via next auth

### Cartas De yu gi oh
- não vai ter cadastro de novas cartas, todas devem vir a partir da API e será usada em uma consulta

### Compras
- vai ser uma entidade onde vai ter um nome e vai delimitar datas
- a data de fim da compra vai ser usada para a regra de negócio para delimitar se pode ou não ser feita uma lista de compras
- tem uma estrutura com poucos dados com foco nos relacionamentos


### Lista de compras
- A lista de compras vai ser de cada usuário em relação a compra, onde vai selecionar os itens nas raridades e quantidades desejadas e indicar o atual valor unitário
- as compras podem ter um ou vários items de compras, onde vai conter uma carta, o valor da unidade raridade e coleção
- a lista de compra precisa ser criada a partir de uma compra que esteja em vigencia ( data de fim ainda não chegou)\



## regras de negocio
- apenas admins conseguem criar compras
- admins e usuarios normais podem criar lista de compras
- todos os endpoints só podem ser acessados ao logar


## fluxo da aplicação


### 1-login
1. o usuario clica para logar
2. o modal do nextauth abre para login via gmail
3. o usuario vem como usuario padrão


### tela de criação de compra
1. a tela vai ser exibida somente para administradores
2. vai ser um formulário simples com o dado de compra, como data de vigencia e nome da compra
3. ao enviar o formulário e confirmar deve exibir um modal inndicando sucesso ou erro, ou um toast

### tela de criação de lista de compra
1. qualquer usuário vai ter acesso, mas precisa estar logado
2. o usuário vai selecionar uma compra com a vigencia atual, ainda não chegou a data de fim
3. deve preencher os itens que deseja um ou mais 
4. selecionar a carta no componente de search por nome, a quantidade a raridade e a coleção
5. o usuário envia o formulário e deve aparecer um toast para sucesso ou para erro no envio

### Listar listas de compra
Qualquer usuario vai pode listar todas as listas de compras que ele fez



#Endpoins de exemplo e retornos


Criação de compra,apenas admin

POST http://localhost:3000/purchase
Content-Type: application/json

{
  "name": "COMPRA DE ABRIL 23",
  "endDate": "2024/04/30",
  "startDate": "2024/04/02"
}


Listagem de compras

GET http://localhost:3000/purchase
[
  {
    "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "name": "COMPRA DE ABRIL II",
    "startDate": "2024-04-02T03:00:00.000Z",
    "endDate": "2024-04-30T03:00:00.000Z",
    "createdAt": "2025-04-03T02:29:20.210Z",
    "updatedAt": "2025-04-03T02:29:20.210Z"
  },
  {
    "id": "77d95f7e-24c4-468f-b427-8fb7f337548b",
    "name": "COMPRA DE ABRIL III",
    "startDate": "2024-04-02T03:00:00.000Z",
    "endDate": "2024-04-30T03:00:00.000Z",
    "createdAt": "2025-04-03T04:52:21.024Z",
    "updatedAt": "2025-04-03T04:52:21.024Z"
  },
  {
    "id": "87073677-0806-4f66-a700-45ee048fa4d8",
    "name": "COMPRA DE ABRIL I",
    "startDate": "2024-04-02T03:00:00.000Z",
    "endDate": "2024-04-30T03:00:00.000Z",
    "createdAt": "2025-04-03T04:52:25.396Z",
    "updatedAt": "2025-04-03T04:52:25.396Z"
  },
  {
    "id": "cad10a56-c43d-40d0-82ce-53df57d00480",
    "name": "COMPRA DE ABRIL I",
    "startDate": "2024-04-02T03:00:00.000Z",
    "endDate": "2024-04-30T03:00:00.000Z",
    "createdAt": "2025-04-03T04:52:26.956Z",
    "updatedAt": "2025-04-03T04:52:26.956Z"
  },
  {
    "id": "24ae5c67-358c-488a-b0e1-93d97ffdad74",
    "name": "COMPRA DE ABRIL I2",
    "startDate": "2024-04-02T03:00:00.000Z",
    "endDate": "2024-04-30T03:00:00.000Z",
    "createdAt": "2025-04-03T04:52:29.269Z",
    "updatedAt": "2025-04-03T04:52:29.269Z"
  },
  {
    "id": "ee33e2e3-16de-4eee-a742-f61cf03a3bb8",
    "name": "COMPRA DE ABRIL 23",
    "startDate": "2024-04-02T03:00:00.000Z",
    "endDate": "2024-04-30T03:00:00.000Z",
    "createdAt": "2025-04-26T02:29:01.765Z",
    "updatedAt": "2025-04-26T02:29:01.765Z"
  },
  {
    "id": "983a476a-8aa3-436a-8090-1a0141b19ff5",
    "name": "COMPRA DE ABRIL 23",
    "startDate": "2024-04-02T03:00:00.000Z",
    "endDate": "2024-04-30T03:00:00.000Z",
    "createdAt": "2025-04-26T02:35:46.925Z",
    "updatedAt": "2025-04-26T02:35:46.925Z"
  }
]


###

Criar uma lista de compras

###
POST http://localhost:3000/shopping-list
Content-Type: application/json

{
  "userId": "d4a956dd-88c8-42d0-a011-66114f3ff651",
  "purchaseId": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
  "items": [
    {
      "cardId": 10920352,
      "rarity": "ultra rare",
      "collection": "Collection C",
      "quantity": 3,
      "unit_price":30
    },
    {
      "cardId": 58147549,
      "rarity": "secret",
      "collection": "Collection C",
      "quantity": 3,
      "unit_price":30
    }
  ]
}



# listar compras por usuário

GET http://localhost:3000/shopping-list/user/d4a956dd-88c8-42d0-a011-66114f3ff651


[
  {
    "id": "5465c6c0-2fbe-4002-a257-722f2fbb4a5b",
    "userId": "d4a956dd-88c8-42d0-a011-66114f3ff651",
    "purchaseId": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "purchase": {
      "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
      "name": "COMPRA DE ABRIL II",
      "startDate": "2024-04-02T03:00:00.000Z",
      "endDate": "2024-04-30T03:00:00.000Z",
      "createdBy": {
        "id": "80282180-e3fe-4aa1-ad02-c023ad35eee7",
        "name": "Carlos Henrique De Andrade",
        "image": "https://lh3.googleusercontent.com/a/ACg8ocIcRFxwQQ72kQhS_1d-N2juierv_hZyulBjvyrVqiTYzxtuIxNO7w=s96-c"
      }
    }
  },
  {
    "id": "92a943d6-6774-4f82-921a-171bb71b556d",
    "userId": "d4a956dd-88c8-42d0-a011-66114f3ff651",
    "purchaseId": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "purchase": {
      "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
      "name": "COMPRA DE ABRIL II",
      "startDate": "2024-04-02T03:00:00.000Z",
      "endDate": "2024-04-30T03:00:00.000Z",
      "createdBy": {
        "id": "80282180-e3fe-4aa1-ad02-c023ad35eee7",
        "name": "Carlos Henrique De Andrade",
        "image": "https://lh3.googleusercontent.com/a/ACg8ocIcRFxwQQ72kQhS_1d-N2juierv_hZyulBjvyrVqiTYzxtuIxNO7w=s96-c"
      }
    }
  },
  {
    "id": "f7f9cbc4-29f2-4606-bdae-e152a8aa282c",
    "userId": "d4a956dd-88c8-42d0-a011-66114f3ff651",
    "purchaseId": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "purchase": {
      "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
      "name": "COMPRA DE ABRIL II",
      "startDate": "2024-04-02T03:00:00.000Z",
      "endDate": "2024-04-30T03:00:00.000Z",
      "createdBy": {
        "id": "80282180-e3fe-4aa1-ad02-c023ad35eee7",
        "name": "Carlos Henrique De Andrade",
        "image": "https://lh3.googleusercontent.com/a/ACg8ocIcRFxwQQ72kQhS_1d-N2juierv_hZyulBjvyrVqiTYzxtuIxNO7w=s96-c"
      }
    }
  },
  {
    "id": "76f843ca-ca40-4e28-8d47-d5100f039cfe",
    "userId": "d4a956dd-88c8-42d0-a011-66114f3ff651",
    "purchaseId": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "purchase": {
      "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
      "name": "COMPRA DE ABRIL II",
      "startDate": "2024-04-02T03:00:00.000Z",
      "endDate": "2024-04-30T03:00:00.000Z",
      "createdBy": {
        "id": "80282180-e3fe-4aa1-ad02-c023ad35eee7",
        "name": "Carlos Henrique De Andrade",
        "image": "https://lh3.googleusercontent.com/a/ACg8ocIcRFxwQQ72kQhS_1d-N2juierv_hZyulBjvyrVqiTYzxtuIxNO7w=s96-c"
      }
    }
  },
  {
    "id": "3e4b7fe5-3e7d-4879-97c5-bb16a6a78326",
    "userId": "d4a956dd-88c8-42d0-a011-66114f3ff651",
    "purchaseId": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "purchase": {
      "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
      "name": "COMPRA DE ABRIL II",
      "startDate": "2024-04-02T03:00:00.000Z",
      "endDate": "2024-04-30T03:00:00.000Z",
      "createdBy": {
        "id": "80282180-e3fe-4aa1-ad02-c023ad35eee7",
        "name": "Carlos Henrique De Andrade",
        "image": "https://lh3.googleusercontent.com/a/ACg8ocIcRFxwQQ72kQhS_1d-N2juierv_hZyulBjvyrVqiTYzxtuIxNO7w=s96-c"
      }
    }
  },
  {
    "id": "dedaab20-a3df-4df6-a283-1175e9ddbe10",
    "userId": "d4a956dd-88c8-42d0-a011-66114f3ff651",
    "purchaseId": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "purchase": {
      "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
      "name": "COMPRA DE ABRIL II",
      "startDate": "2024-04-02T03:00:00.000Z",
      "endDate": "2024-04-30T03:00:00.000Z",
      "createdBy": {
        "id": "80282180-e3fe-4aa1-ad02-c023ad35eee7",
        "name": "Carlos Henrique De Andrade",
        "image": "https://lh3.googleusercontent.com/a/ACg8ocIcRFxwQQ72kQhS_1d-N2juierv_hZyulBjvyrVqiTYzxtuIxNO7w=s96-c"
      }
    }
  }
]



###

Listar lista de compra por id
GET http://localhost:3000/shopping-list/fe4526bb-10d9-4a99-a11d-e833c6ded83d


Response:

{
  "id": "fe4526bb-10d9-4a99-a11d-e833c6ded83d",
  "userId": "80282180-e3fe-4aa1-ad02-c023ad35eee7",
  "purchaseId": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
  "items": [
    {
      "id": "fe4b9e36-e81d-4648-bb98-9cd60c45f57c",
      "rarity": "super rare",
      "collection": "Collection A",
      "quantity": 3,
      "unit_price": 0,
      "card": {
        "id": 10920352,
        "name": "Masked HERO Vapor"
      }
    },
    {
      "id": "ab4bbb0c-72bb-4b95-84c3-627ef28c3740",
      "rarity": "super rare",
      "collection": "Collection B",
      "quantity": 3,
      "unit_price": 0,
      "card": {
        "id": 58147549,
        "name": "Masked HERO Goka"
      }
    }
  ],
  "purchase": {
    "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "name": "COMPRA DE ABRIL II",
    "startDate": "2024-04-02T03:00:00.000Z",
    "endDate": "2024-04-30T03:00:00.000Z",
    "createdBy": {
      "id": "80282180-e3fe-4aa1-ad02-c023ad35eee7",
      "name": "Carlos Henrique De Andrade"
    }
  }
}




# resumo de todas as listas de compra por id de compra


#
GET http://localhost:3000/shopping-list/purchase/ebfabff8-d878-4b14-a89e-96b5edd55cc0

{
  "purchase": {
    "id": "ebfabff8-d878-4b14-a89e-96b5edd55cc0",
    "items": [
      {
        "card": {
          "id": 10920352,
          "name": "Masked HERO Vapor"
        },
        "rarity": "super rare",
        "collection": "Collection A",
        "totalQuantity": 7
      },
      {
        "card": {
          "id": 10920352,
          "name": "Masked HERO Vapor"
        },
        "rarity": "ultra rare",
        "collection": "Collection A",
        "totalQuantity": 5
      },
      {
        "card": {
          "id": 10920352,
          "name": "Masked HERO Vapor"
        },
        "rarity": "ultra rare",
        "collection": "Collection C",
        "totalQuantity": 6
      },
      {
        "card": {
          "id": 58147549,
          "name": "Masked HERO Goka"
        },
        "rarity": "super rare",
        "collection": "Collection B",
        "totalQuantity": 7
      },
      {
        "card": {
          "id": 58147549,
          "name": "Masked HERO Goka"
        },
        "rarity": "secret",
        "collection": "Collection B",
        "totalQuantity": 5
      },
      {
        "card": {
          "id": 58147549,
          "name": "Masked HERO Goka"
        },
        "rarity": "secret",
        "collection": "Collection C",
        "totalQuantity": 6
      }
    ]
  }
}


Crie 4 telas

- Uma tela inicial com menu superior com menu suspenso onde o usuário poderá abrir o modal de login
- Uma tela de criação de compra
- uma tela para criação de lista de compra
- uma tela para listar lista de compras
- uma tela para visualizar a lista de compra


todas as telas devem ter um navbar superior que do lado esquerdo vai mostrar CSINatal e no lado direito vai mostrar "Olá, usuário" e um botão para fazer login caso esteja deslogado e para deslogar ou ver as compras caso esteja logado.

Nas telas preste atenção aos campos que são datas baseado nos nomes dos campos do envio rest e também crie selects com filtro para compras e um select para as cartas onde exibi o texto e o nome