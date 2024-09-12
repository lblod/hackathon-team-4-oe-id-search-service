import { app, query, errorHandler } from 'mu';

app.get('/', async function( req, res ) {
  const search = req.query.search;
  const response = await fetch(`https://inventaris.onroerenderfgoed.be/aanduidingsobjecten.csv?per_pagina=15&tekst=${encodeURIComponent(req.query.search)}`);
  let text = await response.text();
  let csvLines = text.split("\n").slice(5);
  csvLines = csvLines.slice(0, csvLines.length - 1);
  const ids = csvLines.slice(1).map( (line) => line.split(",")[0] );
  res.send(JSON.stringify({data: { attributes: { ids }}}));
} );

app.use(errorHandler);
