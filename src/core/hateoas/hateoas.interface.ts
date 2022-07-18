export interface HateoasInterface {
  gerarLinksHateoas(): HateoasLinks[];
}

export interface HateoasLinks {
  type: string;
  rel: string;
  uri: string;
}
