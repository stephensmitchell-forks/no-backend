const remderGraphiQl = (options,req) => {

    return `<!DOCTYPE html>
        <html>
            <head>
                <title>GraphiQl Storm</title>
            </head>
            <body>
                <script src='https://cdn.jsdelivr.net/npm/graphiql-storm@1.1.4/dist/index.js'></script>
                <script>
                    graphiQlStorm([{route:'${req.protocol + '://' + req.get('host') + req.originalUrl}'}])
                </script>
            </body>
        </html>`

}

export default remderGraphiQl