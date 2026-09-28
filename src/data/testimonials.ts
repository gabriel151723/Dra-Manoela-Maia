export interface Testimonial {
  id: string;
  name: string;
  roleOrLocation: string;
  procedure: string;
  rating: number;
  text: string;
  date: string;
  verifiedGoogle: boolean;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dra. Marcela Figueiredo',
    roleOrLocation: 'Itaigara, Salvador - BA',
    procedure: 'Harmonização Orofacial & Botox',
    rating: 5,
    text: 'Minha maior preocupação era ficar com o rosto artificial. A Dra. Manoela Maia foi de uma sensibilidade ímpar: analisou minhas proporções faciais e o sorriso, respeitou minha anatomia e o resultado ficou super elegante. Todos comentam como meu rosto está rejuvenescido e descansado!',
    date: 'Há 2 semanas',
    verifiedGoogle: true
  },
  {
    id: 'test-2',
    name: 'Camila Vasconcelos',
    roleOrLocation: 'Pituba, Salvador - BA',
    procedure: 'Lentes em Resina & Clareamento Dental',
    rating: 5,
    text: 'Fiz a transformação do meu sorriso com a Dra. Manoela no Complexo Odonto-Médico Itaigara. O consultório é impecável, o atendimento é pontual e o carinho com que ela explica cada detalhe me deixou 100% segura. Meu sorriso ficou natural e lindo!',
    date: 'Há 1 mês',
    verifiedGoogle: true
  },
  {
    id: 'test-3',
    name: 'Juliana S. Alencar',
    roleOrLocation: 'Caminho das Árvores, Salvador',
    procedure: 'Preenchimento Labial & Skinbooster',
    rating: 5,
    text: 'Fiz meus lábios com a Dra. Manoela e foi a melhor decisão da vida. Anestesia local maravilhosa que não doeu nada, e o contorno ficou sutil e hidratado. Super recomendo para quem valoriza delicadeza e bom gosto!',
    date: 'Há 3 semanas',
    verifiedGoogle: true
  },
  {
    id: 'test-4',
    name: 'Rodrigo M. Barreto',
    roleOrLocation: 'Vitória, Salvador - BA',
    procedure: 'Toxina Botulínica & Definição Mandibular',
    rating: 5,
    text: 'Excelente profissional. Buscava tratamento para bruxismo e aproveitei para fazer a toxina botulínica preventiva. Dra. Manoela tem uma mão levíssima e visão estética apurada. Alívio total da tensão na mandíbula.',
    date: 'Há 2 meses',
    verifiedGoogle: true
  },
  {
    id: 'test-5',
    name: 'Beatriz Fontoura',
    roleOrLocation: 'Graça, Salvador - BA',
    procedure: 'Bioestimulador de Colágeno (Radiesse)',
    rating: 5,
    text: 'Tratamento de altíssimo nível. Produtos abertos na minha frente com número de lote. Transparência que passa muita segurança. A Dra. Manoela é uma referência em Salvador!',
    date: 'Há 1 mês',
    verifiedGoogle: true
  }
];
