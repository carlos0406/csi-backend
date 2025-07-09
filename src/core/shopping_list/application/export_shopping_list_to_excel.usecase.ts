import { IShoppingListRepository } from '../domain/shopping_list.repository.interface';
import * as XLSX from 'xlsx';

export class ExportShoppingListToExcelUsecase {
  constructor(private readonly repository: IShoppingListRepository) {}

  async execute(purchaseId: string): Promise<Buffer> {
    try {
      const shoppingList = await this.repository.listWithCount(purchaseId);
      if (!shoppingList) throw new Error('Shopping list not found');

      // Preparar dados para a planilha
      const worksheetData = shoppingList.purchase.items.map((item, index) => ({
        '#': index + 1,
        'Card ID': item.card.id,
        'Card Name': item.card.name,
        Rarity: item.rarity.name,
        Collection: item.collection,
        'Total Quantity': item.totalQuantity,
      }));

      // Criar workbook e worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);

      const columnWidths = [
        { wch: 5 }, // #
        { wch: 10 }, // Card ID
        { wch: 30 }, // Card Name
        { wch: 15 }, // Rarity
        { wch: 20 }, // Collection
        { wch: 15 }, // Total Quantity
      ];
      worksheet['!cols'] = columnWidths;

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Shopping List');

      const buffer = XLSX.write(workbook, {
        type: 'buffer',
        bookType: 'xlsx',
      });

      return buffer;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to export shopping list to Excel: ${error.message}`,
        );
      } else {
        throw new Error(
          'Failed to export shopping list to Excel: Unknown error',
        );
      }
    }
  }
}
