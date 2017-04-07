
  // NOTE: this is a JS config object, and as such, need not be received
  // from a REST server. It is static, and only needs to match the REST
  // API defined on the server.

var apiObj = [
  {
    url: 'http://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    title: 'userpost',
    headers: {
      'Content-Type': 'application/json'
    },
    body: [
      {
        name: 'userId',
        type: 'number',
        placeholder: 'userId',
        data: "2"
      },
      {
        name: 'id',
        type: 'number',
        placeholder: 'Id',
        data: "23"
      },
      {
        name: 'title',
        type: 'text',
        placeholder: 'Title',
        data: "This is only a test"
      },
      {
        name: 'body',
        type: 'text',
        placeholder: 'Message Body',
        data: "This is only a test, if this had been a real emergency, you would have been instructed.."
      }

  /*    {
        name: 'email',
        type: 'email',
        max: 24,
        min: 3,
        placeholder: 'Email',
        data: "johndoe@mailinator.com"
      },
      {
        name: 'full-name',
        type: 'text',
        placeholder: 'Full name',
        required: true,
        data: "John Doe"
      },
      {
        name: 'phone',
        type: 'tel',
        placeholder: 'Phone',
        pattern: '^[0-9\-\+\s\(\)]*$',
        data: "555-5555"
      }
      */
    ]
  },
  {
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
    title: 'userget',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    title: 'userget2',
    headers: {
      'Content-Type': 'application/json'
    }
  }
];
