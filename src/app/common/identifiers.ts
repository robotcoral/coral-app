export type Identifiers =
  | typeof callIdentifiers[number]
  | typeof conditionIdentifiers[number];

const callIdentifiers = [
  'Schritt',
  'LinksDrehen',
  'RechtsDrehen',
  'Hinlegen',
  'Aufheben',
  'MarkeSetzen',
  'MarkeLöschen',
  'Warten',
  'Ton',
  'Beenden',
] as const;

const conditionIdentifiers = [
  'IstWand',
  'NichtIstWand',
  'IstZiegel',
  'NichtIstZiegel',
  'IstMarke',
  'NichtIstMarke',
  'IstNorden',
  'IstOsten',
  'IstSüden',
  'IstWesten',
  'IstVoll',
  'NichtIstVoll',
  'IstLeer',
  'NichtIstLeer',
  'HatZiegel',
] as const;
