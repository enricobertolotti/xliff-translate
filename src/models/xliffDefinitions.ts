export interface XLIFFLanguages {
  source: string;
  target: string;
}

export interface XLIFFTransUnit {
  id: string;
  source: string;
  target: string;
}

export interface XMLNode {
  name?: string;
  type: string;

  attributes?: {
    // XML Attributes
    encoding?: string;
    version?: string;
    xlmns?: string;
    "xlmns:sxmd": string;

    // XLIFF Attributes
    datatype: string;
    original: string;
    "source-language": string;
    "target-language": string;

    // XLIFF Trans-Unit
    id: string;
    "xmlns:sap": string;
  };
  text?: string;
  elements: Array<XMLNode>;
}

export interface XLIFFObject {
  declaration?: XMLNode;
  elements: Array<XMLNode>;
}

export interface XLIFFStoreObject {
  filename: string;
  object: XLIFFObject;
}
