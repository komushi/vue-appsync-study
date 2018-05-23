# vue-appsync-study
**Build both the server side(1) and the client side(2) from scratch.**

**Example Application for using [vue-cli-plugin-appsync].(https://github.com/komushi/vue-cli-plugin-appsync)**

## 1. AWS AppSync (GraphQL API Server Side)

### 1-1. Default GraphQL API
```
type Query { 
    getAllBooks: [Book]
    getBooksByGender(gender: Gender): [Book]
}

type Book { 
    title: String!
    gender: Gender!
    author: String
}

enum Gender {
    Male
    Female
}

schema {
    query: Query
}
```

### 1-2. After applying to AWS AppSync with a DynamoDB Table BookTable created
**Need to update CreateBookInput and UpdateBookInput for gender (enum type)**
```
type Book {
    title: String!
    gender: Gender!
    author: String
}

type BookConnection {
    items: [Book]
    nextToken: String
}

input CreateBookInput {
    title: String!
    gender: Gender!
    author: String
}

input DeleteBookInput {
    title: String!
}

enum Gender {
    Male
    Female
}

type Mutation {
    createBook(input: CreateBookInput!): Book
    updateBook(input: UpdateBookInput!): Book
    deleteBook(input: DeleteBookInput!): Book
}

type Query {
    getAllBooks: [Book]
    getBooksByGender(gender: Gender): [Book]
    getBook(title: String!): Book
    listBooks(first: Int, after: String): BookConnection
}

type Subscription {
    onCreateBook(title: String, author: String): Book
        @aws_subscribe(mutations: ["createBook"])
    onUpdateBook(title: String, author: String): Book
        @aws_subscribe(mutations: ["updateBook"])
    onDeleteBook(title: String, author: String): Book
        @aws_subscribe(mutations: ["deleteBook"])
}

input UpdateBookInput {
    title: String!
    gender: Gender!
    author: String
}

schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}
```

### 1-3. Try Mutation createBook to add some data

```
mutation create{
  createBook(input:{title:"水许", author:"师奶庵", gender:Male}) {
    title
    author
    gender
  }
}

```


```
mutation create{
  createBook(input:{title:"嘻游记", author:"无承恩", gender:Male}) {
    title
    author
    gender
  }
}
```

```
mutation create{
  createBook(input:{title:"原始物語", author:"姿势部", gender:Female}) {
    title
    author
    gender
  }
}
```

**Check DynamoDB**
| title (S) | gender (S) | author (S) |
| ----------|----------- |------------|
| 水许       | Male       | 师奶庵      |
| 嘻游记     | Male       | 无承恩      |
| 原始物語   | Female     | 姿势部      |

### 1-4. Try Query getBook

```
query getBook{
  getBook(title:"水许") {
    title
    author
    gender
  }
}
```

```
{
  "data": {
    "getBook": {
      "title": "水许",
      "author": "师奶庵",
      "gender": "Male"
    }
  }
}
```

### 1-5. Add Resolver for Query getAllBooks and test
* Data source name: BookTable
* Request mapping template
```
{
    "version": "2017-02-28",
    "operation": "Scan"
}
```
* Response mapping template
```
$utils.toJson($context.result.items)
```

**Try Query getAllBooks**

```
query getAllBooks{
  getAllBooks {
    title
    author
    gender
  }
}
```

```
{
  "data": {
    "getAllBooks": [
      {
        "title": "嘻游记",
        "author": "无承恩",
        "gender": "Male"
      },
      {
        "title": "水许",
        "author": "师奶庵",
        "gender": "Male"
      }
    ]
  }
}
```

### 1-6. Add Resolver for Query.getBooksByGender
* Data source name: BookTable
* Request mapping template
```
{
    "version" : "2017-02-28",
    "operation" : "Scan",
    "filter" : {
        "expression": "gender = :gender",
        "expressionValues" : {
            ":gender" : { "S" : "${context.arguments.gender}" }
        }
    }
}
```
* Response mapping template
```
$utils.toJson($context.result.items)
```

**Try Query getBooksByGender**

```
query getBooksByGender{
  getBooksByGender(gender:Male) {
    title
    author
    gender
  } 
}
```

```
{
  "data": {
    "getBooksByGender": [
      {
        "title": "嘻游记",
        "author": "无承恩",
        "gender": "Male"
      },
      {
        "title": "水许",
        "author": "师奶庵",
        "gender": "Male"
      }
    ]
  }
}
```


## 2. GraphQL Client Side Vue Application
**:rocket: This is about how I created a Vue Application like this. In one minute!**

### 2-1. Check vue-cli version
:warning: Make sure you have vue-cli 3.x.x:

```
vue --version
```

### 2-2. Create vue a project
```
vue create vue-appsync-study
```

### 2-3. Apply the AppSync plugin
Navigate to the newly created project folder and add the cli plugin:

```
cd vue-appsync-study
vue add appsync
```

### 2-4. Modify AppSync.js

Download AppSync.js for Web from AWS AppSync Management Console:
Overwrite src/graphql/config/AppSync.js
```
export default {
    "graphqlEndpoint": "https://1234567890.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    "region": "ap-northeast-1",
    "authenticationType": "API_KEY",
    "apiKey": "apikey1234567890"
}
```


### 2-5. Start your app

```
npm run serve
```

![Application Screenshot](images/app.png)

![DynamoDB BookTable](images/dynamodb.png)
