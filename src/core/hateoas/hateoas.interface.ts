export interface HateoasInterface {
  gerarLinksHateoasIndex(): HateoasLinks[];
}

export interface HateoasLinks {
  type: string;
  rel: string;
  uri: string;
}
