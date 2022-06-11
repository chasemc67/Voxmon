Testing Locally: 
create a `TestEvent.json` file, and add something like this to your package.json:

```
"scripts": {
        "locally": "node -e \"console.log(require('./index').handler(require('./testEvent.json')));\""
    },
```

you may also have to place `body = JSON.parse(event.body);` with `const body = event;` in your script, 
and make sure callback has a default function passed in
