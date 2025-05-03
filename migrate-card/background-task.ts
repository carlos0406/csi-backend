import 'reflect-metadata';
import { db } from './db';
import { YuGiOhCardModel } from '../src/core/card/infra/card.model';

process.on('message', (items) => {
  for (const item of items) {
    // aqui eu vou ter ainda um json e vou transformr numa carta de yu gi oh para depois poder salvar no banco de dados
    db.save(transformCardJsonToEntity(item))
      .then(() => {
        process.send('item-done');
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

function transformCardJsonToEntity(cardJson) {
  const cardEntity = new YuGiOhCardModel();

  // Atribuir os valores do JSON à instância
  cardEntity.id = cardJson.id;
  cardEntity.name = cardJson.name;

  // Extrair apenas os nomes dos sets para criar um array de strings
  cardEntity.card_sets = cardJson.card_sets?.map((set) => set.set_name) || [];

  // Extrair as URLs das imagens da primeira imagem (se existir)
  cardEntity.image_url = cardJson.card_images?.[0]?.image_url || '';
  cardEntity.image_url_small = cardJson.card_images?.[0]?.image_url_small || '';
  cardEntity.image_url_cropped =
    cardJson.card_images?.[0]?.image_url_cropped || '';

  return cardEntity;
}
