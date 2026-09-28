export interface Procedure {
  id: string;
  category: 'facial' | 'dental' | 'bioestimuladores' | 'pele';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  duration: string;
  recovery: string;
  results: string;
  whatsappMessage: string;
  highlightTag?: string;
}

export const PROCEDURES_DATA: Procedure[] = [
  {
    id: 'harmonizacao-full-face',
    category: 'facial',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Harmonização Facial Estruturada (HOF)',
    subtitle: 'Alinhamento de proporções faciais com naturalidade absoluta',
    description: 'Protocolo de sustentação e volumização estratégica (malar, mandíbula, mento e olheiras) respeitando a anatomia, proporção áurea e visagismo odontológico.',
    bullets: [
      'Preenchedores com ácido hialurônico de alta tecnologia',
      'Harmonia perfeita entre os traços do rosto e o sorriso',
      'Planejamento milimétrico individualizado',
      'Resultados imediatos com refinamento em 15 dias'
    ],
    duration: '60 a 90 min',
    recovery: 'Imediato (sem downtime)',
    results: '12 a 18 meses',
    whatsappMessage: 'Olá Dra. Manoela Maia! Gostaria de agendar uma avaliação para o protocolo de Harmonização Facial Estruturada (HOF).',
    highlightTag: 'Mais Procurado'
  },
  {
    id: 'lentes-facetas-dentais',
    category: 'dental',
    categoryLabel: 'Estética Dental',
    title: 'Lentes de Contato Dental & Facetas',
    subtitle: 'Transformação estética do sorriso com cerâmica pura ou resina',
    description: 'Correção de cor, formato, proporção e fechamento de diastemas com lâminas ultrafinas de porcelana ou resina estética de alta estratificação.',
    bullets: [
      'Simulação e prova do sorriso (mock-up) antes do procedimento',
      'Preservação máxima da estrutura dental biológica',
      'Brilho, translucidez e textura idênticos ao esmalte natural',
      'Alta durabilidade e estabilidade de cor ao longo dos anos'
    ],
    duration: '2 a 3 sessões',
    recovery: 'Imediato',
    results: 'Longa durabilidade (10 a 15 anos)',
    whatsappMessage: 'Olá Dra. Manoela Maia! Tenho interesse em transformar meu sorriso com Lentes de Contato Dental / Facetas.',
    highlightTag: 'Assinatura Clínica'
  },
  {
    id: 'toxina-botulinica',
    category: 'facial',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Toxina Botulínica (Botox) Facial & Terapêutico',
    subtitle: 'Suavização de rugas, sorriso gengival e alívio de bruxismo',
    description: 'Aplicação precisa em pontos nobres faciais para relaxar musculaturas hipertônicas, prevenir vincos definitivos e tratar apertamento dental/bruxismo.',
    bullets: [
      'Marcas padrão ouro (Botox / Dysport) com certificação ANVISA',
      'Doses refinadas que mantêm a expressividade natural',
      'Tratamento de testa, glabela, pés de galinha e sorriso gengival',
      'Retorno para revisão gratuita após 15 dias'
    ],
    duration: '30 min',
    recovery: 'Zero repouso necessário',
    results: '4 a 6 meses',
    whatsappMessage: 'Olá Dra. Manoela Maia! Gostaria de verificar a disponibilidade para aplicação de Toxina Botulínica.',
    highlightTag: 'Indispensável'
  },
  {
    id: 'preenchimento-labial',
    category: 'facial',
    categoryLabel: 'Harmonização Orofacial',
    title: 'Preenchimento & Escultura Labial',
    subtitle: 'Contorno, hidratação profunda e volume proporcional',
    description: 'Técnica de escultura labial para definição do arco do cupido, reposição de volume perdido e hidratação com brilho e jovialidade.',
    bullets: [
      'Ácido hialurônico específico viscoelástico para lábios',
      'Anestesia odontológica confortável (totalmente sem dor)',
      'Design em harmonia com a linha do sorriso e dentes',
      'Resultados sofisticados sem aspecto exagerado'
    ],
    duration: '40 min',
    recovery: 'Edema leve de 24h a 48h',
    results: '9 a 12 meses',
    whatsappMessage: 'Olá Dra. Manoela Maia! Gostaria de informações sobre o Preenchimento Labial personalizado.',
  },
  {
    id: 'bioestimulador-colageno',
    category: 'bioestimuladores',
    categoryLabel: 'Bioestimuladores de Colágeno',
    title: 'Bioestimuladores (Sculptra & Radiesse)',
    subtitle: 'Firmeza dérmica e reposicionamento tecidual',
    description: 'Estimulação biológica potente para restaurar a densidade, firmeza e elasticidade da pele, combatendo a flacidez facial e cervical.',
    bullets: [
      'Ativação progressiva da produção natural de colágeno tipo I e III',
      'Efeito lifting biológico sem efeito volumizador artificial',
      'Melhora expressiva da firmeza e viço da pele',
      'Excelente prevenção contra o envelhecimento tecidual'
    ],
    duration: '45 min',
    recovery: 'Retorno imediato às atividades',
    results: 'Até 24 meses',
    whatsappMessage: 'Olá Dra. Manoela Maia! Tenho interesse no tratamento com Bioestimuladores de Colágeno.',
    highlightTag: 'Rejuvenescimento'
  },
  {
    id: 'clareamento-dental-laser',
    category: 'dental',
    categoryLabel: 'Estética Dental',
    title: 'Clareamento Dental em Consultório & Caseiro',
    subtitle: 'Dentes mais brancos com segurança e controle de sensibilidade',
    description: 'Protocolo de clareamento supervisionado para remover pigmentações profundas do esmalte dental, devolvendo um sorriso jovem e luminoso.',
    bullets: [
      'Gel clareador de alta tecnologia com dessensibilizante',
      'Sessões rápidas no consultório combinadas com moldeira em casa',
      'Proteção total da gengiva e integridade do esmalte',
      'Resultados visíveis logo após a primeira sessão'
    ],
    duration: '50 min',
    recovery: 'Imediato',
    results: 'Resultados duradouros com manutenção',
    whatsappMessage: 'Olá Dra. Manoela Maia! Gostaria de agendar uma sessão de Clareamento Dental.',
  },
  {
    id: 'fios-sustentacao-pdo',
    category: 'bioestimuladores',
    categoryLabel: 'Bioestimuladores & Fios',
    title: 'Fios de Sustentação de PDO',
    subtitle: 'Efeito lifting imediato e estímulo contínuo de colágeno',
    description: 'Tracionamento suave de tecidos caídos do terço médio e inferior da face, reduzindo a flacidez e o buldogue com fios 100% reabsorvíveis.',
    bullets: [
      'Definição da linha da mandíbula e sustentação malar',
      'Fios 100% biocompatíveis e reabsorvidos pelo organismo',
      'Sem cortes cirúrgicos ou cicatrizes',
      'Combinação perfeita com preenchimentos estratégicos'
    ],
    duration: '50 min',
    recovery: 'Cuidados leves por 3 a 5 dias',
    results: '12 a 18 meses',
    whatsappMessage: 'Olá Dra. Manoela Maia! Gostaria de avaliar os Fios de Sustentação PDO.',
  },
  {
    id: 'skinbooster-glow',
    category: 'pele',
    categoryLabel: 'Pele & Glow',
    title: 'Skinbooster & Revitalização Dérmica',
    subtitle: 'Hidratação profunda de dentro para fora com viço radiante',
    description: 'Microinjeções de ácido hialurônico fluido enriquecido com vitaminas e antioxidantes, restaurando o glow e suavizando linhas finas ao redor do sorriso.',
    bullets: [
      'Revitalização intensa do rosto, pescoço e colo',
      'Aspecto iluminado, saudável e viçoso',
      'Eliminação da textura craquelada da pele',
      'Potencializador dos resultados da harmonização facial'
    ],
    duration: '35 min',
    recovery: 'Pequenos pontinhos somem em 24h',
    results: '6 a 9 meses',
    whatsappMessage: 'Olá Dra. Manoela Maia! Gostaria de informações sobre o procedimento de Skinbooster.',
  }
];
