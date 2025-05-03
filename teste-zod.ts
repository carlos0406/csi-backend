import { purchaseInputSchema } from 'src/core/purchase/domain/purchase.schema';

function main() {
  try {
    const parsedMode = purchaseInputSchema.parse({
      robson: 'robson',
    });
  } catch (error) {
    console.log('error', error.errors);
  }
}

main();
