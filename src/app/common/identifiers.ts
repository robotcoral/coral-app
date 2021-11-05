export type Identifiers =
  | typeof callIdentifiers[number]
  | typeof conditionIdentifiers[number];

const callIdentifiers = [
  'schritt',
  'linksdrehen',
  'rechtsdrehen',
  'hinlegen',
  'aufheben',
  'markesetzen',
  'markelöschen',
  'warten',
  'ton',
  'beenden',
] as const;

const conditionIdentifiers = [
  'istwand',
  'nichtistwand',
  'istziegel',
  'nichtistziegel',
  'istmarke',
  'nichtistmarke',
  'istnorden',
  'istosten',
  'istsüden',
  'istwesten',
  'istvoll',
  'nichtistvoll',
  'istleer',
  'nichtistleer',
  'hatziegel',
] as const;
